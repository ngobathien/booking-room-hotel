import { Camera, Lock, User } from "lucide-react";
import { useState } from "react";

const PersonalInfo = ({ user, onUpdate }: any) => {
  const [form, setForm] = useState({
    fullName: user.fullName || "",
    phoneNumber: user.phoneNumber || "",
    birthDate: user.birthDate || "",
    address: user.address || "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (onUpdate) {
      onUpdate(user._id, form);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> Thông tin cá nhân
        </h2>
      </div>
      <div className="p-8 flex flex-col gap-8">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 border-4 border-white shadow-md transition-transform group-hover:scale-105"
              style={{
                backgroundImage: `url(${user.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"})`,
              }}
            />
            <button className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-all">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold">{user.fullName}</p>
            <p className="text-slate-500 text-sm">
              Khách hàng từ tháng 10, 2023
            </p>
            <button className="mt-2 text-primary text-sm font-semibold hover:underline">
              Thay đổi ảnh đại diện
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Họ và tên", key: "fullName", value: form.fullName },
            { label: "Email", value: user.email, readOnly: true },
            {
              label: "Số điện thoại",
              key: "phoneNumber",
              value: form.phoneNumber,
            },
            {
              label: "Ngày sinh",
              key: "birthDate",
              value: form.birthDate,
              type: "date",
            },
            {
              label: "Địa chỉ thường trú",
              key: "address",
              value: form.address,
              colSpan: 2,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1.5 ${item.colSpan ? "md:col-span-2" : ""}`}
            >
              <label className="text-sm font-bold text-slate-700">
                {item.label}
              </label>
              <div className="relative">
                <input
                  type={item.type || "text"}
                  readOnly={item.readOnly}
                  value={item.value}
                  onChange={(e) =>
                    item.key && handleChange(item.key, e.target.value)
                  }
                  className={`w-full rounded-xl border-slate-200 ${
                    item.readOnly
                      ? "bg-slate-50 text-slate-500 cursor-not-allowed"
                      : ""
                  } h-12 px-4 text-sm transition-all`}
                />
                {item.readOnly && (
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Nút Cập nhật */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSubmit}
            className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
