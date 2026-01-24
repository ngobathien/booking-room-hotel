import React, { createContext, useContext, useState } from "react";

export interface User {
  _id: string;
  fullName: string;
  email: string;
  phone_number: string;
  role: string;
  status: string;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setCurrentUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{ users, setUsers, currentUser, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within UserProvider");
  }
  return context;
};
