import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession, signOut } from "next-auth/react";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getToken({ req });

  signOut();
  return res.send(200);

  res.status(200).json({ name: "John Doe" });
}
