import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') {
        const data = await prisma.homework.findMany()
        res.status(200).json({
            status: true,
            data,
        })
    } else if (req.method === 'POST') {
        const { lessonId, description, testCases: { input, output } } = req.body
        try {
            await prisma.homework.create({
                data: {
                    description,
                    lessonId,
                    testCases: {
                        create: {
                            input,
                            output
                        }
                    }
                }
            })
            res.status(201).end()
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}