"use client";

import { isTarget } from "@/utils/utils";
import {
  CSSProperties,
  Dispatch,
  MouseEvent,
  ReactNode,
  SetStateAction,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import CloseBtn from "./CloseBtn";

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
    if (allowOutsideClick && !isTarget(e, ["popup-el"])) {
      setTimeout(() => onClose(false), 0);
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
                      darkenBody ? " bg-black/60" : ""
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
