export const uploadImg = async (file: Blob): Promise<string> => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME!;
  console.log("CLOUD_NAME:", CLOUD_NAME)
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET!;
  console.log("UPLOAD_PRESET:", UPLOAD_PRESET)
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });

    const imgUrl: { secure_url: string } = await res.json();
    return imgUrl.secure_url;
  } catch (err) {
    console.error("Failed to upload", err);
    throw err;
  }
};
