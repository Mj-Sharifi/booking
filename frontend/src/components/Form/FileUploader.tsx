import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { FaUpload } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

type props = {
  label?: string;
  description?: string;
  name: string;
  id?: string;
  accept: string;
  imageURL?: string;
  onChange: (value: FileList | null) => void;
  onBlur?: () => void;
  isToched?: boolean;
  errorMessage?: string;
};
export default function FileUploader({
  label,
  description,
  name,
  accept,
  id,
  imageURL,
  onChange,
  onBlur,
  isToched,
  errorMessage,
}: props) {
  const t = useTranslations("profile");
  // console.log("imgurl: ",imageURL);
  return (
    <div className={"flex flex-col md:flex-row gap-3"}>
      <div className="flex flex-col gap-y-2 text-justify">
        <span className="font-semibold md:text-lg">
          {label || "Your image"}
        </span>
        <span className="text-sm md:text-base">
          {description || "Only jpeg"}
        </span>
        <input
          id={id || `image_uploder_${name}`}
          name={name}
          type="file"
          accept={accept || undefined}
          onChange={(e) => onChange(e.target.files)}
          className="hidden"
          hidden
        />
        <label
          htmlFor={id || `image_uploder_${name}`}
          className="duration-300 px-3 py-2 rounded-md bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark flexCenter gap-2 w-fit"
        >
          {t("browse")} <FaUpload size={16} />
        </label>
        {isToched && errorMessage ? (
          <span className="text-sm lg:text-base text-red-600 dark:text-red-400">
            {errorMessage}
          </span>
        ) : (
          ""
        )}
      </div>
      <div
        className={`relative border max-w-[133px] max-h-[200px] ${
          isToched && errorMessage
            ? "border-red-600 dark:border-red-400 border-2"
            : isToched && !errorMessage
            ? "border-green-600 dark:border-green-400 border-2"
            : !isToched && !errorMessage
            ? "border-darkblue dark:border-lightblue"
            : ""
        }  rounded-2xl overflow-hidden`}
      >
        <Image
          src={imageURL || "/assets/images/default_avatar.png"}
          alt={imageURL ? name : "default_avatar"}
          width={400}
          height={600}
        />
        {
          <button
            type="button"
            className="absolute top-2 rtl:right-2 ltr:left-2 p-1 rounded-full bg-white dark:bg-dark z-[2]"
            onClick={() => onChange(null)
              
            }
          >
            <MdDelete
              size={26}
              className="duration-300 text-darkblue dark:text-lightblue hover:text-dark dark:hover:bg-white"
            />
          </button>
        }
      </div>
    </div>
  );
}
