import type { APIResponse } from "@playwright/test";
import  _Ajv  from "ajv";
import * as fs from "node:fs";
import path from "node:path";
const Ajv = _Ajv as unknown as typeof _Ajv.default;


export async function validateSchema(
  response: APIResponse,
  schemaPath: string
): Promise<boolean> {
  const ajv = new Ajv();
  // Transform response body to JSON
  const body = await response.json();
  // Validate the response schema
  const absolutePath = path.resolve(process.cwd(), schemaPath);
  const schema = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
  const valid = ajv.validate(schema, body);
  // Output the errors text
  if (!valid) {
    console.error("AJV Validation Errors:", ajv.errorsText());
  }
  return valid;
}
