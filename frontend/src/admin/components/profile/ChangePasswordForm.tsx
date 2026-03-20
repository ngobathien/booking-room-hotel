import React, { useState } from "react";
import { Lock } from "lucide-react";
import { useChangePassword } from "../../../hooks/user/useChangePassword";

const ChangePasswordForm = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const { handleChangePassword, loading } = useChangePassword();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Mật khẩu mới không khớp");
      return;
    }
    await handleChangePassword(passwords.current, passwords.new);
    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Lock className="w-5 h-5 text-emerald-600" />
        Đổi mật khẩu
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            required
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              required
              value={passwords.new}
              onChange={(e) =>
                setPasswords({ ...passwords, new: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              required
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords({ ...passwords, confirm: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
          >
            <Lock className="w-4 h-4" />
            {loading ? "Đang đổi..." : "Cập nhật mật khẩu"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
