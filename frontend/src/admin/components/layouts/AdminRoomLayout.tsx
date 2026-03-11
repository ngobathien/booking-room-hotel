import { Outlet } from "react-router";
import { RoomProvider } from "../../../context/RoomContext";

const AdminRoomLayout = () => {
  return (
    <RoomProvider>
      <Outlet />
    </RoomProvider>
  );
};

export default AdminRoomLayout;
