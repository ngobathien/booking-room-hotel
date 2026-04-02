import { useEffect } from "react";

import { useUserActions } from "../../../hooks/user/useUserActions";
import UserListTable from "../../components/users/UserListTable";
import UserStats from "../../components/users/UserStats";
import { useUsers } from "../../../hooks/user/useUser";

const ManageUsersPage = () => {
  const { fetchUsers } = useUserActions();
  const { users } = useUsers();
  // const [editingUserId, setEditingUserId] = useState<string | null>(null);
  // const [editData, setEditData] = useState<Partial<User>>({});

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
                Quản lý người dùng
              </h2>
            </div>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* stats */}
          <UserStats users={users} />
          {/* list data user */}
          <UserListTable />
        </div>
      </div>
    </>
  );
};

export default ManageUsersPage;
