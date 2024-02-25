"use client"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import 'tailwindcss/tailwind.css'
import { Homework, Lesson } from "../../../types/type";
import { MdDelete, MdEdit } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";
import '../../../src/style/loading.css'
import './style.css'
import Modal from "@/components/modal";
import ModalForTask from "@/components/modalTask";
import { toast } from "react-toastify";
import Toast from "@/components/toastify";

const AdminLesson: React.FC = (props) => {
    const { query: { id } } = useRouter()

    const [lesson, setLesson] = useState<Lesson>()
    const [modal, setModal] = useState<boolean>(false)
    const [taskModal, setTaskModal] = useState<boolean>(false)

    useEffect(() => {
        id && fetch("/api/lesson/" + id)
            .then(res => res.json())
            .then(data => {
                setLesson(data)
            })
    }, [id])

    function handleDeleteAction(e: Homework) {
        setModal(true)
        fetch("/api/task/" + e.id, {
            method: "DELETE"
        })
            .then(res => {
                if (res.ok) {
                    toast.success("Successfully deleted")
                    setModal(false)
                }
                toast.error("Something went wrong!")
            })
    }
    function handleTaskModal() {
        setTaskModal(false)
    }
    return <main className="bg-slate-800 w-full min-h-dvh flex flex-col text-gray-100">
        <div className="container mx-auto my-10 p-5 md:px-0">
            <Link href=".." className="hover:underline text-slate-300 flex items-center gap-2">
                <IoArrowBackOutline />
                Back
            </Link>

            <h1 className="text-4xl font-semibold text-center">{lesson?.lesson}</h1>
            <h2 className="mt-10 text-4xl text-center">Tasks:</h2>
            <div className="w-full flex flex-col gap-5 mt-5 items-center">
                {lesson?.homework[0] ?
                    lesson?.homework?.map((e, i) => {
                        return <div key={e.id} className="w-full h-14 bg-slate-700 justify-between flex rounded-xl items-center px-5 hover:bg-slate-600 duration-500 md:w-2/4">
                            <p>{i + 1} - {e.title}</p>
                            <div className="flex gap-4">
                                <button className="hover:scale-105 active:scale-95 duration-200 edit-button">
                                    <MdEdit size="22" color="dodgerblue" />
                                </button>
                                <button className="hover:scale-105 active:scale-95 duration-200 delete-button" onClick={() => handleDeleteAction(e)}>
                                    <MdDelete size="22" color="rgb(200, 50, 0)" />
                                </button>
                            </div>
                        </div>
                    })
                    :
                    <div className='flex items-center justify-center h-60'><div className='loader'></div></div>
                }
            </div>
            <div className="absolute bottom-10 right-10" onClick={() => {
                setTaskModal(true)
            }}>
                <button className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center hover:scale-110 active:scale-95 duration-200 shadow-sm shadow-blue-400 hover:rotate-45">
                    <BiPlus size="20px" />
                </button>
            </div>
        </div>
        <Modal
            acceptButtonText="Delete"
            isOpen={modal}
            rejectButtonText="Cancel" text="All of your data will be permanently removed from our servers forever. This action cannot be undone." title="Delete task" onClick={() => {
                setModal(false)
            }}
            onCancel={() => {
                setModal(false)
            }} />
        <ModalForTask isOpen={taskModal} setIsOpen={handleTaskModal} id={id as string} />
        <Toast/>
    </main>
}

export default AdminLesson