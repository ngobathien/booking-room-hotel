import React, { useState } from "react";
import { createNewRoomType } from "../../../common/services/roomTypeService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type RoomTypeFormData = {
  typeName: string;
  capacity: number | "";
  pricePerNight: number | "";
};

const AddRoomTypeForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RoomTypeFormData>({
    typeName: "",
    capacity: "",
    pricePerNight: "",
  });

  const handleChange = <K extends keyof RoomTypeFormData>(
    key: K,
    value: RoomTypeFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // handleCreateNewRoomType
  const handleCreateNewRoomType = async (e: React.FormEvent) => {
    e.preventDefault();

    const { typeName, capacity, pricePerNight } = formData;

    if (!typeName || !capacity || !pricePerNight) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      await createNewRoomType({
        typeName,
        capacity: Number(capacity),
        pricePerNight: Number(pricePerNight),
      });

      toast.success("Thêm loại phòng thành công");
      navigate("/dashboard/room-types");
    } catch (error) {
      console.error(error);
      toast.error("Thêm loại phòng thất bại");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 bg-white border border-slate-200 text-slate-600
                     hover:text-blue-600 hover:bg-slate-50 rounded-xl shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-3xl font-black text-slate-900">
          Thêm loại phòng mới
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleCreateNewRoomType}
        className="bg-white rounded-3xl border border-slate-200
                   p-8 sm:p-10 shadow-xl space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tên loại phòng */}
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">
              Tên loại phòng
            </label>
            <input
              type="text"
              value={formData.typeName}
              onChange={(e) => handleChange("typeName", e.target.value)}
              placeholder="VD: Deluxe Ocean View"
              className="w-full h-12 px-4 rounded-xl bg-slate-50
                         focus:bg-white focus:border-primary transition-all
                         font-semibold"
              required
            />
          </div>

          {/* Sức chứa */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">
              Sức chứa
            </label>
            <select
              value={formData.capacity}
              onChange={(e) =>
                handleChange(
                  "capacity",
                  e.target.value ? Number(e.target.value) : "",
                )
              }
              className="w-full h-12 px-4 rounded-xl bg-slate-50
                         focus:bg-white focus:border-primary transition-all
                         font-semibold"
              required
            >
              <option value="">-- Chọn sức chứa --</option>
              <option value={1}>1 Người</option>
              <option value={2}>2 Người</option>
              <option value={4}>4 Người</option>
              <option value={10}>Phòng tập thể</option>
            </select>
          </div>

          {/* Giá phòng */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">
              Giá / Đêm (VNĐ)
            </label>
            <input
              type="number"
              min={0}
              step={10000}
              value={formData.pricePerNight}
              onChange={(e) =>
                handleChange(
                  "pricePerNight",
                  e.target.value ? Number(e.target.value) : "",
                )
              }
              placeholder="VD: 1.200.000"
              className="w-full h-12 px-4 rounded-xl bg-slate-50
                         focus:bg-white focus:border-primary transition-all
                         font-semibold"
              required
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-500
                       hover:bg-slate-100 transition"
          >
            Hủy bỏ
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-primary  hover:bg-green-500
                       font-bold shadow-lg shadow-primary/30"
          >
            Lưu thông tin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomTypeForm;
