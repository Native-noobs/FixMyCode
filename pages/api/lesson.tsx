import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../db'
import { Lesson } from '@prisma/client'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req.method === 'GET') {
        const data = await prisma.lesson.findMany({
            include: {
                homework: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        res.status(200).json({
            status: true,
            data,
        })
    } else if (req.method === 'POST') {
        const { lesson }: Lesson = req.body
        try {
            await prisma.lesson.create({
                data: { lesson }
            })
            res.status(201).end()
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}