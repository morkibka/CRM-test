import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const apiURL = process.env.API_URL || '';
const secretKey = process.env.API_SECRET || '';
const apiId = Number(process.env.API_ID || 0);



export class ApiHelper {
  private url: string;

  constructor(url: string = apiURL) {
    this.url = url;
  }

  private generateSignature(data: any, timestamp: number, path: string): string {
    const jsonData = JSON.stringify(data);
    const payload = jsonData + timestamp + path;

    console.log('PAYLOAD ' + payload);

    return crypto
        .createHmac('sha256', secretKey)
        .update(payload)
        .digest('hex');
  }

  async sendRequest(
      method: 'GET' | 'POST',
      data: any,
      path: string,
      headers: Record<string, string> = { 'Content-Type': 'application/json' },
      customUrl?: string
  ): Promise<any> {
    const finalUrl = (customUrl || this.url) + path;

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.generateSignature(data, timestamp, path);

    const body = {
      data,
      timestamp: Number(timestamp),
      api_id: apiId,
      signature,
    };

    const finalHeaders = {
      ...headers,
      'X-Timestamp': timestamp,
      'X-Signature': signature,
    };

    console.log('➡️ Отправляю запрос:', {
      url: finalUrl,
      method,
      headers: finalHeaders,
      body,
    });

    const response = await fetch(finalUrl, {
      method,
      //@ts-ignore
      headers: finalHeaders,
      body: method === 'GET' ? null : JSON.stringify(body),
    });

    const raw = await response.text();
    let parsed;

    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }

    
console.log('⬅️ Ответ сервера:', JSON.stringify(parsed, null, 2));

    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${JSON.stringify(parsed)}`);
    }

    return parsed;
  }
}
