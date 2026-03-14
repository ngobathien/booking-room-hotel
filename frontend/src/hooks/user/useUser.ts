import { useContext } from "react";
import { UserContext } from "../../context/user/user.context";

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within UserProvider");
  }
  return context;
};
