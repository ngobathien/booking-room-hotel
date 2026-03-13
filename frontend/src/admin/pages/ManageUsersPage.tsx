import { useEffect, useState } from "react";

import { useUserActions } from "../../hooks/useUserActions";
import UserListTable from "../components/users/UserListTable";
import { useUsers } from "../../hooks/user/useUser";

const ManageUsersPage = () => {
  const { fetchUsers } = useUserActions();
  const { users } = useUsers();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Quản ly người dùng
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Manage and monitor hotel inventory status in real-time.
              </p>
            </div>

            <button className=" inline-flex items-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-sm transition-all">
              <span className="material-symbols-outlined">add</span>
              Thêm phòng mới
            </button>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">
          <UserListTable />
        </div>
      </div>
    </>
  );
};

export default ManageUsersPage;
