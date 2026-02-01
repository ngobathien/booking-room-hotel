import React from "react";
import RoomListTable from "../components/rooms/RoomListTable";
import { useNavigate } from "react-router";

const ManageRoomPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Quản lý phòng
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor hotel inventory status in real-time.
            </p>
          </div>

          <button
            onClick={() => navigate("create")}
            className=" inline-flex items-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-sm transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Thêm phòng mới
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-8 max-w-7xl mx-auto w-full">
        <RoomListTable />
      </div>
    </div>
  );
};

export default ManageRoomPage;
