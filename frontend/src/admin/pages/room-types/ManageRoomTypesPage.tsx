import { Outlet, useNavigate } from "react-router";
import RoomTypesListTable from "../../components/room-types/RoomTypeTable";
import { useEffect, useState } from "react";
import type { RoomType } from "../../../types/room-types.types";
import {
  createNewRoomType,
  deleteRoomTypeById,
  getAllRoomTypes,
} from "../../../common/services/roomTypeService";

import RoomTypeGrid from "../../components/room-types/RoomTypeGrid";
import RoomTypeTable from "../../components/room-types/RoomTypeTable";
import { useRoomTypes } from "../../../hooks/useRoomTypes";

const ManageRoomTypesPage = () => {
  const navigate = useNavigate();

  // chế độ hiển thị: grid (ô) hoặc list(danh sách)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  //
  const [isFormOpen, setIsFormOpen] = useState(false);
  //
  const [editingType, setEditingType] = useState<RoomType | null>(null);

  // dùng custom hook useRoomTypes
  const { roomTypes, loading, deleteRoomType } = useRoomTypes();

  // lấy dữ liệu room types
  useEffect(() => {
    const fetchRoomTypes = async () => {
      const roomTypes = await getAllRoomTypes();
      console.log(roomTypes);
      setRoomTypes(roomTypes);
    };
    //
    fetchRoomTypes();
  }, []);

  // giao diện bảng room type
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Danh mục Loại phòng
          </h1>
          <p className="text-slate-500">
            Quản lý cấu hình, giá và tiện ích cho từng hạng phòng khách sạn.
          </p>
        </div>

        {/* view ô hoặc danh sách */}
        <div className="flex gap-4">
          <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 ">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white  text-primary shadow-sm" : "text-slate-400"}`}
            >
              <span className="material-symbols-outlined block">grid_view</span>
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white  text-primary shadow-sm" : "text-slate-400"}`}
            >
              <span className="material-symbols-outlined block">
                format_list_bulleted
              </span>
            </button>
          </div>

          {/* nút chuyển hướng sang trang thêm hoặc tạo loại phòng */}
          <button
            onClick={() => navigate("create")}
            className=" inline-flex items-center gap-2 px-5 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-sm shadow-sm transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Thêm loại phòng mới
          </button>
        </div>
      </div>

      {/* Content */}

      {/* truyền props cho file RoomTypesListTable  */}
      {viewMode === "grid" ? (
        <RoomTypeGrid roomTypes={roomTypes} />
      ) : (
        <RoomTypeTable
          roomTypes={roomTypes}
          loading={loading}
          onDelete={deleteRoomType}
        />
      )}
      <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default ManageRoomTypesPage;
