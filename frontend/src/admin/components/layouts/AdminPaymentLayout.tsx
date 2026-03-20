import React from "react";
import { Outlet } from "react-router-dom";

const AdminPaymentLayout: React.FC = () => {
  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      {/* có thể thêm header con nếu muốn */}
      <Outlet />
    </div>
  );
};

export default AdminPaymentLayout;
