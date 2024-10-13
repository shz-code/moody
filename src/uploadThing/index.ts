import { UTApi } from "uploadthing/server";

const getUploadThingToken = () => {
  const token = process.env.UPLOADTHING_TOKEN;

  if (!token || !token.length) throw new Error("Missing UPLOADTHING_TOKEN");

  return { token };
};

export const utapi = new UTApi({ token: getUploadThingToken().token });
