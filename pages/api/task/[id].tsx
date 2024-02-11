import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { id } = req.query
    const data = await prisma.homework.findFirst({
        where: { id: id as string },
        include: {
            testCases: true
        }
    })
    if (!data) return res.status(404).end()
    if (req.method === 'GET') {
        res.status(200).json({
            status: true,
            data,
        })
    } else if (req.method === 'DELETE') {
        try {
            await prisma.testCases.deleteMany({ where: { homeworkId: id as string } })
            await prisma.homework.delete({ where: { id: id as string } })
            res.status(204).end()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}