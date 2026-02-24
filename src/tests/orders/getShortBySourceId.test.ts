import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/sendRequest.js';




const randomItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]!;


test('POST /orders/add with body', async () => {
      const apiURL = String(process.env.API_URL);



  const api = new ApiHelper(apiURL);

    for (let i = 0; i < 1; i ++) {
const ord = []
 for (let i = 7100; i < 7101; i ++) {
ord.push(i);
 }

    const data = {
    orders: ord
  };

  console.log("DATA " + JSON.stringify(data));

    const response = await api.sendRequest(
        'POST',
        data,
        '/rest/api/orders/get-short-by-source-id'
    );


    expect(response).toBeTruthy();
}
});
