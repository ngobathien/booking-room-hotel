import React, { useState } from "react";
import type { User } from "../../types/user.types";
import { UserContext } from "./user.context";

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
