import React from "react";
import { Outlet } from "react-router";

const AdminBookingLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Booking Management </h1>

      <Outlet />
    </div>
  );
};

export default AdminBookingLayout;
