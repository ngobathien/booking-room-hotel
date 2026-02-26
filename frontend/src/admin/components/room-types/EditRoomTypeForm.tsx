import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getDetailRoomTypeById,
  updateRoomTypeById,
} from "../../../common/services/roomTypeService";

type RoomTypeFormData = {
  typeName: string;
  capacity: number | "";
  pricePerNight: number | "";
};

const EditRoomTypeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<RoomTypeFormData>({
    typeName: "",
    capacity: "",
    pricePerNight: "",
  });

  /* =======================
     Load dữ liệu cũ
  ======================= */
  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      try {
        const data = await getDetailRoomTypeById(id);
        setFormData({
          typeName: data.typeName,
          capacity: data.capacity,
          pricePerNight: data.pricePerNight,
        });
      } catch (error) {
        toast.error("Không lấy được dữ liệu loại phòng");
      }
    };

    fetchDetail();
  }, [id]);

  /* =======================
     Submit cập nhật
  ======================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateRoomTypeById(id!, {
        typeName: formData.typeName,
        capacity: Number(formData.capacity),
        pricePerNight: Number(formData.pricePerNight),
      });

      toast.success("Cập nhật loại phòng thành công");
      navigate("/dashboard/room-types");
    } catch (error) {
      toast.error("Cập nhật thất bại");
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
          Chỉnh sửa loại phòng
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
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
              onChange={(e) =>
                setFormData({ ...formData, typeName: e.target.value })
              }
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
                setFormData({
                  ...formData,
                  capacity: e.target.value ? Number(e.target.value) : "",
                })
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
                setFormData({
                  ...formData,
                  pricePerNight: e.target.value ? Number(e.target.value) : "",
                })
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
            className="px-8 py-2.5 rounded-xl bg-primary hover:bg-green-500
                       font-bold shadow-lg shadow-primary/30"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomTypeForm;
