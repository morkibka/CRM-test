import crypto from "crypto";
import { test, expect } from "@playwright/test";

import dotenv from 'dotenv';

dotenv.config();

test("POST /catalog/offer-list", async ({ request }) => {
    console.log("SECRET:", process.env.API_SECRET);

    const secret = process.env.API_SECRET;
    if (!secret) throw new Error("API_SECRET is missing");

    const apiId = Number(process.env.API_ID);
    const apiURL = String(process.env.API_URL);
    const path = "/rest/api/catalog/offer-list";

      const data = {};
    const timestamp = Date.now();

    const payload = JSON.stringify(data) + timestamp + path;

    const signature = crypto
        .createHmac("sha256", secret)
        .update(payload)
        .digest("hex");

    const body = {
        data,
        timestamp,
        api_id: apiId,
        signature,
    };

    const response = await request.post(
        apiURL + path,
        {
            headers: {
                "Content-Type": "application/json",
                "X-Timestamp": String(timestamp),
                "X-Signature": signature,
            },
            data: body,
        }
    );

console.log("====================================");
console.log("➡️ METHOD:", "POST");
console.log("➡️ URL:", apiURL + path);

console.log("➡️ HEADERS:");
console.log(JSON.stringify({
  "Content-Type": "application/json",
  "X-Timestamp": String(timestamp),
  "X-Signature": signature,
  ...(  {})
}, null, 2));

console.log("➡️ BODY:");
console.log(JSON.stringify(body, null, 2));

console.log("➡️ DATA:", JSON.stringify(data, null, 2));
console.log("➡️ PATH:", path);
console.log("➡️ TIMESTAMP:", timestamp);

console.log("➡️ PAYLOAD (json_encode(data)+timestamp+path):");
console.log(JSON.stringify(data) + timestamp + path);

console.log("➡️ SIGNATURE:", signature);

 console.log("➡️ SECRET:", secret);

console.log("====================================");


    const json = await response.json();
    console.log(json);

    expect(response.ok()).toBeTruthy();
});
