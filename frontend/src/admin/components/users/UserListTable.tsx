import { useEffect, useState } from "react";

import { ROLES } from "../../../common/constants/roleConstant";
import { useUserActions } from "../../../hooks/user/useUserActions";
import { useUsers } from "../../../hooks/user/useUser";
import {
  ROLE_LABEL,
  STATUS_USER_LABEL,
  STATUS_USER_STYLE,
  type User,
  type UserRole,
} from "../../../types/user.types";

const UserListTable = () => {
  const { fetchUsers, handleDeleteUser, handleUpdateUser, handleChangeStatus } =
    useUserActions();
  const { users } = useUsers();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Họ và tên
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                SĐT
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                Thao tác
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e7ebf3]">
            {users?.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                {/* FULLNAME */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <input
                      value={editData.fullName || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, fullName: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.fullName
                  )}
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <input
                      value={editData.email || ""}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* PHONE */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <input
                      value={editData.phoneNumber || ""}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          phoneNumber: e.target.value,
                        })
                      }
                      className="border px-2 py-1 rounded w-full"
                    />
                  ) : (
                    user.phoneNumber || ""
                  )}
                </td>

                {/* ROLE */}
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingUserId === user._id ? (
                    <select
                      value={editData.role}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          role: e.target.value as UserRole,
                        })
                      }
                      className="border px-2 py-1 rounded"
                    >
                      <option value={ROLES.ADMIN}>ADMIN</option>
                      <option value={ROLES.USER}>USER</option>
                    </select>
                  ) : (
                    ROLE_LABEL[user.role]
                  )}
                </td>

                {/* STATUS */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.status}
                    onChange={(e) =>
                      handleChangeStatus(user._id, e.target.value)
                    }
                    className={`px-2 py-1 text-xs rounded border ${
                      STATUS_USER_STYLE[user.status]
                    }`}
                  >
                    <option value="ACTIVE">Đang hoạt động</option>
                    <option value="INACTIVE">Không hoạt động</option>
                    <option value="BLOCKED">Bị chặn</option>
                  </select>
                </td>

                {/* ACTION */}
                <td className="px-4 py-3 flex gap-2">
                  {editingUserId === user._id ? (
                    <>
                      <button
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded"
                        onClick={async () => {
                          await handleUpdateUser(user._id, editData);
                          setEditingUserId(null);
                          setEditData({});
                        }}
                      >
                        Lưu
                      </button>

                      <button
                        className="px-3 py-1 text-sm text-white bg-gray-400 rounded"
                        onClick={() => {
                          setEditingUserId(null);
                          setEditData({});
                        }}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-3 py-1 text-sm text-white bg-indigo-600 rounded"
                        onClick={() => {
                          setEditingUserId(user._id);
                          setEditData({
                            fullName: user.fullName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            role: user.role,
                          });
                        }}
                      >
                        Sửa
                      </button>

                      <button
                        className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                        onClick={() => handleDeleteUser(user._id)}
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserListTable;
