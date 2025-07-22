import { expect } from "@playwright/test";

export async function generateRandomEmail(symbol = "@") {
  const randomNumber = Math.floor(Math.random() * 1e16).toString().padStart(16, '0');
  return `max${randomNumber}${symbol}gmail.com`;
}

export async function verifyResponseSchema(response, schema) {
  const responseBody = await response.json();
  expect(() => {
    schema.parse(responseBody);
  }).not.toThrow();
}