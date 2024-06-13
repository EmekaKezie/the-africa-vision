import config from "@/config";
import { ICampaignInput } from "@/types/ICampaign";

export async function ApiGetCampaignsForAll() {
  try {
    const url = `${config.baseApiUrl}/campaigns`;
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

export async function ApiGetCampaignByIdForAll(id: string) {
  try {
    const url = `${config.baseApiUrl}/campaigns/${id}`;
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

export async function ApiGetCampaignsForUser(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/my-campaigns`;
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

export async function ApiGetCampaignByIdForUser(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/my-campaigns/${id}`;
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


export async function ApiGetDonationsByCampaignId(id: string, token: number) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/payments/${id}`;
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

export async function ApiUpdateCampaignByUser(
  id: string,
  param: ICampaignInput,
  token: string
) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/${id}`;
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

export async function ApiGetCampaignsForAdmin(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns`;
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

export async function ApiGetCampaignByIdForAdmin(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/${id}`;
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

export async function ApiCreateCampaign(param: ICampaignInput, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/create`;
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

export async function ApiApproveCampaign(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/${id}/approve`;
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

export async function ApiDeclineCampaign(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/${id}/decline`;
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

export async function ApiGetCampaignCategories(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/campaigns/categories`;
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

export async function ApiGetCampaignDonations(token: string, pageNum:number, pageSize:number) {
  try {
    const url = `${config.baseApiUrl}/admin/payments/user?page=${pageNum}&per_page=${pageSize}`;
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



