import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import { prisma } from "../../lib/db";
import { resultResponse } from "../../types/type";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    res.status(200).json({ message: "GET request received" });
  } else if (req.method === "POST") {
    let data = req.body.code.replace(/\n/g, ";");
    try {
      const minify = await axios.post(
        "https://www.toptal.com/developers/javascript-minifier/api/raw",
        { input: req.body.code },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      data = minify.data;
    } catch (error) {}
    const { homeworkId } = req.body;
    const homework = await prisma.homework.findFirst({
      where: {
        id: homeworkId,
      },
      include: {
        testCases: true,
      },
    });

    let result: resultResponse[] = [];
    homework?.testCases.map(async (e, i) => {
      execute(data, e.input, req.body.code)
        .then((resl) => {
          if (typeof resl === "string") {
            const checkCode = resl
              .replace(/\n/g, "")
              .replace(/\s/g, "")
              .replace(/'/g, '"');
            result = [
              ...result,
              {
                result:
                  checkCode == JSON.stringify(e.output) ||
                  checkCode == e.output,
                output: checkCode,
              },
            ];
            if (i === homework.testCases.length - 1) {
              return res.send({
                success: true,
                result,
              });
            }
          }
        })
        .catch((error) => {
          return res.send({
            success: false,
            error,
          });
        });
    });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
const execute = (data: string, input: any, code: string) => {
  return new Promise((resolve, reject) => {
    exec(
      "node -e " + JSON.stringify(data + ";" + `console.log(${input})`),
      (error, stdout, stderr) => {
        error &&
          reject({
            error: error,
            stderr:
              code +
              stderr?.split("[eval]:1")[1].split(`console.log(${input})`)[1],
          });
        stderr && reject({ stderr });
        resolve(stdout);
      }
    );
  });
};
