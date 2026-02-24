import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../helpers/sendRequest.js';


const randomItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]!;


test('POST /orders/add with body', async () => {
      const apiURL = String(process.env.API_URL);



  const api = new ApiHelper(apiURL);



    const data = {
    page: {
      page: 1,
      limit: 1
    },
   filter: {
  sortType: "number",
  date: {
    start: "2021-01-30T08:30:00Z",
    end: "2026-03-30T08:30:00Z"
  },
  country: null,
  age: null,
  offers: null,
  order: null,
  num: null,
  paymentMethod: null,
  sourceType: null,
  source_api: null,
  source_web: null,
  source_internal: null,
  status: null,
  status_list: null,
  telephone: null,
  fio: null,
  sender: null,
  provider: null,
  deliveryType: null,
  track: null,
  email: null,
  worker: null,
  manager: null,
  courier: null,
  sort: "desc"
}
  };

  console.log("DATA " + JSON.stringify(data));

    const response = await api.sendRequest(
        'POST',
        data,
        '/rest/api/orders/get'
    );


    expect(response).toBeTruthy();
}
);
