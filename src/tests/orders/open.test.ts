import {test, expect} from "@playwright/test";
import testDataPositive from "../../test-data/orders/open_positive.json" with {type: "json"};
import testDataNegative from "../../test-data/orders/open_negative.json" with {type: "json"};
import {validateSchemaObject} from "../../helpers/validate-schema.js";
import {BaseTest} from "../../helpers/baseTest.js";
import dotenv from 'dotenv';
dotenv.config();

const OPEN_PATH = "/rest/api/orders/open";
const SCHEMA_PATH = "src/schemas/orders/open.schema.json";
const apiId = Number(process.env.API_ID);
const apiURL = String(process.env.API_URL);
const secret = String(process.env.API_SECRET);
const base = new BaseTest();

test.describe("orders/open positive tests", () => {
    for (const [i, params] of testDataPositive.entries()) {
        test(`Positive open checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, OPEN_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST open order request", () =>
                request.post(apiURL + OPEN_PATH, {
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

test.describe("orders/open negative tests", () => {
    for (const [i, params] of testDataNegative.entries()) {
        test(`Negative open checks #${i}`, async ({request}) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, OPEN_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST open order request", () =>
                request.post(apiURL + OPEN_PATH, {
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
