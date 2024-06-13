import config from "@/config";
import { IBlogCommentInput, IBlogInput } from "@/types/IBlog";

export async function ApiGetBlogsForAll() {
  try {
    const url = `${config.baseApiUrl}/blog/posts`;
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

export async function ApiGetBlogByIdForAll(id: string) {
  try {
    const url = `${config.baseApiUrl}/blog/posts/${id}`;
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

export async function ApiGetBlogCategories(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/post-categories`;
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

export async function ApiGetBlogsForUser(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/my-posts`;
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

export async function ApiGetBlogsForAdmin(token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/posts`;
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

export async function ApiGetBlogByIdForAdmin(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/posts/${id}`;
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

export async function ApiUpdateBlogByUser(
  id: string,
  param: IBlogInput,
  token: string
) {
  try {
    const url = `${config.baseApiUrl}/admin/posts/${id}`;
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

export async function ApiCreateBlog(param: IBlogInput, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/create-post`;
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

export async function ApiApproveBlog(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/posts/${id}/approve`;
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

export async function ApiDeclineBlog(id: string, token: string) {
  try {
    const url = `${config.baseApiUrl}/admin/posts/${id}/decline`;
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

export async function ApiCommentOnBlog(
  param: IBlogCommentInput,
  id: string,
  token: string
) {
  try {
    const url = `${config.baseApiUrl}/blog/posts/${id}/comment`;
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

export async function ApiAddLikeOnBlog(id: number, token: string) {
  try {
    const url = `${config.baseApiUrl}/blog/posts/${id}/like`;
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

export async function ApiRemoveLikeOnBlog(id: number, token: string) {
  try {
    const url = `${config.baseApiUrl}/blog/posts/${id}/remove-like`;
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

export async function ApiAddDislikeOnBlog(id: number, token: string) {
  try {
    const url = `${config.baseApiUrl}/blog/posts/${id}/dislike`;
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

export async function ApiRemoveDislikeOnBlog(id: number, token: string) {
  try {
    const url = `${config.baseApiUrl}/blog/posts/${id}/remove-dislike`;
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
