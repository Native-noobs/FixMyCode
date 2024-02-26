import React, { FC, useEffect, useState } from "react";
import { LessonModalPros, TestCases } from "../../types/type";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import Toast from "@/components/toastify";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-markdown";
import { PiPlus } from "react-icons/pi";
import "../app/globals.css";
import { Processor, unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkReact from 'remark-react'
import "github-markdown-css/github-markdown.css"


const ModalForTask: FC<LessonModalPros> = ({ setIsOpen, id }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [lesson, setLesson] = useState<string>("");
    const [description, setDescription] = useState<string>("# Preview markdown");
    const [markdown, setMarkdown] = useState<any>();
    const [testCases, setTestCases] = useState<TestCases[]>([
        {
            input: undefined,
            output: undefined,
        },
        {
            input: undefined,
            output: undefined,
        },
        {
            input: undefined,
            output: undefined,
        },
    ]);

    function handleCreateTopic(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        if (lesson.length < 5) {
            setLoading(false);
            return toast.error("Topic name must be more than 5 characters");
        }
        fetch("/api/task", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                lessonId: id,
                title: "Test",
                description: "Test",
                initializeCode: "Test",
                testCases: [],
            }),
        }).then((res) => {
            setLoading(false);
            if (res.ok) {
                toast.success("Successfully added!");
                setIsOpen();
            }
            toast.error("Something went wrong!");
        });
    }
    type MarkdownResult = React.ReactNode;

    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkReact, React)

    const md: MarkdownResult = processor.processSync(description).result as React.ReactNode;

    return (
        <div className="absolute w-full h-dvh flex items-center justify-center">
            <form
                className="w-[90%] relative z-10 rounded-2xl p-10 h-[90%] bg-[rgba(81,82,127,0.6)] flex flex-col justify-between"
                onSubmit={handleCreateTopic}
            >
                <div className="overflow-auto my-5 scroll pr-3">
                    <div className="flex justify-between">
                        <span></span>
                        <p className="text-4xl font-bold">Add new task</p>
                        <button
                            onClick={setIsOpen}
                            className="hover:scale-105 duration-200 hover:drop-shadow-[0_2px_5px_rgba(255,255,255)]"
                        >
                            <IoMdClose size={30} />
                        </button>
                    </div>
                    <div className="mt-10 flex justify-between w-full gap-6">
                        <div className="w-2/4">
                            <p className="text-xl mb-4">Task name</p>
                            <input
                                type="text"
                                className="rounded-md w-full h-10 pl-2 focus:outline-sky-900 bg-slate-700"
                                placeholder="Enter topic name"
                                onChange={(e) => {
                                    setLesson(e.target.value);
                                }}
                            />
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
                        <div className="w-2/4 flex flex-col gap-3">
                            {testCases.map((e, i) => {
                                return (
                                    <div key={i}>
                                        <p className="text-xl">
                                            {i + 1} - Test case
                                        </p>
                                        <div className="w-full flex justify-between mt-4">
                                            <input
                                                type="text"
                                                className="bg-slate-700 w-[47.5%] h-10 focus:outline-sky-900 rounded-md pl-2"
                                                placeholder="Input"
                                            />
                                            <input
                                                type="text"
                                                className="bg-slate-700 w-[47.5%] h-10 focus:outline-sky-900 rounded-md pl-2"
                                                placeholder="Output"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                            {testCases.length < 5 && (
                                <div className="mt-10">
                                    <button
                                        onClick={() => {
                                            setTestCases((prev) => [
                                                ...prev,
                                                {
                                                    input: undefined,
                                                    output: undefined,
                                                },
                                            ]);
                                        }}
                                        type="button"
                                        className="rounded-2xl w-full h-20 border-dashed border-2 border-slate-400 flex flex-col items-center justify-center gap-2"
                                    >
                                        Add more test case
                                        <PiPlus size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 h-auto">
                        <p className="text-4xl my-10">Description</p>
                        <div className="flex justify-between items-center gap-6">
                            <AceEditor
                                className="rounded-xl max-h-min"
                                width="50%"
                                height="500px"
                                mode="markdown"
                                theme={"monokai"}
                                name="blah2"
                                fontSize={18}
                                showPrintMargin={true}
                                showGutter={true}
                                highlightActiveLine={true}
                                placeholder="Here your description"
                                defaultValue="# Preview markdown"
                                setOptions={{
                                    enableBasicAutocompletion: true,
                                    enableLiveAutocompletion: true,
                                    enableSnippets: true,
                                    enableMultiselect: true,
                                    showLineNumbers: true,
                                    tabSize: 2,
                                    useWorker: false,
                                }}
                                onChange={(e) => {
                                    setDescription(e)
                                }}
                            />
                            <div className="w-2/4 h-[500px] h-min-[500px] p-5 rounded-xl preview markdown-body overflow-x-auto scroll">
                                {md}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-10">
                    <button
                        className="md:w-32 w-full bg-sky-500 hover:bg-sky-600 active:bg-sky-300 rounded-xl h-10 duration-200 disabled:bg-[rgba(125,211,252,0.4)] flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        <CgSpinner
                            className={`animate-spin duration-500 ${!loading && "hidden"}`}
                        />
                        Save
                    </button>
                    <button
                        onClick={setIsOpen}
                        className="md:w-32 w-full border-2 hover:bg-slate-700 rounded-xl active:bg-slate-500 h-10 duration-150"
                    >
                        Cancel
                    </button>
                </div>
            </form>
            <div
                onClick={setIsOpen}
                className="backdrop-blur-xl w-full h-dvh absolute"
            ></div>
            <Toast />
        </div>
    );
};

export default ModalForTask;
