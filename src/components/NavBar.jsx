"use client";
import { useCategory } from "@/context/CategoryContext";
import axiosPublic from "@/utils/axiosPublic";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
const img_hosting_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`;

const NavBar = () => {
  const { setSelectedCategory } = useCategory();
  const [animalCreated, setAnimalCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animalName, setAnimalName] = useState("");
  const [animalImage, setAnimalImage] = useState("");
  const [activeCategory, setActiveCategory] = useState("Land Animal");

  const handleCategory = (category) => {
    setSelectedCategory(category);
    setActiveCategory(category);
  };

  const { data: categories = [] } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/category");
      return data;
    },
  });

  const handleAnimalCreate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const animalImage = e.target.image.files[0];
    const imageFile = { image: animalImage };

    try {
      setLoading(true);
      const res = await axiosPublic.post(img_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        const image = res.data.data.display_url;
        setAnimalName(name);
        setAnimalImage(image);
        setAnimalCreated(true);
        toast.success("Animal name & image added!");
        setLoading(false);
        document.getElementById("modal-one").close();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!animalCreated) {
      return toast.error("Please add animal name and image!");
    }
    const category = e.target.category.value;
    const animalInfo = {
      name: animalName,
      image: animalImage,
      category: category,
    };
    try {
      setLoading(true);
      const { data } = await axiosPublic.post("/create-animal", animalInfo);
      if (data.insertedId) {
        setLoading(false);
        setAnimalName("");
        setAnimalImage("");
        document.getElementById("modal-two").close();
        window.location.reload();
        toast.success("New animal created successfully!");
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center lg:justify-between flex-wrap gap-2 md:gap-5 items-center pt-6 sm:pt-10">
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-5">
        {[...new Set(categories?.map((category) => category.category))].map(
          (uniqueCategory, index) => (
            <button
              key={index}
              className={`px-6 py-2 tracking-wide capitalize transition-colors transform rounded-full border ${
                activeCategory === uniqueCategory
                  ? "border-[#058F34] text-[#058F34]"
                  : "border-red-600 text-red-600"
              }`}
              onClick={() => handleCategory(uniqueCategory)}
            >
              {uniqueCategory}
            </button>
          )
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 md:gap-5">
        <div>
          <button
            onClick={() => document.getElementById("modal-one").showModal()}
            className="px-6 py-2 tracking-wide text-white capitalize transition-colors transform rounded-full border border-white"
          >
            Add Animal
          </button>
          <dialog id="modal-one" className="modal">
            <div className="modal-box max-w-sm">
              <h3 className="font-bold text-lg">Add Animal</h3>
              <div className="mt-4">
                <form onSubmit={handleAnimalCreate}>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Animal Name"
                    className="input input-bordered w-full mt-4"
                  />
                  <input
                    required
                    type="file"
                    name="image"
                    className="file-input file-input-bordered w-full mt-4"
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className="px-2 disabled:cursor-not-allowed py-3 mt-6 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-neutral-900 focus:ring-opacity-80"
                  >
                    {loading ? (
                      <span className="loading loading-spinner text-white"></span>
                    ) : (
                      "Create Animal"
                    )}
                  </button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div>
          <button
            onClick={() => document.getElementById("modal-two").showModal()}
            className="px-6 py-2 tracking-wide text-white capitalize transition-colors transform rounded-full border border-white"
          >
            Add Category
          </button>
          <dialog id="modal-two" className="modal">
            <div className="modal-box max-w-sm">
              <h3 className="font-bold text-lg">Add Category</h3>
              <div className="mt-4">
                <form onSubmit={handleSaveCategory}>
                  <input
                    required
                    type="text"
                    name="category"
                    placeholder="Name"
                    className="input input-bordered w-full mt-4"
                  />

                  <button
                    disabled={loading}
                    type="submit"
                    className="px-2 disabled:cursor-not-allowed py-3 mt-6 w-full font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-neutral-900 focus:ring-opacity-80"
                  >
                    {loading ? (
                      <span className="loading loading-spinner text-white"></span>
                    ) : (
                      "Save"
                    )}
                  </button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
