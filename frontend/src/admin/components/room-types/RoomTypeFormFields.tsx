import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

type Mode = "create" | "edit";

type RoomTypeFormData = {
  typeName: string;
  capacity: number | "";
  pricePerNight: number | "";
};

type Props = {
  mode: Mode;
  initialData?: RoomTypeFormData;
  onSubmit: (data: RoomTypeFormData) => Promise<void>;
};

const RoomTypeFormFields = ({ mode, initialData, onSubmit }: Props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RoomTypeFormData>({
    typeName: "",
    capacity: "",
    pricePerNight: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = <K extends keyof RoomTypeFormData>(
    key: K,
    value: RoomTypeFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.typeName || !formData.capacity || !formData.pricePerNight) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    await onSubmit(formData);
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
          {mode === "create" ? "Thêm loại phòng mới" : "Chỉnh sửa loại phòng"}
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
              onChange={(e) => handleChange("typeName", e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-slate-50
                         focus:bg-white transition-all font-semibold"
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
              className="w-full h-12 px-4 rounded-xl bg-slate-50 font-semibold"
            >
              <option value="">-- Chọn --</option>
              <option value={1}>1 Người</option>
              <option value={2}>2 Người</option>
              <option value={4}>4 Người</option>
              <option value={10}>Phòng tập thể</option>
            </select>
          </div>

          {/* Giá */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase mb-2">
              Giá / Đêm
            </label>
            <input
              type="number"
              value={formData.pricePerNight}
              onChange={(e) =>
                handleChange(
                  "pricePerNight",
                  e.target.value ? Number(e.target.value) : "",
                )
              }
              className="w-full h-12 px-4 rounded-xl bg-slate-50 font-semibold"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-primary font-bold"
          >
            {mode === "create" ? "Thêm mới" : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomTypeFormFields;
