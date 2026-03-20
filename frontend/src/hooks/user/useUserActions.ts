import { toast } from "react-toastify";
import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../common/services/userService";
import { useUsers } from "./useUser";

export const useUserActions = () => {
  const { setUsers, currentUser, setCurrentUser } = useUsers();

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res);
    } catch {
      toast.error("Không lấy được danh sách user");
    }
  };

  //
  const handleUpdateUser = async (id: string, data: Partial<any>) => {
    try {
      const updated = await updateUser(id, data);

      setUsers((prev) => prev.map((u) => (u._id === id ? updated : u)));

      if (currentUser?._id === id) {
        setCurrentUser(updated);
      }

      toast.success("Cập nhật thành công");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("Đã xóa người dùng");
    } catch {
      toast.error("Lỗi khi xóa người dùng");
    }
  };

  return {
    fetchUsers,
    handleUpdateUser,
    handleDeleteUser,
  };
};
