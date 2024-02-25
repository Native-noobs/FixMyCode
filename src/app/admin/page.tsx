"use client"
import { FC, useEffect, useState } from "react"
import { Lesson } from "../../../types/type"
import Link from "next/link"
import '../../style/loading.css'

const Admin: FC = () => {

    const [lessons, setLessons] = useState([])
    useEffect(() => {
        fetch("/api/lesson")
            .then(res => res.json())
            .then(data => {
                setLessons(data.data)
            })
    }, [])
    console.log(lessons);

    return <main className="bg-slate-800 w-full min-h-dvh flex flex-col text-gray-100">
        <div className="container mx-auto my-10">
            <h1 className="text-4xl text-center font-bold">Admin page</h1>
            <h2 className="text-2xl  mt-10">Lessons</h2>
            <div className="flex gap-3 mt-10">
                {
                    lessons?.map((e: Lesson) => {
                        return <Link key={e.id} href={"/admin/lesson/" + e.id} className="w-20 flex justify-center items-center bg-slate-700 h-20 rounded-full hover:bg-slate-600 duration-500">
                            <p className="text-2xl">{e.lesson}</p>
                        </Link>
                    })
                }
            </div>
        </div>
    </main>
}
export default Admin