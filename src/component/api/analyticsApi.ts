import config from "@/config";

export async function ApiCreatorAnalytics(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/analytics`;
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