import { test, expect } from '@playwright/test';
import { ApiHelper } from '../helpers/sendRequest.js';

import { names } from '../test-data/randomData/names.js';
import { telephones } from '../test-data/randomData/telephones.js';
import { country_iso_codes } from '../test-data/randomData/country_iso_codes.js';
import { emails } from '../test-data/randomData/emails.js';
import { comments } from '../test-data/randomData/comments.js';
import { regions } from '../test-data/randomData/regions.js';
import { sectors } from '../test-data/randomData/sectors.js';
import { cities } from '../test-data/randomData/cities.js';
import { streets } from '../test-data/randomData/streets.js';



const randomItem = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]!;


test('POST /orders/add with body', async () => {
      const apiURL = String(process.env.API_URL);



  const api = new ApiHelper(apiURL);

    for (let i = 0; i < 50; i ++) {

  const telephone = randomItem(telephones);
  const country_iso_code = randomItem(country_iso_codes);
  const name = randomItem(names);
  const email = randomItem(emails);
 const comment = randomItem(comments);
  const region = randomItem(regions);
  const sector = randomItem(sectors);
  const city = randomItem(cities);
  const room = String(Math.floor(Math.random() * 999));
  const floor = String(Math.floor(Math.random() * 20));
  const house = String(Math.floor(Math.random() * 200));
  const porch = String(Math.floor(Math.random() * 15));
  const street = randomItem(streets);
  const building = String(Math.floor(Math.random() * 200));
  const intercom = String(Math.floor(Math.random() * 9999));
  const index = String(Math.floor(Math.random() * 899999));
  const lat = Number((Math.random() * 180 - 90).toFixed(6));
  const lon = Number((Math.random() * 180 - 90).toFixed(6));
  const count = Math.floor(Math.random() * 1000);
  const cost = Math.floor(Math.random() * 10000000);
  const proceeds = Math.floor(Math.random() * 100000);
    const discount = Math.floor(Math.random() * 100);
    const total = Math.floor(Math.random() * 1000000);
    const salary_manager = Math.floor(Math.random() * 1000000);
    const salary_worker = Math.floor(Math.random() * 10000000);
    const salary_courier = Math.floor(Math.random() * 10000000);
    const all_cost = Math.floor(Math.random() * 1000000000);
    const all_salary_manager = Math.floor(Math.random() * 10000000);
    const all_salary_worker = Math.floor(Math.random() * 10000000);
    const all_salary_courier = Math.floor(Math.random() * 100000000);




    const data = {
    order: {
      telephone: telephone,
      country_iso_code: country_iso_code,
      name: name,
      email: email,
      comment: comment,
      address: {
        region: region,
        sector: sector,
        city: city,
        room: room,
        floor: floor,
        house: house,
        porch: porch,
        street: street,
        building: building,
        intercom: intercom,
        index: index,
        lat: lat,
        lon: lon

      },
      offers: [
        {
          cid: 229,
          count: count,
          cost: cost,
            proceeds: proceeds,
            all_cost: all_cost,
            discount: discount,
            total: total,
            discount_type: "proceeds",
            discount_calc_type: "percent",
            salary_manager: salary_manager,
            salary_worker: salary_worker,
            salary_courier: salary_courier,
            method_manager: "unit",
            method_worker: "unit",
            method_courier: "unit",
            all_salary_manager: all_salary_manager,
            all_salary_worker: all_salary_worker,
            all_salary_courier: all_salary_courier
        }
      ]
    }
  };

  console.log("DATA " + JSON.stringify(data));

    const response = await api.sendRequest(
        'POST',
        data,
        '/rest/api/orders/add'
    );


    expect(response).toBeTruthy();
}
});
