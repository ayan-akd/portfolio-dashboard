/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getMessagesData = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["messages"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const deleteMessage = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/messages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    await revalidateTag("messages");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};
