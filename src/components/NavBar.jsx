"use client";
import { useCategory } from "@/context/CategoryContext";
import React from "react";

const NavBar = () => {
  const { setSelectedCategory } = useCategory();
  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex justify-between items-center pt-6">
      <div className="flex items-center gap-5">
        <button
          className="px-6 py-2 tracking-wide text-red-600 capitalize transition-colors transform rounded-full border border-red-600"
          onClick={() => handleCategory("Land Animal")}
        >
          Land Animal
        </button>
        <button
          className="px-6 py-2 tracking-wide text-red-600 capitalize transition-colors transform rounded-full border border-red-600"
          onClick={() => handleCategory("Bird")}
        >
          Bird
        </button>
        <button
          className="px-6 py-2 tracking-wide text-red-600 capitalize transition-colors transform rounded-full border border-red-600"
          onClick={() => handleCategory("Fish")}
        >
          Fish
        </button>
        <button
          className="px-6 py-2 tracking-wide text-red-600 capitalize transition-colors transform rounded-full border border-red-600"
          onClick={() => handleCategory("Insect")}
        >
          Insect
        </button>
      </div>
      <div className="flex items-center gap-5">
        <button className="px-6 py-2 tracking-wide text-white capitalize transition-colors transform rounded-full border border-white">
          Add Animal
        </button>
        <button className="px-6 py-2 tracking-wide text-white capitalize transition-colors transform rounded-full border border-white">
          Add Category
        </button>
      </div>
    </div>
  );
};

export default NavBar;
