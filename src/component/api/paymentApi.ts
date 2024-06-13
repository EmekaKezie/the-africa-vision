import config from "@/config";
import { IBankInput } from "@/types/IBank";
import { IPaymentInitiate, IPaystackInitialize } from "@/types/IPayment";

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
    console.log(e);
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

export async function InitiatePaymentApi(param: IPaymentInitiate) {
  try {
    const url = `${config.baseApiUrl}/campaigns/pay`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function VerifyPaymentApi(reference: string) {
  try {
    const url = `${config.baseApiUrl}/campaigns/payment/verify-payment?reference=${reference}`;
    const response = await fetch(url, {
      method: "GET",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function GetBankListApi() {
  try {
    const url = `${config.baseApiUrl}/banks`;
    const response = await fetch(url, {
      method: "GET",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function GetBankAccountsApi(token: string) {
  try {
    const url = `${config.baseApiUrl}/users/bank_accounts`;
    const response = await fetch(url, {
      method: "GET",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function AddBankAccountsApi(param: IBankInput, token: string) {
  try {
    const url = `${config.baseApiUrl}/users/add_bank_account`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function RequestPayoutApi(param: any, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/request-campaign-payout`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function ApiGetPayouts(token: string, pageNum:number, pageSize:number) {
  try {
    const url = `${config.baseApiUrl}/admin/payouts?page=${pageNum}&per_page=${pageSize}`;
    const response = await fetch(url, {
      method: "GET",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function ApiGetPayoutById(token: string, payoutId:string) {
  try {
    const url = `${config.baseApiUrl}/admin/payouts/${payoutId}`;
    const response = await fetch(url, {
      method: "GET",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}

export async function ApiApprovePayout(payoutId: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/payouts/${payoutId}/approve`;
    const response = await fetch(url, {
      method: "POST",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}


export async function ApiCalculatePayout(campaignId: number, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin//calculate-payout?campaign_id=${campaignId}`;
    const response = await fetch(url, {
      method: "GET",
      //body: JSON.stringify(param),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.json();
    return data;
  } catch (e) {
    return e;
  }
}





