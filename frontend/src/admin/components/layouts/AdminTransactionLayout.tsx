import { Outlet } from "react-router";

const AdminTransactionLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default AdminTransactionLayout;
