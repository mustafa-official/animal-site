import React, { useContext, useState } from 'react';
const { createContext } = require("react");

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => useContext(CategoryContext);