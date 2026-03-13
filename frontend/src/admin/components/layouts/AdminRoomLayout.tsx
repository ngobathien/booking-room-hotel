import { Outlet } from "react-router";
import { RoomProvider } from "../../../context/room/RoomProvider";

const AdminRoomLayout = () => {
  return (
    <RoomProvider>
      <Outlet />
    </RoomProvider>
  );
};

export default AdminRoomLayout;
