import { User, Phone, Mail } from "lucide-react";

export default function CustomerInfoCard({ booking }: any) {
  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-emerald-600" />
        Thông tin khách hàng
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">
            Họ và tên
          </p>
          <p className="font-semibold text-slate-800">{booking.fullName}</p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">
            Số điện thoại
          </p>

          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <Phone className="w-4 h-4 text-slate-400" />
            {booking.phone_number}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-400 uppercase">Email</p>

          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <Mail className="w-4 h-4 text-slate-400" />
            {booking.email}
          </div>
        </div>
      </div>
    </div>
  );
}
