'use client'
import Code_playground from '@/components/code_playground'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import 'tailwindcss/tailwind.css'
import { Homework } from '../../types/type'

const Code = () => {
  const router = useRouter()
  const [homework, setHomework] = useState<Homework>()
  const { homework: homeworkId } = router.query
  useEffect(() => {
    if (homeworkId && homeworkId.length > 0) {
      fetch("/api/task/" + homeworkId[0])
        .then(res => res.json())
        .then(({ data }) => {
          setHomework(data)
        })
    }
  }, [homeworkId])

  return (
    <main className="bg-slate-800 w-full min-h-dvh justify-center flex flex-col text-gray-100">
      <div className="p-10">
        {
          !homework ? <div>Loading...</div> :
            <Code_playground data={homework} />
        }
      </div>
    </main>
  )
}

export default Code
