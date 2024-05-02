import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-darkblue text-white">
      <div className="container mx-auto px-4">
        <div>
          <div></div>
          <div></div>
        </div>
        <div className="border-t border-white py-4 text-sm flex flex-wrap justify-between w-full gap-x-10">
          <div className="py-4 text-sm flex flex-wrap sm:gap-6 md:gap-10 gap-y-5">
            <span>
              by{" "}
              <a href="mailto:mj.sharifimanesh@gmail.com">
                mj.sharifimanesh@gmail.com
              </a>
            </span>
            <div className="flexCenter gap-3">
              <Link href={"#"} className="hover:translate-x-1 duration-200">
                Privacy
              </Link>
              <Link href={"#"} className="hover:translate-x-1 duration-200">
                Terms
              </Link>
              <Link href={"#"} className="hover:translate-x-1 duration-200">
                Site Map
              </Link>
            </div>
          </div>
          <div className="flexCenter gap-6">
            <div className="flexCenter gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
              <span className="underline font-semibold">English(US)</span>
              
            </div>
            <div  className="flexCenter gap-1">$ &nbsp; <span className="underline font-semibold">USD</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
