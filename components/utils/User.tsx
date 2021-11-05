import React, { FC, createContext, useContext, useState } from "react";
import { Auth } from "aws-amplify";

interface IUserContext {
  userName: string;
  setUserName: (newUserName: string) => void;
}

export const UserContext = createContext<IUserContext>({
  userName: "",
  setUserName: () => {},
});

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

interface IProps {
  children: object | null;
}

export const UserProvider: FC<IProps> = ({ children }) => {
  const [userName, setUserName] = useState("");


  //this grabs username from Cognito
  const getUserName = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setUserName(user.username);
  };
  getUserName();

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};
