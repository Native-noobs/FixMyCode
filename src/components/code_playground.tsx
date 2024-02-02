"use client";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";
import { MdOutlineSettings } from "react-icons/md";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/ext-language_tools";

const Code_playground = () => {
  const [fontSize, setFontSize] = useState<number>();
  const [font, setFont] = useState<string>();
  useEffect(() => {
    try {
      setFont(localStorage.getItem("font") || "monokai");
      setFontSize(Number(localStorage.getItem("fontSize")) || 16);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [settingModal, setSettingModal] = useState<boolean>(false);
  const [output, setOutput] = useState<string>("");
  const [code, setCode] = useState<string>(
    "// Codingizni shu joyga yozing... :)"
  );

  useEffect(() => {
    localStorage.setItem("font", font || "monokai");
    localStorage.setItem("fontSize", String(fontSize));
    setSettingModal(false);
  }, [font, fontSize]);

  return (
    <div>
      <div className="flex justify-between my-10 relative">
        <h1 className="text-4xl text-white font-semibold">
          Uyga vazifani topshirish uchun
        </h1>
        <button
          className="text-gray-100 flex items-center gap-2 z-[11]"
          onClick={() => setSettingModal(!settingModal)}
        >
          <MdOutlineSettings size="26" />
        </button>
        {settingModal && (
          <div className="bg-slate-600 p-3 w-80 flex flex-col gap-4 rounded absolute right-6 top-7 z-[11]">
            <h2 className="text-gray-100 text-xl">Sozlamalar</h2>
            <div className="flex gap-4 w-full justify-between">
              <label htmlFor="font" className="text-gray-100">
                Shrift hajmi
              </label>
              <select
                id="font"
                className="rounded-sm w-max"
                onChange={(e) => {
                  setFontSize(Number(e.target.value));
                }}
                defaultValue={fontSize}
              >
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
                <option value="24">24</option>
              </select>
            </div>
            <div className="flex gap-4 w-full justify-between">
              <label htmlFor="font" className="text-gray-100">
                Shriftlar
              </label>
              <select
                id="font"
                className="rounded-sm w-max"
                onChange={(e) => {
                  setFont(e.target.value);
                }}
                defaultValue={font}
              >
                <option value="monokai">Monokai</option>
                <option value="ambiance">Ambiance</option>
                <option value="chaos">Chaos</option>
                <option value="cobalt">Cobalt</option>
                <option value="dracula">Dracula</option>
                <option value="terminal">Terminal</option>
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="flex rounded-3xl overflow-hidden">
        <AceEditor
          width="50%"
          height="600px"
          mode="javascript"
          theme={font}
          name="blah2"
          fontSize={fontSize}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={code}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            useWorker: false,
          }}
          onChange={(e) => {
            setCode(e);
          }}
        />
        <div className="w-2/4 h-[600px] bg-gray-900 text-white p-8">
          <h3 className="text-3xl font-semibold">Chiqish</h3>
          <div className="bg-slate-600 w-full min-h-10 p-5 rounded-md mt-10">
            {output}
          </div>
        </div>
      </div>
      {settingModal && (
        <div
          className="absolute w-full h-dvh top-0 left-0 bg-[rgba(0,0,0,0.4)] bg-blur z-10"
          onClick={() => setSettingModal(false)}
        ></div>
      )}
      <div className="ml-auto text-white mt-5 flex w-full justify-end gap-5">
        <button
          className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => {
            fetch("/api/runner", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                code,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setOutput(data.output);
              });
          }}
        >
          Sinash
        </button>
        <button
          className="py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          onClick={() => {
            fetch("/api/runner", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                code,
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setOutput(data.output);
              });
          }}
        >
          Tekshirish
        </button>
      </div>
    </div>
  );
};

export default Code_playground;
