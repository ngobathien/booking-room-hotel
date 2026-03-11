import React, { useEffect, useState } from "react";
import RoomListTable from "../components/rooms/RoomListTable";
import { useNavigate } from "react-router";
import RoomGrid from "../components/rooms/RoomGrid";
import useRoomAction from "../../hooks/useRoomAction";
import { useRoomContext } from "../../context/RoomContext";

const ManageRoomPage = () => {
  const navigate = useNavigate();
  // chế độ hiển thị: grid (ô) hoặc list(danh sách)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { rooms } = useRoomContext();
  console.log(rooms);

  const { handleDeleteRoom } = useRoomAction();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Sơ đồ & Danh sách phòng
          </h1>
          <p className="text-slate-500">
            Giám sát và vận hành hệ thống phòng theo thời gian thực.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white text-primary shadow-sm" : "text-slate-400"}`}
            >
              <span className="material-symbols-outlined block">grid_view</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white text-primary shadow-sm" : "text-slate-400"}`}
            >
              <span className="material-symbols-outlined block">
                format_list_bulleted
              </span>
            </button>
          </div>
          <button
            onClick={() => navigate("create")}
            className="inline-flex items-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            Thêm phòng mới
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <RoomGrid
          rooms={rooms}
          // onEdit={handleEdit}
          onDelete={handleDeleteRoom}
        />
      ) : (
        <RoomListTable
          rooms={rooms}
          // onEdit={handleEdit}
          onDelete={handleDeleteRoom}
        />
      )}
    </div>
  );
};

export default ManageRoomPage;
