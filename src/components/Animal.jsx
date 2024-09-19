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

  console.log(selectedCategory);

  if (isLoading) return <h2 className="text-white text-xl">Loading...</h2>;
  return (
    <div className="grid grid-cols-6 gap-5 bg-black py-10">
      {animals.map((animal, index) => (
        <div
          key={index}
          class="w-full max-w-xs overflow-hidden bg-neutral-800 border rounded-lg shadow-lg"
        >
          <Image
            width={150}
            height={150}
            className="object-cover w-full h-56 p-5"
            src={animal.image}
            alt="avatar"
          />

          <div className="py-5 text-center">
            <h2 className="block text-xl font-bold text-white">
              {animal.name}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Animal;
