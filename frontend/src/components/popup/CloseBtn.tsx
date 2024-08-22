import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  onClose: Dispatch<SetStateAction<boolean>>;
}

export default function CloseBtn({ onClose }: Props) {
  return (
    <button type="button" onClick={() => onClose(false)} className="flex mr-2 text-white hover:bg-red-600 p-1 rounded-full duration-300 relative translate-y-[120%] w-fit self-start z-[1]">
        <IoClose size={24} />
    </button>
  )
}