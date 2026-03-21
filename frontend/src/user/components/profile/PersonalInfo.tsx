import { Camera, Lock, User } from "lucide-react";
import { useState } from "react";
import { uploadAvatar } from "../../../common/services/userService";

interface PersonalInfoProps {
  user: {
    _id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    birthDate?: string;
    address?: string;
    avatar?: string;
  };
  onUpdate?: (id: string, data: any) => void;
}

interface FormItem {
  label: string;
  key?: string;
  value: any;
  type?: string;
  colSpan?: number;
  readOnly?: boolean;
}

const PersonalInfo = ({ user, onUpdate }: PersonalInfoProps) => {
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    fullName: user.fullName || "",
    email: user.email || "",
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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    setAvatarPreview(URL.createObjectURL(file)); // preview tạm thời
    setUploading(true);

    try {
      const avatarUrl = await uploadAvatar(user._id, file);
      setAvatarPreview(avatarUrl); // cập nhật avatar chính thức
      if (onUpdate) onUpdate(user._id, { avatar: avatarUrl }); // update local state
    } catch (err) {
      console.error("Upload avatar thất bại:", err);
      alert("Upload avatar thất bại");
    } finally {
      setUploading(false);
    }
  };

  const formItems: FormItem[] = [
    { label: "Họ và tên", key: "fullName", value: form.fullName },
    { label: "Email", key: "email", value: form.email },
    { label: "Số điện thoại", key: "phoneNumber", value: form.phoneNumber },
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
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" /> Thông tin cá nhân
        </h2>
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col gap-8">
        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 border-4 border-white shadow-md transition-transform group-hover:scale-105"
              style={{
                backgroundImage: `url(${avatarPreview || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"})`,
              }}
            />
            <label
              htmlFor="avatarInput"
              className="absolute bottom-1 right-1 bg-primary text-white p-2 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-all cursor-pointer"
            >
              <Camera className="h-5 w-5" />
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={uploading}
            />
          </div>

          <div className="text-center sm:text-left">
            <p className="text-xl font-bold">{user.fullName}</p>

            <button className="mt-2 text-primary text-sm font-semibold hover:underline">
              Thay đổi ảnh đại diện
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formItems.map((item, i) => (
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
                  value={item.value}
                  readOnly={item.readOnly ?? false}
                  onChange={(e) =>
                    item.key && handleChange(item.key, e.target.value)
                  }
                  className={`
                    w-full h-12 px-4 text-sm rounded-xl border transition-all
                    ${
                      item.readOnly
                        ? "bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
                        : "bg-white border-slate-300 hover:border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                    }
                  `}
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
