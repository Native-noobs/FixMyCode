import { FC, useState } from "react"
import { LessonModalPros, TestCases } from "../../types/type"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"
import { CgSpinner } from "react-icons/cg"
import Toast from "@/components/toastify"
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-javascript'
import { PiPlus } from "react-icons/pi"



const ModalForTask: FC<LessonModalPros> = ({ isOpen, setIsOpen, id }) => {
    if (!isOpen) {
        return
    }
    const [loading, setLoading] = useState<boolean>(false)
    const [lesson, setLesson] = useState<string>("")
    const [testCases, setTestCases] = useState<TestCases[]>([
        {
            input: undefined,
            output: undefined,
        }
    ])

    function handleCreateTopic(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        if (lesson.length < 5) {
            setLoading(false)
            return toast.error("Topic name must be more than 5 characters")
        }
        fetch("/api/task", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                lessonId: id,
                title: "Test",
                description: "Test",
                initializeCode: "Test",
                testCases: [],
            })
        })
            .then(res => {
                setLoading(false)
                if (res.ok) {
                    toast.success("Successfully added!")
                    setIsOpen()
                }
                toast.error("Something went wrong!")
            });
    }
    return <div className="absolute w-full h-dvh flex items-center justify-center">
        <form className="w-[80%] relative z-10 rounded-2xl p-10 h-[70%] bg-[rgba(81,82,127,0.6)] flex flex-col justify-between" onSubmit={handleCreateTopic}>
            <div>
                <div className="flex justify-between">
                    <span></span>
                    <p className="text-4xl font-bold">Add new task</p>
                    <button onClick={setIsOpen} className="hover:scale-105 duration-200 hover:drop-shadow-[0_2px_5px_rgba(255,255,255)]">
                        <IoMdClose size={30} />
                    </button>
                </div>
                <div className="mt-10 flex justify-between w-full gap-6">
                    <div className="w-2/4 mt-2">
                        <input type="text" className="rounded-md w-full h-10 pl-2 focus:outline-sky-900 bg-slate-700" placeholder="Enter topic name" onChange={(e) => {
                            setLesson(e.target.value)
                        }} />
                        <div className="w-full h-auto rounded-xl overflow-hidden mt-6">
                            <AceEditor
                                width="100%"
                                height="300px"
                                mode="javascript"
                                theme={"monokai"}
                                name="blah2"
                                fontSize={18}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                placeholder="Here your initialize code..."
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    enableMultiselect: true,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                    useWorker: false,
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-2/4">
                        {
                            testCases.map((e, i) => {
                                return <div>
                                    <p className="text-xl">
                                        {i + 1} - Test case
                                    </p>
                                    <div className="w-full flex gap-5 mt-4">
                                        <input type="text" className="bg-slate-700 w-2/6 h-10 focus:outline-sky-900 rounded-md pl-2" placeholder="Input" />
                                        <input type="text" className="bg-slate-700 w-2/6 h-10 focus:outline-sky-900 rounded-md pl-2" placeholder="Output" />
                                    </div>
                                </div>
                            })
                        }
                        <div className="mt-10">
                            <button type="button" className="rounded-2xl w-52 h-20 border-dashed border-2 border-slate-400 flex flex-col items-center justify-center gap-2">
                                Add Test case
                                <PiPlus size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-end gap-10">
                <button className="md:w-32 w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-300 rounded-xl h-10 duration-200 disabled:bg-[rgba(125,211,252,0.4)] flex items-center justify-center gap-2" disabled={loading}>
                    <CgSpinner
                        className={`animate-spin duration-500 ${!loading && 'hidden'}`}
                    />Save</button>
                <button onClick={setIsOpen} className="md:w-32 w-full border-2 hover:bg-slate-700 rounded-xl active:bg-slate-500 h-10 duration-150">Cancel</button>
            </div>
        </form>
        <div onClick={setIsOpen} className="backdrop-blur-xl w-full h-dvh absolute"></div>
        <Toast />
    </div>
}

export default ModalForTask