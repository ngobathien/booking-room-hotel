import React, { createContext, useContext, useState } from "react";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../common/services/userService";
import { toast } from "react-toastify";

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
  fetchUsers: () => Promise<void>;
  handleUpdateUser: (id: string, data: Partial<User>) => Promise<void>;
  handleDeleteUser: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      console.log(res);
      setUsers(res);
    } catch (error) {
      toast.error("Không lấy được danh sách user");
    }
  };

  const handleUpdateUser = async (id: string, data: Partial<User>) => {
    try {
      const res = await updateUser(id, data);
      console.log("UPDATED USER:", res);

      setUsers((prev) => prev.map((user) => (user._id === id ? res : user)));

      toast.success("Cập nhật thành công");
    } catch (error) {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (!confirmDelete) return;

    try {
      await deleteUser(userId);
      localStorage.removeItem("token");
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      toast.success("Đã xóa người dùng");
    } catch (error) {
      toast.error("Lỗi khi xóa người dùng");
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        fetchUsers,
        handleUpdateUser,
        handleDeleteUser,
      }}
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
