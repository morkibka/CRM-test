import { test, expect } from '@playwright/test';
import { ApiHelper } from '../Helpers/APIconfig.js';

test('POST /orders/add with body', async () => {
        const apiURL = String(process.env.API_URL);

  const api = new ApiHelper(apiURL);

  const data = {
    order: {
      telephone: "example",
      country_iso_code: "AF",
      name: "example",
      email: "example",
      comment: "example",
      address: {
        region: "example",
        sector: "example",
        city: "example",
        room: "example",
        floor: "example",
        house: "example",
        porch: "example",
        street: "example",
        building: "example",
        intercom: "example",
        index: "example",
        lat: 53.9023,
        lon: 27.5619

      },
      offers: [
        {
          cid: 1,
          count: 1,
          cost: 1,
          all_cost: 1
        }
      ]
    }
  };

const response = await api.sendRequest(
  'POST',
  data,
  '/rest/api/orders/add'   // 🔥 ВОТ ЭТО ГЛАВНОЕ
);

console.dir(response, { depth: 10 });

  expect(response).toBeTruthy();
});
