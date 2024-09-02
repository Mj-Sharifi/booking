import { Slide, toast } from "react-toastify"

export const showNotif = (message: string, type: "error" | "success" | "warning" | "info" = "error") => {
    if (typeof document != "undefined") {

        toast[type](message, {
            // position: document?.dir == "rtl" ? "bottom-right" : "bottom-left",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: false,
            // rtl: document.dir === "rtl",
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Slide,
        })
    }

}