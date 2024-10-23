import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type dropdownProps = {
  label: string;
  animation?: string;
  children?: ReactNode;
  btnStyle?: CSSProperties;
  btnClassNames?:string
  dropElementStyle?: CSSProperties;
  closeOnClick?: boolean;
  OpenMode?: "hover" | "click";
};
export default function Dropdown({
  label,
  animation = "animate-fadeInUp",
  children,
  btnStyle,
  btnClassNames,
  dropElementStyle,
  closeOnClick = true,
  OpenMode = "click",
}: dropdownProps) {
  const dropdownButton = useRef<HTMLButtonElement>(null);
  const dropdownList = useRef<HTMLDivElement>(null);

  const [dropdown, setDropdown] = useState<boolean>(false);
  useEffect(() => {
    document.addEventListener("click", (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown")) {
        setDropdown(false);
      }
    });
  }, []);
  useEffect(() => {
    const adjustDropdownPosition = () => {
      const dropdownHeight = dropdownList?.current?.clientHeight;
      const windowHeight = window.innerHeight;
      const dropdownTop = dropdownButton?.current?.getBoundingClientRect().top;
      if (dropdownList.current) {
        dropdownList.current.style.zIndex = "10000";
      }
      if (dropdownHeight && dropdownTop) {
        if (windowHeight - dropdownTop < dropdownHeight) {
          if (dropdownList.current) {
            dropdownList.current.style.bottom = "100%";
            dropdownList.current.style.top = "auto";
          }
        } else {
          if (dropdownList.current) {
            dropdownList.current.style.top = "100%";
            dropdownList.current.style.bottom = "auto";
          }
        }
      }
    };

    adjustDropdownPosition();

    // Re-adjust position on window resize
    window.addEventListener("resize", adjustDropdownPosition);
    return () => window.removeEventListener("resize", adjustDropdownPosition);
  }, []);

  return (
    <div className="flex flex-col gap-2 relative " onMouseLeave={()=>OpenMode=="hover"&&setDropdown(false)}>
      <button
        type="button"
        ref={dropdownButton}
        className={`dropdown ${btnClassNames} `}
        onClick={() => OpenMode == "click" && setDropdown(true)}
        onMouseEnter={() => OpenMode == "hover" && setDropdown(true)}
        style={btnStyle}
      >
        {label}
      </button>
      <div
        ref={dropdownList}
        id="dropdown-list-element"
        className={`dropdown duration-0 absolute right-1/2 !translate-x-1/2 ${
          dropdown ? `${animation} visible opacity-100` : "invisible opacity-0"
        } bg-transparent shadow-md`}
        style={dropElementStyle}
        onClick={() => {
          if (closeOnClick) {
            setDropdown(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
