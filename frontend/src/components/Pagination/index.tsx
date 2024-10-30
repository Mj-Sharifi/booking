import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";
type props = {
  count: number;
  page: number;
  onChange: (value: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
  icon?: {
    next: ReactNode;
    prev: ReactNode;
  };
  searchable?: boolean;
  variant?: "circle" | "square";
  size?: "small" | "medium" | "large";
  style?: CSSProperties;
  updateUrl?: boolean;
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const createPageNumbers = (
  page: number,
  count: number,
  boundaryCount: number,
  siblingCount: number
) => {
  const totalNumbers = boundaryCount * 2 + siblingCount * 2 + 3;

  if (count <= totalNumbers) {
    return range(1, count);
  }
  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, count);
  const showLeftDots = leftSiblingIndex > boundaryCount + 2;
  const showRightDots = rightSiblingIndex < count - boundaryCount - 1;
  const firstPages = range(1, Math.min(1 + boundaryCount, count));
  if (firstPages.length === 1) {
    firstPages.push(2);
  }
  const lastPages = range(Math.max(count - boundaryCount, 1), count);
  if (page === count) {
    lastPages.unshift(count - 1);
  }
  let pages: (number | string)[] = [];
  if (!showLeftDots && showRightDots) {
    const leftRange = range(1, Math.max(rightSiblingIndex, 1));
    pages = [...leftRange, "...", ...lastPages];
  } else if (showLeftDots && !showRightDots) {
    const rightRange = range(Math.max(leftSiblingIndex, 1), count);
    pages = [...firstPages, "...", ...rightRange];
  } else if (showLeftDots && showRightDots) {
    const middleRange = range(
      Math.max(leftSiblingIndex, 1),
      Math.min(rightSiblingIndex, count)
    );
    pages = [...firstPages, "...", ...middleRange, "...", ...lastPages];
  }

  return pages;
};

const handleUpdateUrl = (page: number) => {
  const params = window.location.pathname;
  let searchParams = new URLSearchParams(window.location.search).toString();
  const pageParams = new URLSearchParams(window.location.search).get("page");
  searchParams = searchParams.replace(`page=${pageParams}`, "");
  const initialUrl = params + "?" + searchParams;
  window.history.pushState(
    {},
    "",
    initialUrl + `${searchParams !== "" ? "&" : ""}page=${page}`
  );
};
export default function Pagination({
  count,
  page,
  onChange,
  siblingCount = 1,
  boundaryCount = 0,
  icon = {
    next: <BiChevronRight size={28} />,
    prev: <BiChevronLeft size={28} />,
  },
  style,
  variant = "circle",
  size = "medium",
  searchable = false,
  updateUrl = false,
}: props) {
  const [btnSize, setBtnSize] = useState<string>("w-8 h-8 text-base");
  useEffect(() => {
    switch (size) {
      case "small":
        setBtnSize("min-w-7 h-7 text-sm hover:shadow-md");
        break;
      case "medium":
        setBtnSize("min-w-9 h-9 text-base hover:shadow-lg");
        break;
      case "large":
        setBtnSize("min-w-11 h-11 text-lg hover:shadow-xl");
        break;

      default:
        break;
    }
  }, [size]);

  const [showOptions, setShowOptions] = useState(false);
  const [searchedOptions, setSearchedOptions] = useState<number[]>();
  useEffect(() => {
    setSearchedOptions(range(1, count));
  }, [count]);
  const paginationDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        paginationDropdownRef.current &&
        !paginationDropdownRef.current.contains(e.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      setTimeout(() => {
        document.body.addEventListener("click", handleClickOutside);
      }, 0);
    }
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showOptions]);
  return (
    <div className="flexCenter flex-wrap gap-4">
      <ul className="flexCenter gap-3 flex-wrap">
        <li>
          <button
            className={`duration-300 hover:shadow-none ${btnSize} flexCenter ${
              variant === "circle" ? "rounded-full" : "rounded"
            } disabled:opacity-20 enabled:hover:scale-110 border border-transparent enabled:hover:border-sky-400 ltr:rotate-180`}
            disabled={page === 1}
            onClick={() => {
              const p = page-1
              onChange(p);
              if (updateUrl) {
                handleUpdateUrl(page--);
              }
            }}
          >
            {icon.next}
          </button>
        </li>
        {createPageNumbers(page, count, boundaryCount, siblingCount).map(
          (e: number | string, i: number) => {
            if (e === "...") {
              return (
                <li
                  key={i}
                  className={`inline-flex justify-center items-center hover:shadow-none ${btnSize} select-none`}
                >
                  <HiDotsHorizontal />
                </li>
              );
            } else {
              return (
                <li key={i}>
                  <button
                    className={`duration-200 dark:bg-sky-950  px-1 ${btnSize} inline-flex justify-center items-center ${
                      variant === "circle" ? "rounded-full" : "rounded"
                    } ${
                      e === page ? "bg-sky-200 dark:!bg-sky-600" : ""
                    } border-2 border-sky-400 dark:border-sky-700 text-sky-900 dark:text-sky-50 hover:scale-105 hover:shadow-sky-800`}
                    style={style}
                    onClick={() => {
                      onChange(e as number);
                      if (updateUrl) {
                        handleUpdateUrl(e as number);
                      }
                    }}
                  >
                    {e}
                  </button>
                </li>
              );
            }
          }
        )}
        <li>
          <button
            className={`duration-300 hover:shadow-none ${btnSize} flexCenter ${
              variant === "circle" ? "rounded-full" : "rounded"
            } disabled:opacity-20 enabled:hover:scale-110 border border-transparent enabled:hover:border-sky-400 ltr:rotate-180`}
            disabled={page === count}
            onClick={() => {
              const p = page+1
              onChange(p);
              if (updateUrl) {
                handleUpdateUrl(page++);
              }
            }}
          >
            {icon.prev}
          </button>
        </li>
        <li>
          {searchable && searchedOptions ? (
            <div className="relative min-w-24 duration-300 ">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowOptions(!showOptions);
                }}
                className="group w-full duration-300 flex justify-between items-center rounded px-2 py-1 overflow-x-hidden whitespace-nowrap text-ellipsis text-lg border-2 dark:bg-gray-700 border-gray-600 hover:border-sky-500"
              >
                {page}
                <BiChevronDown
                  size={26}
                  className={`duration-300 ${
                    showOptions ? "rotate-180" : ""
                  } group-hover:text-sky-700`}
                />
              </button>
              <div
                ref={paginationDropdownRef}
                className={`absolute shadow-md rounded bg-white dark:bg-gray-700 pt-2 -left-4 -right-4 bottom-full ${
                  showOptions
                    ? "flex flex-col visible animate__animated animate__fast animate__slideInUp"
                    : "hidden overflow-hidden"
                } z-20`}
              >
                <div className="px-4 flex items-center justify-between gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    onChange={(e) => {
                      let newOptions: number[];
                      newOptions = range(1, count).filter((m) => {
                        return String(m).includes(e.target.value);
                      });
                      setSearchedOptions(newOptions);
                    }}
                    className="bg-transparent duration-300 w-full rounded-md px-3 py-2 outline-none border border-sky-500 dark:border-sky-400 focus:border-sky-600 dark:focus:border-sky-500 focus:outline"
                  />
                </div>
                <hr className="my-1 w-full" />
                <ul className="max-h-40 overflow-y-auto ">
                  {searchedOptions.map((e, i) => (
                    <li
                      key={i}
                      className={`group cursor-pointer flex gap-4 items-center px-4 py-2 hover:bg-sky-100 hover:text-sky-700 `}
                      onClick={() => {
                        onChange(e);
                        if (updateUrl) {
                          handleUpdateUrl(e);
                        }
                        setShowOptions(false);
                      }}
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-center absolute text-nowrap left-1/2 -translate-x-1/2">
                جست و جو صفحه
              </p>
            </div>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
}
