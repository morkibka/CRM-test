import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/sendRequest.js';



test('GET /api/schema', async () => {
      const apiURL = String(process.env.API_URL);



  const api = new ApiHelper(apiURL);

    for (let i = 0; i < 1; i ++) {

    const data = null;

  console.log("DATA " + JSON.stringify(data));

    const response = await api.sendRequest(
        'GET',
        data,
        '/rest/api/schema'
    );


    expect(response).toBeTruthy();
}
});
