import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { FaUpload } from "react-icons/fa6";

type props = {
  label?: string;
  description?:string
  name: string;
  id?: string;
  initialValue?: string;
  accept:string
  onChange: (value: FileList | null) => void;
  onBlur?: (value: string | number) => void;
  isToched?: boolean;
  errorMessage?: string;
};
export default function FileUploader({
  label,
  description,
  name,
  accept,
  id,
  initialValue,
  onChange,
  onBlur,
  isToched,
  errorMessage,
}: props) {
  const t = useTranslations("profile");
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col gap-y-2 text-justify">
        <span className="font-semibold md:text-lg">{label||"Your image"}</span>
        <span className="text-sm md:text-base">{description||"Only jpeg"}</span>
        <input
          id={id || `image_uploder_${name}`}
          name={name}
          type="file"
          accept={accept||undefined}
          onChange={(e) => onChange(e.target.files)}
          // className="hidden"
          hidden
        />
        <label
          htmlFor={id || `image_uploder_${name}`}
          className="duration-300 px-3 py-2 rounded-md bg-darkblue hover:bg-dark dark:bg-lightblue dark:hover:bg-white text-white dark:text-dark flexCenter gap-2 w-fit"
        >
          {t("browse")} <FaUpload size={16} />
        </label>
      </div>
      
      {/* <Image/> */}
    </div>
  );
}
