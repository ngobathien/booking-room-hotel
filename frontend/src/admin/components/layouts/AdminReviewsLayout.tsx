import { Outlet } from "react-router";

const AdminReviewsLayout = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6"></h1>

      <Outlet />
    </div>
  );
};

export default AdminReviewsLayout;
