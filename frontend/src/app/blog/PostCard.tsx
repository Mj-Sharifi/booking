import React from "react";

type props = {
  release_Date: string;
  image: string;
  title: string;
};

export default function PostCard({ release_Date, image, title }: props) {
  const date = new Date(release_Date)
  const formattedDate = new Intl.DateTimeFormat(undefined,{dateStyle:"long"}).format(date)
  return (
    <div className="flex flex-col items-center sm:flex-row gap-4 lg:max-h-60">
      <div className="rounded-lg overflow-hidden h-full md:min-w-40 lg:min-w-60 aspect-square"><img src={process.env.NEXT_PUBLIC_URL+image} alt={title} className="w-full h-full object-cover hover:scale-110 duration-300"/></div>
      <div className="flex flex-col gap-2 md:gap-4">
        <span>{formattedDate}</span>
        <h2 className="font-semibold text-lg md:text-xl">{title}</h2>
        <p className="text-sm md:text-base">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione
          atque voluptatum voluptatibus quisquam reiciendis veniam dolorum?
          Pariatur dicta ad quam?
        </p>
      </div>
    </div>
  );
}
