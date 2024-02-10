import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db'

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
    if (!data) {
        res.status(404).end()
    }
    if (req.method === 'GET') {
        res.status(200).json({
            status: true,
            data,
        })
    } else if (req.method === 'DELETE') {
        await prisma.homework.delete({ where: { id: "76afa32e-f6bb-411f-93a2-ac78ec3ce13a" } })
        res.status(204).end()
    }
}