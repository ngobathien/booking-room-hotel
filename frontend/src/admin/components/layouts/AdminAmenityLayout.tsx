import { Outlet } from "react-router";

const AdminAmenityLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý tiện ích </h1>

      <Outlet />
    </div>
  );
};

export default AdminAmenityLayout;
