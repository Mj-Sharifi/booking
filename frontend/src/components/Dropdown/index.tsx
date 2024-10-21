import React, { ReactNode, useEffect, useRef, useState } from "react";

type dropdownProps = {
  label: string;
  animation?: string;
  children?: ReactNode;
};
export default function Dropdown({
  label,
  animation,
  children,
}: dropdownProps) {
  const dropdownButton = useRef<HTMLSpanElement>(null);
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

      if (dropdownHeight && dropdownTop) {
        if (windowHeight - dropdownTop < dropdownHeight) {
          if (dropdownList.current) {
            dropdownList.current.style.top = "100%";
            dropdownList.current.style.bottom = "auto";
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
    <div className="flex flex-col gap-2 relative py-4 lg:py-0 lg:px-8">
      <span
        ref={dropdownButton}
        className="dropdown text-light dark:text-lighter text-sm"
        onClick={() => setDropdown(true)}
      >
        {label}
      </span>
      <div
        ref={dropdownList}
        className={`dropdown absolute top-1 ${
          dropdown ? `${animation} visible` : "invisible"
        } bg-transparent overflow-hidden `}
      >
        {children}
      </div>
    </div>
  );
}
