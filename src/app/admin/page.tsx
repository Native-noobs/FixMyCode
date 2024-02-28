"use client";
import { FC, useEffect, useState } from "react";
import { Lesson } from "../../../types/type";
import Link from "next/link";
import "../../style/loading.css";
import { MdDelete, MdEdit } from "react-icons/md";
import Modal from "@/components/modal";
import "@/../pages/admin/lesson/style.css";
import { BiPlus } from "react-icons/bi";
import Toast from "@/components/toastify";
import { toast } from "react-toastify";
import ModalForLesson from "@/components/modal-lesson";

const Admin: FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>();
    const [modal, setModal] = useState<boolean>(false);
    const [lessonModal, setLessonModal] = useState<boolean>(false);
    const notify = () => toast.success("Successfully deleted!");

    useEffect(() => {
        fetch("/api/lesson")
            .then((res) => res.json())
            .then((data) => {
                setLessons(data.data);
            });
    }, []);
    function handleDeleteAction(e: Lesson) {
        setModal(true);
        fetch("/api/lesson/" + e.id, {
            method: "DELETE",
        })
            .then((res) => {
                notify();
            })
            .then((data) => {});
    }
    function setIsOpen() {
        setLessonModal(false);
    }
    return (
        <main className="bg-slate-800 w-full min-h-dvh flex flex-col text-gray-100">
            <div className="container mx-auto my-10 p-5 md:px-0">
                <h1 className="text-4xl text-center font-bold">Admin page</h1>
                <h2 className="text-2xl text-center mt-10">Lessons:</h2>
                <div className="w-full flex flex-col gap-5 mt-5 items-center">
                    {lessons?.map((e, i) => {
                        return (
                            <div
                                key={e.id}
                                className="w-full h-14 bg-slate-700 justify-between flex rounded-xl items-center px-5 hover:bg-slate-600 duration-500 md:w-2/4"
                            >
                                <Link
                                    className="hover:underline hover:opacity-80"
                                    href={"/admin/lesson/" + e.id}
                                >
                                    {e.lesson}
                                </Link>
                                <div className="flex gap-4">
                                    <button className="hover:scale-105 active:scale-95 duration-200 edit-button">
                                        <MdEdit size="22" color="dodgerblue" />
                                    </button>
                                    <button
                                        className="hover:scale-105 active:scale-95 duration-200 delete-button"
                                        onClick={() => handleDeleteAction(e)}
                                    >
                                        <MdDelete
                                            size="22"
                                            color="rgb(200, 50, 0)"
                                        />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/*  <div
                className="absolute bottom-10 right-10"
                onClick={() => {
                    setLessonModal(true);
                }}
            >
                <button className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center hover:scale-110 active:scale-95 duration-200 shadow-sm shadow-blue-400 hover:rotate-45">
                    <BiPlus size="20px" />
                </button>
            </div> */ }
            {modal && (
                <Modal
                    acceptButtonText="Delete"
                    rejectButtonText="Cancel"
                    text="All of your data will be permanently removed from our servers forever. This action cannot be undone."
                    title="Delete task"
                    onClick={() => {
                        setModal(false);
                    }}
                    onCancel={() => {
                        setModal(false);
                    }}
                />
            )}
            <Toast />
            {lessonModal && <ModalForLesson setIsOpen={setIsOpen} />}
        </main>
    );
};
export default Admin;
