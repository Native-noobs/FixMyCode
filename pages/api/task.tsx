import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/db'

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
        const { lessonId, initializeCode, description, testCases, title } = req.body
        const data = await prisma.lesson.findFirst({ where: { id: lessonId } })
        if (!data) {
            return res.status(404).json({ message: 'Lesson not found' })
        }
        try {
            await prisma.homework.create({
                data: {
                    description,
                    title,
                    Lesson: { connect: { id: lessonId } },
                    initializeCode,
                    testCases: {
                        create: testCases.map((testCase: { input: any; output: any }) => ({
                            input: testCase.input,
                            output: testCase.output,
                        })),
                    }
                }
            })
            res.status(201).end()
        } catch (error) {
            console.error('Error updating lesson:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}