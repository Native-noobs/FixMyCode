import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";

const Toast = () => {
    return (
        <div>
            <ToastContainer closeOnClick stacked />
        </div>
    );
};
export default Toast;
