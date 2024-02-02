import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import fs from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).json({ message: "GET request received" });
  } else if (req.method === "POST") {
    const data = req.body.code;
    fs.writeFileSync("./codes/test.js", data);

    exec(`node ./codes/test.js`, (error, stdout, stderr) => {
      if (error) res.status(500).json({ error });
      if (stderr) res.status(400).json({ stderr });
      res.status(200).json({ output: stdout });
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
