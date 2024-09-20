"use client";
import { useCategory } from "@/context/CategoryContext";
import axiosPublic from "@/utils/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Animal = () => {
  const { selectedCategory } = useCategory();
  const { data: animals = [], isLoading } = useQuery({
    queryKey: ["animals", selectedCategory],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/animals?category=${selectedCategory}`
      );
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-[50vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-md text-white"></span>
      </div>
    );
  return (
    <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 sm:gap-8 lg:gap-10 pt-10 sm:pt-12 md:pt-16">
      {animals.map((animal, index) => (
        <div key={index} className="flex justify-center items-center flex-col hover:-translate-y-1 transform transition duration-200 group">
          <div class="w-full max-w-xs py-4 h-48 flex justify-center items-center overflow-hidden bg-[#050505] border border-[#141414] group-hover:border-[#aaaaaa9a] rounded-lg shadow-lg">
            <Image
              width={150}
              height={150}
              className="object-cover w-40 p-5"
              src={animal.image}
              alt="avatar"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="block text-[18px] uppercase text-[#FFFFFFCC]">
              {animal.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animal;
