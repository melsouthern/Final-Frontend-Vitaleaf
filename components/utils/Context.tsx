import React, { createContext, useContext, useState } from "react";


interface IPlantCategoryContext {
  plantCategory: string;
   setPlantCategory: (newPlantCategory: string) => void;
}

export const PlantCategoryContext = createContext<IPlantCategoryContext>({
    plantCategory: "Flowering House Plants",
    setPlantCategory: () => {},
  });

  export const PlantCategoryProvider = ({ children }) => {
    const [plantCategory, setPlantCategory] = useState("");
  
  
    return (
      <PlantCategoryContext.Provider value={{ plantCategory, setPlantCategory }}>
        {children}
      </PlantCategoryContext.Provider>
    );
  };