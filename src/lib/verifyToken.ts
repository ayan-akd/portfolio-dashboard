/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { setAccessToken } from "@/services/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const isTokenExpired = async (token: string): Promise<boolean> => {
  if (!token) return true;

  try {
    const decoded: { exp: number } = jwtDecode(token);

    return decoded.exp * 1000 < Date.now();
  } catch (err: any) {
    console.error(err);
    return true;
  }
};

export const getValidToken = async (): Promise<string> => {
  const cookieStore = await cookies();

  let token = cookieStore.get("accessToken")!.value;

  if (!token || (await isTokenExpired(token))) {
    const { data } = await getNewToken();
    token = data?.accessToken;
    await setAccessToken(token);
  }

  return token;
};

const getNewToken = async () => {
  try {
    const res = await fetch(`${apiUrl}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies()).get("refreshToken")!.value,
      },
    });

    return await res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;

  if (accessToken) {
    decodedData = jwtDecode(accessToken) as DecodedUser;
    return decodedData;
  } else {
    return null;
  }
};

export const getToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};

export type DecodedUser = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
