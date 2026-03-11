import { ArrowLeft } from "lucide-react";
import React from "react";

interface Props {
  onNext: () => void;
  onBack: () => void;
  room: any;
  checkInDate: string;
  checkOutDate: string;
}
const ConfirmationStep = ({
  onNext,
  onBack,
  room,
  checkInDate,
  checkOutDate,
}: Props) => (
  <div className="space-y-8">
    <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold mb-8">Xác nhận thông tin</h3>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Thông tin lưu trú
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Ngày nhận phòng</span>
                <span className="font-bold">{checkInDate} (14:00)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Ngày trả phòng</span>
                <span className="font-bold">{checkOutDate} (12:00)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Số lượng phòng</span>
                <span className="font-bold">01 Phòng</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Thông tin liên hệ
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Họ tên</span>
                <span className="font-bold">Nguyễn Văn A</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Email</span>
                <span className="font-bold">nguyenvana@gmail.com</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Số điện thoại</span>
                <span className="font-bold">090 123 4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-primary/5 p-6 border border-primary/10">
          <h4 className="text-sm font-bold text-primary mb-4">Phòng đã chọn</h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={room.images}
                className="h-16 w-16 rounded-lg object-cover"
                alt=""
              />
              <div>
                <div className="font-bold">{room.roomNumber}</div>
                <div className="text-xs text-slate-500">
                  {room.bedType} • {room.view}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center font-bold">
                -
              </button>
              <span className="font-bold">01</span>
              <button className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center font-bold">
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-4">
      <button
        onClick={onBack}
        className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-8 py-4 font-bold text-slate-600 hover:bg-slate-50"
      >
        <ArrowLeft className="h-5 w-5" /> Quay lại
      </button>
      <button
        onClick={onNext}
        className="flex-1 rounded-2xl bg-primary px-12 py-4 font-black text-white shadow-xl shadow-primary/30 transition-all hover:bg-blue-700"
      >
        Tiếp tục thanh toán
      </button>
    </div>
  </div>
);

export default ConfirmationStep;
