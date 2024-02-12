"use client"
import { Lesson } from '../../types/type'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MdOutlineAccountCircle } from 'react-icons/md'
import '../style/loading.css'

export default function Home() {
  const [lessons, setLessons] = useState([])
  useEffect(() => {
    fetch("/api/lesson").then(res => res.json())
      .then(({ data }) => {
        setLessons(data)
      })
  }, [])

  return (
    <main className="bg-slate-800 w-full min-h-dvh flex flex-col text-gray-100">
      <div className="container mx-auto my-10">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold">Uyga vazifalar ro&apos;yxati</h1>
          <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center text-4xl select-none cursor-pointer">
            <MdOutlineAccountCircle />
          </div>
        </nav>
        <div className="mt-14 mx-auto w-3/4">
          {lessons[0] ? lessons.map((lesson: Lesson) => {
            return (
              <div key={lesson.lesson}>
                <h1 className="text-4xl my-8">{lesson.lesson} - Dars</h1>
                <div className="flex gap-5 flex-col">
                  {lesson.homework.map((homework, i) => {
                    return (
                      <div
                        className="w-full bg-slate-700 h-20 rounded-xl flex items-center px-5 hover:bg-slate-600 duration-200  justify-between"
                        key={i}
                      >
                        <div className="flex items-center gap-3">
                          <p className="text-xl">
                            {lesson.lesson}.{i}
                          </p>
                          <p className="text-xl">{homework.title}</p>
                        </div>
                        <Link
                          href={'/homework/' + homework.id}
                          className="w-max px-5 py-2 font-sans font-medium bg-blue-500 rounded-xl"
                        >
                          Yechish
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }) :
            <div className='w-full flex justify-center items-center h-[50vh]'>
              <div className='loader'></div>
            </div>
          }
        </div>
      </div>
    </main>
  )
}

