
"use client";
import { useState } from "react";
import AceEditor from "react-ace";
import { MdOutlineSettings } from "react-icons/md";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-cloud9_day";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

const code_playground = () => {
    const [fontSize, setFontSize] = useState<number>();
    return (
        <>
        <div className="flex w-full justify-end my-5 ">    
            <button className="text-gray-100 flex items-center gap-2">
                <MdOutlineSettings size="26"/>
            </button>
        </div>
        <div className="flex">
            <AceEditor
                width="50%"
                height="600px"
                placeholder="Codingizni shu joyga yozing..."
                mode="javascript"
                theme="monokai"
                name="blah2"
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={`// Your code here`}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />

            {/* <div className="bg-slate-600 w-max p-3 flex gap-4 rounded">
                <label htmlFor="font" className="text-gray-100">
                    Shrift hajmi
                </label>
                <select id="font" className="rounded-sm">
                    <option value="16">16</option>
                    <option value="18">18</option>
                    <option value="20">20</option>
                    <option value="22">22</option>
                    <option value="24">25</option>
                </select>
            </div> */}
            <div className="w-2/4 bg-slate-400 h-full">
1
            </div>
        </div>
        </>
    );
};

export default code_playground;
