// "use client";

// import {
//   CSSProperties,
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { createPortal } from "react-dom";

// type props = {
//   children?: ReactNode;
//   id?: string;
//   show: boolean;
//   onClose?: Dispatch<SetStateAction<any>>;
//   relativeToBody?: boolean;
//   style?: CSSProperties;
// };
// export default function Popup({
//   children,
//   id,
//   show,
//   onClose,
//   relativeToBody = true,
//   style,
// }: props) {
//   if (typeof document !== "undefined") {
//     const popupRef = useRef<HTMLDivElement>(null);
//     useEffect(() => {
//       const handleClickOutside = (e: MouseEvent) => {
//         if (onClose && popupRef.current && !popupRef.current.contains(e.target as Node)) {
//           onClose(false);
//         }
//       };
//       if (show) {
//         setTimeout(() => {
//           document.body.addEventListener("click", handleClickOutside);
//         }, 0);
//       }
//       return () => {
//         document.body.removeEventListener("click", handleClickOutside);
//       };
//     }, [show, onClose]);
//     useEffect(() => {
//       if (show) {
//         document.body.style.overflow = "hidden";
//       }
//     }, [show]);
//     if (show) {
//       return (
//         <>
//           {show && relativeToBody ? (
//             createPortal(
//               <>
//                 <div className="body-black-wrapper fixed top-0 right-0 bottom-0 left-0 z-[998] overflow-y-auto bg-black/60" />
//                 <div
//                   ref={popupRef}
//                   id={id}
//                   className="absolute z-[1000] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
//                   style={style}
//                 >
//                   {children}
//                 </div>
//               </>,

//               document.body
//             )
//           ) : (
//             <>
//               {document.getElementsByClassName("body-black-wrapper").length
//                 ? ""
//                 : createPortal(
//                     <div className="fixed top-0 right-0 bottom-0 left-0 z-[999] overflow-y-auto bg-black/60" />,
//                     document.body
//                   )}
//               <div
//                 ref={popupRef}
//                 id={id}
//                 className="absolute !z-[1001] top-full left-0 right-0"
//                 style={style}
//               >
//                 {children}
//               </div>
//             </>
//           )}
//         </>
//       );
//     }
//   }
// }
"use client";

import {
  CSSProperties,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import CloseBtn from "./CloseBtn";
import { isTarget } from "../../helpers/helper";

type props = {
  children?: ReactNode;
  id?: string;
  show: boolean;
  onClose: Dispatch<SetStateAction<any>>;
  relativeToBody?: boolean;
  style?: CSSProperties;
  allowOutsideClick?: boolean;
  showCloseBtn?: boolean;
  darkenBody?: boolean;
};

export default function Popup({
  children,
  id,
  show,
  onClose,
  relativeToBody = true,
  style,
  allowOutsideClick = true,
  showCloseBtn = false,
  darkenBody = true,
}: props) {
  const handleWindowClick = (e: MouseEvent) => {
    console.log(e);
    if (allowOutsideClick && !isTarget(e, ["popup-el"])) {
      console.log("onClose");
      setTimeout(()=>onClose(false),0);
    }
  };

  if (show) {
    return (
      <>
        {relativeToBody ? (
          createPortal(
            <div
              className="body-black-wrapper fixed top-0 right-0 bottom-0 left-0 z-[999] min-h-screen h-full min-w-full w-full overflow-y-auto overflow-x-hidden grid items-center place-items-center p-4 bg-fade-popup"
              onClick={handleWindowClick}
            >
              <div className="popup-el flex flex-col justify-center items-center">
                {showCloseBtn && <CloseBtn onClose={onClose} />}
                {children}
              </div>
            </div>,
            document.body
          )
        ) : (
          <>
            {document.getElementsByClassName("body-black-wrapper").length
              ? ""
              : createPortal(
                  <div
                    className={`fixed top-0 right-0 bottom-0 left-0 z-[999] overflow-y-auto ${
                      darkenBody
                        ? " bg-black/60"
                        : ""
                    }`}
                    onClick={handleWindowClick}
                  />,
                  document.body
                )}
            <div
              id={id}
              className="absolute z-[1001] top-full left-0 right-0 flex flex-col popup-el"
              style={style}
            >
              {showCloseBtn && <CloseBtn onClose={onClose} />}
              {children}
            </div>
          </>
        )}
      </>
    );
  }
}
