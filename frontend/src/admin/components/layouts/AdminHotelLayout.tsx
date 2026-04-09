import { Outlet } from "react-router";

const AdminHotelLayout = () => {
  return (
    <div>
      {/* <h2>Hotel Management</h2> */}
      <Outlet />
    </div>
  );
};

export default AdminHotelLayout;
