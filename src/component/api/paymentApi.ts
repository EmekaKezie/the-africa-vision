import { IPaystackInitialize } from "@/types/IPayment";

export async function initializePayment(
  url: string,
  secretKey: string,
  param: any
) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    console.log(e)
    return e;
  }
}

export async function verifyPaystackPayment(
  reference: string,
  secretKey: string
) {
  try {
    const url = `https://api.paystack.co/transaction/verify/${reference}`;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}
