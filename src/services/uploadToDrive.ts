/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { google } from "googleapis";
import { Readable } from "stream";

const serviceAccountKeyBase64 = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKeyBase64) {
  throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY environment variable");
}

const serviceAccountKey = JSON.parse(
  Buffer.from(serviceAccountKeyBase64, "base64").toString("utf-8")
);

async function getDriveClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccountKey,
    scopes: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive", // Try broader scope
    ],
  });

  return google.drive({ version: "v3", auth });
}

const extractFileId = (url: string): string => {
  // If it's already just a file ID
  if (!url.includes("http") && url.length > 20) {
    return url;
  }

  let fileId = "";

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const viewMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (viewMatch) {
    fileId = viewMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  return fileId || url;
};

export async function uploadResumeFile(formData: FormData) {
  const file = formData.get("file") as File | null;
  const resumeFileId = formData.get("resumeLink") as string | null;

  if (!file || !resumeFileId) {
    throw new Error("Missing file or resumeLink");
  }

  const fileId = extractFileId(resumeFileId);

  // Convert the Web File to a Buffer and create stream
  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const drive = await getDriveClient();

  try {
    // Step 1: Verify we can access the file

    const fileCheck = await drive.files.get({
      fileId,
      fields: "id, name, mimeType, capabilities",
    });

    // Step 2: Check if we can edit this file
    if (fileCheck.data.capabilities && !fileCheck.data.capabilities.canEdit) {
      throw new Error(
        "Service account does not have edit permissions on this file"
      );
    }

    // Step 3: Try to update the file

    const response = await drive.files.update({
      fileId,
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: "id, name, webViewLink",
    });

    return {
      success: true,
      fileId: response.data.id,
      driveLink:
        response.data.webViewLink ||
        `https://drive.google.com/file/d/${response.data.id}/view`,
    };
  } catch (error: any) {
    console.log(error)
    return {
      success: false,
      message: error.message,
    };
  }
}
