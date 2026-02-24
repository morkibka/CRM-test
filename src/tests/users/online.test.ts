import {test, expect} from "@playwright/test";
import testDataPositive from "../../test-data/users/online_positive.json" with {type: "json"};
import testDataNegative from "../../test-data/users/online_negative.json" with {type: "json"};
import {validateSchemaObject} from "../../helpers/validate-schema.js";
import {BaseTest} from "../../helpers/baseTest.js";
import dotenv from 'dotenv';
dotenv.config();

const ONLINE_PATH = "/rest/api/users/online";
const SCHEMA_PATH = "src/schemas/users/online.schema.json";
const apiId = Number(process.env.API_ID);
const apiURL = String(process.env.API_URL);
const secret = String(process.env.API_SECRET);
const base = new BaseTest();

test.describe("users/online positive tests", () => {
    for (const [i, params] of testDataPositive.entries()) {
        test(`Positive online checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, ONLINE_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST users/online request", () =>
                request.post(apiURL + ONLINE_PATH, {
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

test.describe("users/online negative tests", () => {
    for (const [i, params] of testDataNegative.entries()) {
        test(`Negative online checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, ONLINE_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST users/online request", () =>
                request.post(apiURL + ONLINE_PATH, {
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
