import { NextApiRequest, NextApiResponse } from 'next'
import { exec } from 'child_process'
import { prisma } from '../../lib/db'
import { resultResponse } from '../../types/type'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'GET request received' })
  } else if (req.method === 'POST') {
    let data = req.body.code.replace(/\n/g, ';')
    const { homeworkId } = req.body
    const homework = await prisma.homework.
      findFirst(
        {
          where:
          {
            id: homeworkId
          },
          include:
          {
            testCases: true
          }
        })

    let result: resultResponse[] = []
    homework?.testCases.map(async (e, i) => {
      const resu = await execute(data, e.input)
      if (typeof resu === 'string') {
        const checkCode = resu.replace(/\n/g, '').replace(/\s/g, '').replace(/'/g, '"')
        result = [...result, {
          result: checkCode == JSON.stringify(e.output),
          output: checkCode
        }]
        if (i === homework.testCases.length - 1) {
          return res.send({
            seccess: true,
            result
          })
        }
      }
    })
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
}
const execute = (data: string, input: any) => {
  return new Promise((resolve, reject) => {
    exec(
      "node -e " + JSON.stringify(data + ";" + `console.log(${input})`),
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};