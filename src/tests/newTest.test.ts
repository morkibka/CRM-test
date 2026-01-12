import { test, expect } from "@playwright/test";
import testDataPositive from "../test-data/orders/add_positive.json" with { type: "json" };
import { validateSchema } from "../helpers/validate-schema.js" ;
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();
const ADD_POST_PATH =
  "/rest/api/orders/add";
const SCHEMA_PATH = "../schemas/orders/add.schema.json";
    const apiURL = String(process.env.API_URL);
        const secret = process.env.API_SECRET;
    if (!secret) throw new Error("API_SECRET is missing");



test.describe("add order positive tests", () => {
  for (const [i, params] of testDataPositive.entries()) {
    test(`Positive pack checks #${i} ${JSON.stringify(params)} `, async ({
      request,
    }) => {
          const timestamp = Date.now();
              const payload = JSON.stringify(params) + timestamp + ADD_POST_PATH;

           const signature = crypto
                  .createHmac("sha256", secret)
                  .update(payload)
                  .digest("hex");
          

      const response = await test.step("Send POST add order request", () =>
        request.post(
          apiURL + ADD_POST_PATH,
           {
           headers: {
                "Content-Type": "application/json",
                "X-Timestamp": String(timestamp),
                "X-Signature": signature,
            },
            data: params,
        }));

        console.log("====================================");
console.log("➡️ METHOD:", "POST");
console.log("➡️ URL:", apiURL + ADD_POST_PATH);
console.log("➡️ DATA:", JSON.stringify(params, null, 2));
console.log("➡️ PAYLOAD " + JSON.stringify(params) + timestamp + ADD_POST_PATH);
console.log("====================================");


    const json = await response.json();
    console.log(json);

      await test.step("Validate response status", async () => {
        expect(response.status()).toBe(200);
      });
      await test.step("Validate response headers", async () => {
        expect(response.headers()["content-type"]).toContain(
          "application/json"
        );
      });
      await test.step(`Validate JSON schema`, async () => {
        const result = await validateSchema(response, SCHEMA_PATH);
        expect(result).toBe(true);
      });
    });
  }
});
