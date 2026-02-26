import React, { useEffect, useState } from "react";
import * as ReactRouterDom from "react-router-dom";
import { toast } from "react-toastify";
import { useRoomTypes } from "../../../hooks/useRoomTypes";
import useRoomAction from "../../../hooks/useRoomAction";

const { useParams, useNavigate } = ReactRouterDom;

interface RoomFormData {
  roomNumber: string;
  roomTypeId: string;
  status: "AVAILABLE" | "OCCUPIED" | "BOOKED" | "MAINTENANCE";
  thumbnail?: string;
  description: string;
}

const EditRoomForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { roomTypes } = useRoomTypes();
  const { getRoomById, handleUpdateRoom } = useRoomAction();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RoomFormData>({
    roomNumber: "",
    roomTypeId: "",
    status: "AVAILABLE",
    thumbnail: "",
    description: "",
  });

  // 🔥 LOAD DATA CŨ
  useEffect(() => {
    if (!id || roomTypes.length === 0) return;

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const room = await getRoomById(id);
        console.log("room:", room);
        setFormData({
          roomNumber: room.roomNumber ?? "",
          roomTypeId:
            typeof room.roomType === "string"
              ? room.roomType
              : (room.roomType?._id ?? ""),
          status: room.status ?? "AVAILABLE",
          thumbnail: room.thumbnail ?? "",
          description: room.description ?? "",
        });
      } catch {
        toast.error("Không tải được dữ liệu phòng");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id, roomTypes.length]);

  // 🔁 UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await handleUpdateRoom(id, {
        roomNumber: formData.roomNumber,
        roomType: formData.roomTypeId,
        status: formData.status,
        thumbnail: formData.thumbnail,
        description: formData.description,
      });

      toast.success("Cập nhật phòng thành công");
      navigate("/dashboard/rooms");
    } catch {
      toast.error("Cập nhật phòng thất bại");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-slate-400 animate-pulse uppercase tracking-widest text-xs">
          Đang tải dữ liệu phòng...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/dashboard/rooms")}
          className="group p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 hover:border-blue-100 rounded-xl transition-all shadow-sm"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
        </button>

        <div>
          <h1 className="text-3xl font-black text-slate-900">
            Chỉnh sửa Phòng
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
            Cập nhật thông tin phòng
          </p>
        </div>
      </div>

      {/* 🔥 FORM – UI Y HỆT ADD */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-12 shadow-2xl shadow-slate-200/50 space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Số phòng */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-600 transition-colors">
              Số phòng <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 placeholder:text-slate-300"
              placeholder="VD: 405"
              value={formData.roomNumber}
              onChange={(e) =>
                setFormData({ ...formData, roomNumber: e.target.value })
              }
              required
            />
          </div>

          {/* trạng thái */}
          <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-600 transition-colors">
              Trạng thái hiện tại
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as any })
              }
            >
              <option value="AVAILABLE">Sẵn sàng (Trống)</option>
              <option value="BOOKED">Đã đặt</option>
              <option value="OCCUPIED">Đang ở</option>
              <option value="MAINTENANCE">Bảo trì</option>
            </select>
          </div>
          {/*
           <div className="group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-600 transition-colors">
              Vị trí tầng
            </label>
            <select
              className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 appearance-none"
              value={formData.floor}
              onChange={(e) =>
                setFormData({ ...formData, floor: e.target.value })
              }
            >
              <option>Tầng 1</option>
              <option>Tầng 2</option>
              <option>Tầng 3</option>
              <option>Tầng 4</option>
              <option>Tầng thượng</option>
            </select>
          </div> 
          */}
          {/* Loại phòng */}
          <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-600 transition-colors">
              Loại phòng
            </label>
            <select
              className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 appearance-none"
              value={formData.roomTypeId}
              onChange={(e) =>
                setFormData({ ...formData, roomTypeId: e.target.value })
              }
            >
              {/* render dữ liệu của roomTypes */}
              <option value="">-- Chọn loại phòng --</option>
              {roomTypes.map((rt) => (
                <option key={rt._id} value={rt._id}>
                  {rt.typeName} -{rt.pricePerNight.toLocaleString()}/đêm
                </option>
              ))}
            </select>
          </div>

          {/* Mô tả chi tiết: chưa làm */}
          {/* <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-blue-600 transition-colors">
              Mô tả chi tiết
            </label>
            <textarea
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white focus:ring-4 focus:ring-blue-600/5 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm"
              placeholder="Nhập mô tả về tiện nghi, hướng nhìn..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div> */}

          {/* Thumbnail, Ảnh đại diện phòng (URL) */}
          <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-primary transition-colors">
              Ảnh đại diện phòng (URL)
            </label>

            <div className="flex flex-col sm:flex-row gap-6">
              <div
                className={`w-full sm:w-40 h-32 rounded-3xl overflow-hidden border-2 transition-all flex items-center justify-center bg-slate-50 shrink-0 ${formData.thumbnail ? "border-primary/20 shadow-lg" : "border-dashed border-slate-200"}`}
              >
                {formData.thumbnail ? (
                  <img
                    src={formData.thumbnail}
                    className="w-full h-full object-cover animate-in fade-in zoom-in-95"
                    alt="Room preview"
                  />
                ) : (
                  <div className="flex flex-col items-center text-slate-300">
                    <span className="material-symbols-outlined text-4xl">
                      bed
                    </span>
                    <span className="text-[8px] font-black uppercase mt-1">
                      Chưa có ảnh
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  className="w-full px-5 h-14 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-xs shadow-inner"
                  placeholder="https://ik.imagekit.io/..."
                  value={formData.thumbnail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      thumbnail: e.target.value as any,
                    })
                  }
                />
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-relaxed">
                  Ảnh này sẽ hiển thị ở trang sơ đồ phòng. Khuyên dùng tỉ lệ
                  4:3.
                </p>
              </div>
            </div>
          </div>

          {/* Mô tả */}
          <div className="md:col-span-2 group">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-focus-within:text-primary transition-colors">
              Mô tả bổ sung
            </label>
            <textarea
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 placeholder:text-slate-300 text-sm shadow-inner"
              placeholder="VD: View hướng biển, tầng cao yên tĩnh..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
        </div>
        {/* nút */}
        <div className="pt-10 border-t border-slate-100 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 h-12 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-400 hover:bg-slate-50"
          >
            Hủy bỏ
          </button>

          <button
            type="submit"
            className="px-10 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">save</span>
            Cập nhật phòng
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomForm;
