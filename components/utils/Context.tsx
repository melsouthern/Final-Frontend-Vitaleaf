import React, { FC, createContext, useContext, useState } from "react";

interface IPlantCategoryContext {
  plantCategory: string;
  setPlantCategory: (newPlantCategory: string) => void;
}

export const PlantCategoryContext = createContext<IPlantCategoryContext>({
  plantCategory: "Cacti and Other Succulents",
  setPlantCategory: () => {},
});

interface IProps {
  children: object | null;
}

export const PlantCategoryProvider: FC<IProps> = ({ children }) => {
  const [plantCategory, setPlantCategory] = useState("");

  return (
    <PlantCategoryContext.Provider value={{ plantCategory, setPlantCategory }}>
      {children}
    </PlantCategoryContext.Provider>
  );
};
