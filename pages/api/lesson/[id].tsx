import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    if (req.method === 'GET') {
        try {
            const data = await prisma.lesson.findFirst({ where: { id: id as string }, include: { homework: true } })
            if (!data) {
                return res.status(404).json({ message: 'Lesson not found' })
            }
            res.json(data)
        } catch (error) {
            console.error('Error fetching lesson:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    } else if (req.method === 'DELETE') {
        try {
            const find = await prisma.lesson.findFirst({ where: { id: id as string } })
            if (!find) return res.status(404).json({ message: 'Lesson not found' })
            await prisma.homework.deleteMany({ where: { lessonId: find.id } })
            await prisma.lesson.delete({ where: { id: id as string } })
            res.status(204).end()
        } catch (error) {
            console.error('Error deleting lesson:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    } else if (req.method === 'PUT') {
        try {
            const { body } = req
            const updatedLesson = await prisma.lesson.update({
                where: { id: id as string },
                data: body,
            })
            res.json(updatedLesson)
        } catch (error) {
            console.error('Error updating lesson:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    } else {
        res.setHeader('Allow', ['GET', 'DELETE', 'PUT'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
