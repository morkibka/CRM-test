import {test, expect} from "@playwright/test";
import testDataPositive from "../../test-data/users/user-name-list_positive.json" with {type: "json"};
import testDataNegative from "../../test-data/users/user-name-list_negative.json" with {type: "json"};
import {validateSchemaObject} from "../../helpers/validate-schema.js";
import {BaseTest} from "../../helpers/baseTest.js";
import dotenv from 'dotenv';
dotenv.config();

const USER_NAME_LIST_PATH = "/rest/api/users/user-name-list";
const SCHEMA_PATH = "src/schemas/users/user-name-list.schema.json";
const apiId = Number(process.env.API_ID);
const apiURL = String(process.env.API_URL);
const secret = String(process.env.API_SECRET);
const base = new BaseTest();

test.describe("users/user-name-list positive tests", () => {
    for (const [i, params] of testDataPositive.entries()) {
        test(`Positive user-name-list checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, USER_NAME_LIST_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST users/user-name-list request", () =>
                request.post(apiURL + USER_NAME_LIST_PATH, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Timestamp": String(timestamp),
                        "X-Signature": signature,
                    },
                    data: body,
                })
            );

            const json = await response.json();
            console.log("➡️ RESPONSE", JSON.stringify(json, null, 2));

            await test.step("Validate response status", async () => {
                expect(response.status()).toBe(200);
            });

            await test.step("Validate JSON schema", async () => {
                const result = validateSchemaObject(json, SCHEMA_PATH);
                expect(result).toBe(true);
            });
        });
    }
});

test.describe("users/user-name-list negative tests", () => {
    for (const [i, params] of testDataNegative.entries()) {
        test(`Negative user-name-list checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, USER_NAME_LIST_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST users/user-name-list request", () =>
                request.post(apiURL + USER_NAME_LIST_PATH, {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Timestamp": String(timestamp),
                        "X-Signature": signature,
                    },
                    data: body,
                })
            );

            const json = await response.json();
            console.log("➡️ RESPONSE", JSON.stringify(json, null, 2));

            await test.step("Validate error response", async () => {
                expect(json.errors).toBeTruthy();
                expect(json.errors.code).toBeTruthy();
            });
        });
    }
});
