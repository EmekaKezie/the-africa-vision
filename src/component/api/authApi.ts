import config from "@/config";
import { ILogin, IResendVerificationCode, ISignup, IVerifyEmail } from "@/types/IAuth";

export async function loginApi(param: ILogin) {
  try {
    const url = `${config.baseApiUrl}/auth/login`;
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

export async function signupApi(param: ISignup) {
  try {
    const url = `${config.baseApiUrl}/auth/register`;
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

export async function verifyEmailApi(param: IVerifyEmail) {
  try {
    const url = `${config.baseApiUrl}/auth/verify-email`;
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

export async function resentVerificationCodeApi(param: IResendVerificationCode) {
  try {
    const url = `${config.baseApiUrl}/auth/resend-email-verification`;
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


export async function ApiGetLoggedInUser(token: string) {
  try {
    const url = `${config.baseApiUrl}/users/get_user`;
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
