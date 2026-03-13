import { Mail, MapPin, Phone, User } from "lucide-react";

import { useState } from "react";
import { useAuth } from "../../../../hooks/auth/useAuth";

// step 1

interface Props {
  customerInfo: {
    fullName: string;
    email: string;
    phone_number: string;
  };
  setCustomerInfo: (data: any) => void;
  onNext: () => void;
}
const CustomerInfoStep = ({ customerInfo, setCustomerInfo, onNext }: Props) => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <div className="space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold mb-8">Thông tin khách hàng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/*   Họ và tên * */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Họ và tên *
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input
                  type="text"
                  value={customerInfo.fullName}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="Nguyễn Văn A"
                  className="w-full rounded-xl border-slate-100 bg-slate-50 pl-12 py-3 text-sm focus:ring-primary"
                />
              </div>
            </div>

            {/*  Email * */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="example@gmail.com"
                  className="w-full rounded-xl border-slate-100 bg-slate-50 pl-12 py-3 text-sm focus:ring-primary"
                />
              </div>
            </div>

            {/*  Số điện thoại * */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Số điện thoại *
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <input
                  type="tel"
                  value={customerInfo.phone_number}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      phone_number: e.target.value,
                    }))
                  }
                  placeholder="090 123 4567"
                  className="w-full rounded-xl border-slate-100 bg-slate-50 pl-12 py-3 text-sm focus:ring-primary"
                />
              </div>
            </div>
            {/* <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Quốc tịch
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                <select className="w-full rounded-xl border-slate-100 bg-slate-50 pl-12 py-3 text-sm focus:ring-primary">
                  <option>Việt Nam</option>
                  <option>Mỹ</option>
                  <option>Hàn Quốc</option>
                </select>
              </div>
            </div> */}
          </div>
          <div className="mt-8 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Yêu cầu đặc biệt
            </label>
            <textarea
              rows={4}
              placeholder="Ví dụ: Phòng không hút thuốc, tầng cao..."
              className="w-full rounded-xl border-slate-100 bg-slate-50 p-4 text-sm focus:ring-primary"
            />
          </div>
        </div>
        <button
          onClick={onNext}
          className="w-full md:w-auto rounded-2xl bg-primary px-12 py-4 font-black text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700"
        >
          Tiếp tục xác nhận
        </button>
      </div>
    </>
  );
};

export default CustomerInfoStep;
