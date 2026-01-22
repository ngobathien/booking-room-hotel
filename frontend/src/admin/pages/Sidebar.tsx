import React from "react";
import { Link, NavLink } from "react-router";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-xl font-bold mb-6">Admin</h1>

      <nav className="flex flex-col gap-3">
        <NavLink to="users">Quản lý người dùng</NavLink>
        <NavLink to="rooms">Quản lý phòng</NavLink>
        {/* <NavLink to="room-types">Quản lý loại phòng</NavLink> */}
        {/* <Link to="bookings">Quản lý người dùng</Link> */}
      </nav>
    </aside>
  );
};

export default Sidebar;
