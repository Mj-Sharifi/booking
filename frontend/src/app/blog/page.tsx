"use client";

import { useEffect, useState } from "react";
import BlogSidebar from "./BlogSidebar";
import axios from "axios";

export default function Blog() {
  const [blog, setBlog] = useState();

  const [category, setCategory] = useState<string>("");
  const handleCategory = (category:string) => {
    setCategory(category)
  };
  useEffect(()=>{},[])

  return (
    <section className="container mx-auto flex">
      <div className="w-1/4 h-80 bg-red-500 order-1 sm:order-2">
        <BlogSidebar />
      </div>
      <div className="w-3/4 h-80 bg-green-500"></div>
    </section>
  );
}
