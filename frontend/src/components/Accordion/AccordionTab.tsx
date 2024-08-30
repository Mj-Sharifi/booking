// import React, { Dispatch, ReactNode, SetStateAction } from "react";

// type props = {
//   // id: string | number;
//   title: ReactNode;
//   description: ReactNode;
//   icon?: ReactNode;
//   // show: string | number|null;
//   // setShow: Dispatch<SetStateAction<number | string|null>>;
// };
// export default function AccordionTab({
//   // id,
//   title,
//   description,
//   icon,
//   // show,
//   // setShow,
// }: props) {
//   return (
//     <div className="border">
//       <div className="flex gap-x-8" >
//         <span>{icon}</span>
//         <span className="font-semibol">{title}</span>
//       </div>
//       <p
//         className={`duration-300 overflow-hidden ${
//           show == id ? "h-auto" : "h-0"
//         }`}
//       >
//         {description}
//       </p>
//     </div>
//   );
// }
