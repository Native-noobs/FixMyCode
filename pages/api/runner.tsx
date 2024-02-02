import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).json({ message: "GET request received" });
  } else if (req.method === "POST") {
    let data = req.body.code.replace(/\n/g, ";");
    return exec("node -e " + JSON.stringify(data), (error, stdout, stderr) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (stderr) {
        console.log("runtime xato" + stderr);
        return res.status(400).json(stderr);
      }
      return res.status(200).json({ output: stdout });
    });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
