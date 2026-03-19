import {
  Building2,
  Edit,
  Image as ImageIcon,
  Info,
  Mail,
  MapPin,
  Phone,
  RefreshCcw,
  Save,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHotel } from "../../../hooks/hotel/useHotel";
import type { Hotel } from "../../../types/hotel.types";

const HotelSettings = () => {
  const { hotel, loading, updateHotel, createHotel } = useHotel();
  const [info, setInfo] = useState<Hotel | null>(null);

  // sync info when hotel loaded
  useEffect(() => {
    if (hotel) {
      setInfo({ ...hotel, images: hotel.images || [] });
    }
  }, [hotel]);

  const handleSave = async () => {
    if (!info) return;
    try {
      if (info._id) {
        await updateHotel(info._id, info);
      } else {
        await createHotel(info);
      }
      toast.success("Đã lưu thông tin khách sạn");
    } catch (error) {
      toast.error("Lỗi khi lưu thông tin");
    }
  };

  const handleReset = () => {
    if (!hotel) return;
    if (window.confirm("Bạn có chắc chắn muốn hoàn tác tất cả thay đổi?")) {
      setInfo({ ...hotel });
      toast.info("Đã khôi phục dữ liệu gốc");
    }
  };

  const handleDeleteImage = (index: number) => {
    if (!info) return;
    if (window.confirm("Bạn có chắc chắn muốn xóa hình ảnh này không?")) {
      const newImages = info.images.filter((_, i) => i !== index);
      setInfo({ ...info, images: newImages });
      toast.success("Đã xóa hình ảnh");
    }
  };

  const handleAddImage = () => {
    if (!info) return;
    const url = prompt("Nhập URL hình ảnh");
    if (!url) return;
    setInfo({ ...info, images: [...info.images, url] });
  };

  if (loading || !info) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Quản lý Thông tin Khách sạn
          </h1>
          <p className="text-slate-500">
            Cập nhật thông tin liên hệ, địa chỉ và các chính sách của khách sạn.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
          >
            <RefreshCcw className="w-4 h-4" />
            Hoàn tác
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all"
          >
            <Save className="w-4 h-4" />
            Lưu thay đổi
          </button>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Info */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Info className="w-5 h-5 text-emerald-600" />
              Thông tin cơ bản
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Tên khách sạn
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={info.phone}
                    onChange={(e) =>
                      setInfo({ ...info, phone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email liên hệ
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={info.email}
                    onChange={(e) =>
                      setInfo({ ...info, email: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Địa chỉ
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={info.address}
                    onChange={(e) =>
                      setInfo({ ...info, address: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Mô tả khách sạn
              </label>
              <textarea
                rows={4}
                value={info.description}
                onChange={(e) =>
                  setInfo({ ...info, description: e.target.value })
                }
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Policies */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Chính sách & Quy định
            </h3>
            <div className="space-y-2">
              <textarea
                rows={6}
                value={info.policy || ""}
                onChange={(e) => setInfo({ ...info, policy: e.target.value })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                placeholder="Nhập các chính sách về nhận/trả phòng, hủy phòng, quy định chung..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-8">
          {/* Images */}
          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-emerald-600" />
              Hình ảnh khách sạn
            </h3>

            <div className="space-y-4">
              {info.images.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden group"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="p-2 bg-white/20 backdrop-blur rounded-lg text-white hover:bg-white/40 transition-all">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(i)}
                      className="p-2 bg-rose-500/20 backdrop-blur rounded-lg text-white hover:bg-rose-500/40 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={handleAddImage}
                className="w-full aspect-video border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">Thêm hình ảnh</span>
              </button>
            </div>
          </div>

          {/* Status */}
          <div className="bg-emerald-600 p-8 rounded-2xl shadow-lg shadow-emerald-100 text-white space-y-6">
            <h3 className="text-lg font-bold">Trạng thái hiển thị</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-emerald-100">Website công khai</span>
                <span className="px-2 py-1 bg-emerald-500 rounded text-xs font-bold">
                  Đang bật
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-100">Đặt phòng trực tuyến</span>
                <span className="px-2 py-1 bg-emerald-500 rounded text-xs font-bold">
                  Đang bật
                </span>
              </div>
              <div className="pt-4 border-t border-emerald-500">
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Thông tin này sẽ được hiển thị trên trang chủ và các kênh đặt
                  phòng trực tuyến.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSettings;
