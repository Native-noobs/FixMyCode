import { FC, useState } from "react";
import { LessonModalPros } from "../../types/type";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";

const ModalForLesson: FC<LessonModalPros> = ({ setIsOpen }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [lesson, setLesson] = useState<string>("");
    function handleCreateTopic() {
        setLoading(true);
        if (lesson.length < 5) {
            setLoading(false);
            return toast.error("Topic name must be more than 5 characters");
        }
        fetch("/api/lesson", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                lesson: lesson,
            }),
        }).then((res) => {
            setLoading(false);
            if (res.ok) toast.success("Successfully added!");
            setIsOpen();
        });
    }
    return (
        <div className="absolute w-full h-dvh flex items-center justify-center">
            <div className="w-[20%] relative z-10 rounded-2xl p-10 h-[30%] bg-[rgba(81,82,127,0.6)] flex flex-col justify-between">
                <div>
                    <div className="flex justify-between">
                        <span></span>
                        <p className="text-2xl font-bold">Add new topic</p>
                        <button
                            onClick={setIsOpen}
                            className="hover:scale-105 duration-200 hover:drop-shadow-[0_2px_5px_rgba(255,255,255)]"
                        >
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <div className="mt-10 flex justify-center">
                        <input
                            type="text"
                            className="rounded-md w-full h-10 pl-2 text-slate-900 focus:outline-sky-900"
                            placeholder="Enter topic name"
                            onChange={(e) => {
                                setLesson(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                        className="md:w-24 w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-300 rounded-xl h-10 duration-200 disabled:bg-[rgba(125,211,252,0.4)] flex items-center justify-center gap-2"
                        onClick={handleCreateTopic}
                        disabled={loading}
                    >
                        <CgSpinner
                            className={`animate-spin duration-500 ${!loading && "hidden"}`}
                        />
                        Save
                    </button>
                    <button
                        onClick={setIsOpen}
                        className="md:w-24 w-full border-2 hover:bg-slate-700 rounded-xl active:bg-slate-500 h-10 duration-150"
                    >
                        Cancel
                    </button>
                </div>
            </div>
            <div
                onClick={setIsOpen}
                className="backdrop-blur-xl w-full h-dvh absolute"
            ></div>
        </div>
    );
};

export default ModalForLesson;
