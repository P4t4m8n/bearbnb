import axios from "axios";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { pipeline } from "stream";
import { promisify } from "util";

const pipe = promisify(pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { imageUrl } = req.body;
    if (typeof imageUrl !== "string") {
      res.status(400).json({ message: "Invalid image URL provided." });
      return;
    }
    try {
      const response = await axios({
        method: "get",
        url: imageUrl,
        responseType: "stream",
      });

      const path = "./public/images/downloaded-image.jpg"; // Ensure the directory exists
      await pipe(response.data, fs.createWriteStream(path));

      res.status(200).json({ message: "Image downloaded successfully!", path });
    } catch (error) {
      console.error("Error downloading the image:", error);
      res.status(500).json({ message: "Failed to download the image" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
