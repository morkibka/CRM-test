import crypto from "crypto";
import { test, expect } from "@playwright/test";

import dotenv from 'dotenv';

dotenv.config();

test("POST /rest/api/orders/add", async ({ request }) => {
    console.log("SECRET:", process.env.API_SECRET);

    const secret = process.env.API_SECRET;
    if (!secret) throw new Error("API_SECRET is missing");

    const apiId = Number(process.env.API_ID);
    const apiURL = String(process.env.API_URL);
    const path = "/rest/api/orders/add";

      const data = {
          "order": {
              "telephone": "+375447654321",
              "country_iso_code": "BR",
              "name": "Liam Carter",
              "email": "liam.carter@example.com",
              "comment": "Test order generated automatically",
              "address": {
                  "region": "North District",
                  "sector": "Sector 12",
                  "city": "Riverton",
                  "room": "45B",
                  "floor": "7",
                  "house": "221",
                  "porch": "3",
                  "street": "Maple Avenue",
                  "building": "Block C",
                  "intercom": "9021",
                  "index": "45890",
                  "lat": "53.9123",
                  "lon": "27.5511"
              },
              "offers": [
                  {
                      "id": 1,
                      "cid": 1,
                      "count": 1,
                      "cost": 1,
                      "proceeds": 0,
                      "all_cost": 0,
                      "discount": 0,
                      "total": 0,
                      "discount_type": "proceeds",
                      "discount_calc_type": "percent",
                      "salary_manager": 0,
                      "salary_worker": 0,
                      "salary_courier": 0,
                      "method_manager": "unit",
                      "method_worker": "unit",
                      "method_courier": "unit",
                      "all_salary_manager": 0,
                      "all_salary_worker": 0,
                      "all_salary_courier": 0
                  }
              ]
          }

      };
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
    console.log("RESPONSE:", JSON.stringify(json));


    expect(response.ok()).toBeTruthy();
});
