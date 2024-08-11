import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { body } = req;

    const token = jwt.sign(
      { email: body.email },
      `${process.env.NEXTAUTH_SECRET}`,
      {
        expiresIn: "60h",
      },
    );

    const { data } = await axios.post("http://localhost:5000/users", {
      ...body,
      token,
    });
    console.log(data);
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send("에러임");
  }
}
