import { FC } from "react"
import { modalProps } from "../../types/type"
import { CiWarning } from "react-icons/ci"

const Modal: FC<modalProps> = (props) => {
    if (!props.isOpen) {
        return
    }
    return (
        <>
            <div className="absolute w-full h-dvh top-0 left-0 flex items-end justify-center md:items-center">
                <div className="bg-slate-900 max-w-[600px] w-full p-10 rounded-xl flex mx-10 gap-5 flex-col md:flex-row items-center md md:items-start relative z-10">
                    <div className="md:w-14 w-12 h-12 rounded-full bg-[rgba(255,0,0,0.3)] backdrop-blur-xl flex items-center justify-center">
                        <CiWarning size={30} color="red" />
                    </div>
                    <div className="flex flex-col gap-3 w-full md:text-start text-center">
                        <h2 className="font-bold text-xl">{props.title}</h2>
                        <p>{props.text}</p>
                        <div className="flex gap-3 flex-col md:flex-row w-full">
                            <button className="md:w-20 w-full bg-red-500 hover:bg-red-600 active:bg-red-300 rounded-xl h-10 duration-150" onClick={props.onClick}>{props.acceptButtonText}</button>
                            <button onClick={props.onCancel} className="md:w-20 w-full border-2 hover:bg-slate-700 rounded-xl active:bg-slate-500 h-10 duration-150">{props.rejectButtonText}</button>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={props.onCancel} className="w-full h-dvh absolute backdrop-blur-sm"></div>
        </>
    )
}
export default Modal