import { useEffect, useState } from "react";
import { useUsers, type User } from "../../context/UserContext";
import { ROLES } from "../../common/constants/roleConstant";
import { STATUS } from "../../common/constants/statusConstant";
import { STATUS_STYLE } from "../../common/constants/statusStyle";

const ManageUsersPage = () => {
  const { users, fetchUsers, handleDeleteUser, handleUpdateUser } = useUsers();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Họ và tên
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">SĐT</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Hành động
            </th>
          </tr>
        </thead>

        {/* ========================== render UI user =================================== */}

        {/* <tbody>
          {users?.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{user.fullName}</td>

              <td className="px-4 py-3">{user.email}</td>

              <td className="px-4 py-3">{user.phone_number || ""}</td>

              <td className="px-4 py-3">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleUpdateUser(user._id, { role: e.target.value })
                  }
                  className="px-2 py-1 text-sm rounded border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
                  <option value={ROLES.USER}>{ROLES.USER}</option>
                </select>
              </td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    STATUS_STYLE[user.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.status || "UNKNOWN"}
                </span>
              </td>

              <td className="px-4 py-3 flex gap-2">
                <button
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded"
                  onClick={() => handleUpdateUser(user._id)}
                >
                  Sửa
                </button>

                <button
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody> */}

        {/* ================== new: inline edit ===================== */}
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className="border-b hover:bg-gray-50">
              {/* fullName */}
              {/* <td className="px-4 py-3">{user.fullName}</td> */}
              <td className="px-4 py-3">
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
              {/* <td className="px-4 py-3">{user.email}</td> */}
              <td className="px-4 py-3">
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

              {/* phone_number */}
              {/* <td className="px-4 py-3">{user.phone_number || ""}</td> */}
              <td className="px-4 py-3">
                {editingUserId === user._id ? (
                  <input
                    value={editData.phone_number || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, phone_number: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  user.phone_number || ""
                )}
              </td>

              {/* role */}
              {/* <td className="px-4 py-3">
                <select
                  value={user.role}
                  onChange={(e) =>
                    handleUpdateUser(user._id, { role: e.target.value })
                  }
                  className="px-2 py-1 text-sm rounded border border-gray-300
               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
                  <option value={ROLES.USER}>{ROLES.USER}</option>
                </select>
              </td> */}

              <td className="px-4 py-3">
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
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    STATUS_STYLE[user.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {user.status || "UNKNOWN"}
                </span>
              </td>

              {/* hành động */}
              {/* <td className="px-4 py-3 flex gap-2">
                <button
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded"
                  onClick={() => handleUpdateUser(user._id)}
                >
                  Sửa
                </button>

                <button
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Xóa
                </button>
              </td> */}

              {/*  */}
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
                          phone_number: user.phone_number,
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
    </>
  );
};

export default ManageUsersPage;
