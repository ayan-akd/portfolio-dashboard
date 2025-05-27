/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const setCookies = async (accessToken: string, refreshToken: string) => {
  (await cookies()).set("accessToken", accessToken);
  (await cookies()).set("refreshToken", refreshToken);
};

export const setAccessToken = async (accessToken: string) => {
  (await cookies()).set("accessToken", accessToken);
};

export const deleteCookie = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

// login user
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    await setCookies(resData?.data?.accessToken, resData?.data?.refreshToken);

    return resData;
  } catch (error) {
    console.error("Error logging in:", error);
    return error;
  }
};

export const passwordChange = async (userData: FieldValues) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/auth/change-password`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(userData),
    });

    const result = await res.json();

    if (result.success) {
    }

    return result;
  } catch (error: any) {
    return error;
  }
};
