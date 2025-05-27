/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProjectsData = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/projects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      next: {
        tags: ["projects"],
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const getSingleProjectData = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/projects/${id}`, {
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

export const createProject = async (data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    await revalidateTag("projects");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const updateProject = async (id: string, data: any) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    await revalidateTag("projects");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};

export const deleteProject = async (id: string) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${apiUrl}/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    await revalidateTag("projects");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return error;
  }
};
