import React, { useState, useEffect } from "react";
import axios from "axios";
import { blogCategoryDate } from "@/types/types";
export default function BlogSidebar() {
  const [allCategories, setAllCategories] = useState<blogCategoryDate[]>();
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "blog-categories")
      .then((res) => setAllCategories(res.data.data));
  }, []);
  console.log(allCategories);
  return (
    <div>
      <div>
        <span>Categories<input type="checkbox"/></span>
        <ul>
          <li>All Categories</li>
          {allCategories?.map((e) => (
            <li key={e.id}>
              {e.attributes.title}
              <input type="checkbox"/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
