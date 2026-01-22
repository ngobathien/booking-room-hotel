import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { ROLES } from "../../common/constants";
interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone_number: string;
  role: string;
  status: string;
}
const ManageUsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     // const userData =
  //   };
  // }, []);

  return (
    <>
      <h1>ManageUsersPage</h1>

      <table>
        <tr>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Role</th>
          <th>Trạng thái tài khoản</th>
          <th>Hành động</th>
        </tr>
        {/*  */}
        {/* data mẫu */}
        {/* <tr>
          <td>Ngô Văn A</td>
          <td>van@gmail.com</td>
          <td>0123456789</td>
          <td>
            <select name="role" id="role">
              <option value="USER">{ROLES.USER}</option>
              <option value="ADMIN">{ROLES.ADMIN}</option>
            </select>
          </td>
          <td>Hoạt động</td>
        </tr> */}
        {user.map((user, index) => (
          <>
            <tr>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button className="cursor-pointer bg-green500">Sửa</button>
                <button className="cursor-pointer">Xóa</button>
              </td>
            </tr>
          </>
        ))}
      </table>
    </>
  );
};

export default ManageUsersPage;
