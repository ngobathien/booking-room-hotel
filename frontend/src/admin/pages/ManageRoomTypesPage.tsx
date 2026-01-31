import { Outlet, useNavigate } from "react-router";
import RoomTypesListTable from "../components/room-types/RoomTypesListTable";
import { useEffect, useState } from "react";
import type { RoomType } from "../../types/room-types.types";
import {
  deleteRoomTypeById,
  getAllRoomTypes,
} from "../../common/services/roomTypeService";
import { toast } from "react-toastify";

const ManageRoomTypesPage = () => {
  const navigate = useNavigate();

  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

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

  // xóa một loại phòng theo id
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa nhóm này này?",
    );
    if (!confirmDelete) return;
    try {
      await deleteRoomTypeById(id);
      toast.success("Xóa loại phòng thành công");
      setRoomTypes((prev) => prev.filter((rt) => rt._id !== id));
    } catch (error) {
      console.error("Xóa thất bại", error);
    }
  };

  // giao diện bảng room type
  return (
    <div className="flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            {/*  */}
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Quản lý phòng
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor hotel inventory status in real-time.
            </p>
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
      </header>

      {/* Content */}
      <div className="p-8 max-w-7xl mx-auto w-full">
        {/* truyền props cho file RoomTypesListTable  */}
        <RoomTypesListTable roomTypes={roomTypes} handleDelete={handleDelete} />
      </div>

      <Outlet />
    </div>
  );
};

export default ManageRoomTypesPage;
