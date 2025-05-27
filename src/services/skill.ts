/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getAllSkills = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["skills"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const createSkill = async (data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/skills`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    await revalidateTag("skills");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateSkill = async (data: any, id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/skills/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    await revalidateTag("skills");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};