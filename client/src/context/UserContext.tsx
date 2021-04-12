import React, { createContext, useState, useEffect } from "react";
//======================================================================================\\
//                                INTERFACES AND SCHEMAS                                \\
//======================================================================================\\

type Props = {
  children: React.ReactNode;
};

export type ContextType = {
  user: IUser;
  setUser: (user: IUser) => void;
};
export interface IUser {
  username: string;
  userfullname: string;
  exp: number;
  id: number;
  role: string;
  modules_access: any;
}

//======================================================================================\\
//                                CONTEXT AND PROVIDER                                  \\
//======================================================================================\\
export const UserContext = createContext<ContextType | {}>({});

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("info");
    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("info", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
