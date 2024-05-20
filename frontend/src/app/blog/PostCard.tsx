import React from "react";

type props = {
  release_Date: string;
  image: string;
  title: string;
};
export default function PostCard({ release_Date, image, title }: props) {
  return (
    <div className="flex flex-col items-center sm:flex-row gap-4 text-sm sm:text">
      <div className="rounded-lg overflow-hidden"><img src={image} alt={title} className="w-full h-full object-cover hover:scale-110 duration-300" /></div>
      <div className="flex flex-col gap-4">
        <span>{release_Date}</span>
        <h2 className="font-semibold text sm:text-xl">{title}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          atque voluptatum voluptatibus quisquam reiciendis veniam dolorum?
          Pariatur dicta ad quam?
        </p>
      </div>
    </div>
  );
}
