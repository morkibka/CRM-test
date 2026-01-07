import dotenv from 'dotenv';

dotenv.config();

const apiURL = process.env.api || '';

export class ApiHelper {
  private url: string;

  constructor(url: string = apiURL) {
    this.url = url;
  }

  async sendRequest(
    method: string,
    body: object,
    headers: Record<string, string> = { 'Content-Type': 'application/json' }
  ): Promise<any> {
    console.log('➡️ Отправляю запрос:', {
      url: this.url,
      method,
      headers,
      body,
    });

    const response = await fetch(this.url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('⬅️ Ответ сервера:', data);
    return data;
  }
}
