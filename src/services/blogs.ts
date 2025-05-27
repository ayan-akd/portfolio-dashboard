/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getBlogsData = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const getSingleBlogData = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/blogs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const createBlog = async (formData: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    });
    await revalidateTag("blogs");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
}

export const updateBlog = async (id: string, formData: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/blogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    });
    await revalidateTag("blogs");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
}
