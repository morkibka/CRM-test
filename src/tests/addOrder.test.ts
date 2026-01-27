import {test, expect} from "@playwright/test";
import testDataPositive from "../test-data/orders/add_positive.json" with {type: "json"};
import {validateSchema} from "../helpers/validate-schema.js" ;
import {BaseTest} from "../helpers/baseTest.js";
import dotenv from 'dotenv';
dotenv.config();

const ADD_POST_PATH =
    "/rest/api/orders/add";
const SCHEMA_PATH = "src/schemas/orders/add.schema.json";
const apiId = Number(process.env.API_ID);
const apiURL = String(process.env.API_URL);
const secret = String(process.env.API_SECRET);
const base = new BaseTest();

test.describe("add order positive tests", () => {
    for (const [i, params] of testDataPositive.entries()) {
        test(`Positive pack checks #${i} ${JSON.stringify(params)} `, async ({
                                                                                 request,
                                                                             }) => {
            const timestamp = Math.floor(Date.now() / 1000);
            const payload = base.buildPayload(params, timestamp, ADD_POST_PATH);
            const signature = base.crypt(secret, payload);
            const body = base.buildBody(params, timestamp, apiId, signature);

            const response = await test.step("Send POST add order request", () =>
                request.post(
                    apiURL + ADD_POST_PATH,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-Timestamp": String(timestamp),
                            "X-Signature": signature,
                        },
                        data: body,
                    }));

            base.showLogs(apiURL, ADD_POST_PATH, timestamp, signature, body, params, secret);
            const json = await response.json();
            console.log("➡️ RESPONSE" + JSON.stringify(json, null, 2));


            await test.step("Validate response status", async () => {
                expect(response.status()).toBe(200);
            });

            await test.step("Validate response headers", async () => {
                expect(response.headers()["content-type"]).toContain(
                    "text/plain; charset=utf-8"
                );
            });

            await test.step(`Validate JSON schema`, async () => {
                const result = await validateSchema(response, SCHEMA_PATH);
                expect(result).toBe(true);
            });
        });
    }
});
