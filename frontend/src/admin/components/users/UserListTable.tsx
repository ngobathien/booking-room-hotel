import { useEffect, useState } from "react";

import { ROLES } from "../../../common/constants/roleConstant";
import { useUserActions } from "../../../hooks/useUserActions";
import { useUsers } from "../../../hooks/user/useUser";
import { STATUS_USER_STYLE, type User } from "../../../types/user.types";

const UserListTable = () => {
  const { fetchUsers, handleDeleteUser, handleUpdateUser } = useUserActions();
  const { users } = useUsers();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                {/* Xóa tất cả */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Xóa tất cả
                </th>
                {/*  Họ và tên */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Họ và tên
                </th>
                {/* Email */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Email
                </th>
                {/* SĐT */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  SĐT
                </th>
                {/* Role */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Role
                </th>
                {/* Trạng thái */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Trạng thái
                </th>
                {/* Thao tác */}
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
                  Thao tác
                </th>
              </tr>
            </thead>

            {/* ========================== render UI user =================================== */}

            {/* ================== new: inline edit ===================== */}
            <tbody className="divide-y divide-[#e7ebf3]">
              {users?.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  {/* checkbox chưa triển khai */}
                  <td className="px-4 py-3 text-center">
                    <input type="checkbox" />
                  </td>

                  {/* fullName */}
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

                  {/* email */}
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
                  {/* phoneNumber */}
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingUserId === user._id ? (
                      <select
                        value={editData.role}
                        onChange={(e) =>
                          setEditData({ ...editData, role: e.target.value })
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value={ROLES.ADMIN}>ADMIN</option>
                        <option value={ROLES.USER}>USER</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>

                  {/* status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        STATUS_USER_STYLE[user.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.status || "UNKNOWN"}
                    </span>
                  </td>

                  {/* hành động */}

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
          </table>{" "}
        </div>
      </div>
    </>
  );
};

export default UserListTable;
