import type { NextApiRequest, NextApiResponse } from "next";

interface UploadResponse {
  url?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UploadResponse>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  if (!req.body.file) {
    res.status(400).json({ error: "No file provided" });
    return;
  }

  const file = req.body.file;
  const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET as string;
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);

    const response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.url) {
      res.status(200).json({ url: data.url });
    } else {
      throw new Error("Cloudinary did not return a URL.");
    }
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
}
