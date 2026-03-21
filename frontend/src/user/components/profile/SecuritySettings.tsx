import { Shield } from "lucide-react";
import { useState } from "react";
import { useChangePassword } from "../../../hooks/user/useChangePassword";

const SecuritySettings = () => {
  const { handleChangePassword, loading } = useChangePassword();
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      return alert("Vui lòng điền đầy đủ các trường!");
    }
    if (form.newPassword !== form.confirmPassword) {
      return alert("Mật khẩu mới và xác nhận không trùng khớp!");
    }
    handleChangePassword(form.oldPassword, form.newPassword);
    setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" /> Bảo mật & Đổi mật khẩu
        </h2>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Mật khẩu hiện tại",
            key: "oldPassword",
            placeholder: "••••••••",
          },
          {
            label: "Mật khẩu mới",
            key: "newPassword",
            placeholder: "Tối thiểu 8 ký tự",
          },
          {
            label: "Xác nhận mật khẩu mới",
            key: "confirmPassword",
            placeholder: "Nhập lại mật khẩu mới",
          },
        ].map((item) => (
          <div key={item.key} className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700">
              {item.label}
            </label>
            <input
              type="password"
              placeholder={item.placeholder}
              value={form[item.key as keyof typeof form]}
              onChange={(e) => handleChange(item.key, e.target.value)}
              className="w-full rounded-xl border-slate-200 focus:border-primary focus:ring-primary h-12 px-4 text-sm transition-all"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Đang xử lý..." : "Cập nhật mật khẩu"}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettings;
