/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAbout = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/about`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["about"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateAbout = async (data: any, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/about/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    await revalidateTag("about");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};