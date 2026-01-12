import crypto from "crypto";

export  class BaseTest {


     crypt(secret: string, payload: any){

        const signature = crypto
            .createHmac("sha256", secret)
            .update(payload)
            .digest("hex");

        return signature;
    }

    buildPayload(params: any, timestamp: number, ADD_POST_PATH: string){
         return JSON.stringify(params) + timestamp + ADD_POST_PATH;
    }

    buildBody(params: any, timestamp: number, apiId: number, signature: any) {
         return {
             data: params,
             timestamp,
             api_id: apiId,
             signature,
         };
    }

    async sendPost(request:any, apiURL: any, path: any, headers: any, body: any) {
         return request.post(apiURL + path, { headers, data: body, }); }


    showLogs(apiURL: any, path: any, timestamp: any, signature: any, body: any, params: any, secret: any){
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

        console.log("➡️ DATA:", JSON.stringify(params, null, 2));
        console.log("➡️ PATH:", path);
        console.log("➡️ TIMESTAMP:", timestamp);

        console.log("➡️ PAYLOAD (json_encode(data)+timestamp+path):");
        console.log(JSON.stringify(params) + timestamp + path);

        console.log("➡️ SIGNATURE:", signature);

        console.log("➡️ SECRET:", secret);

        console.log("====================================");
    }
}