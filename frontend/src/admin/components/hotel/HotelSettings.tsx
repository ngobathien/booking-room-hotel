import {
  Building2,
  Info,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmModal from "../../../common/components/ConfirmModal";
import { useHotel } from "../../../hooks/hotel/useHotel";
import type { Hotel } from "../../../types/hotel.types";

// Default hotel object khi thêm mới
const DEFAULT_HOTEL: Partial<Hotel> = {
  name: "",
  phone: "",
  email: "",
  address: "",
  description: "",
  policy: "",
  images: [],
};

type ConfirmAction = "reset" | "delete-image" | null;

const HotelSettings = () => {
  const { hotel, loading, updateHotel, createHotel } = useHotel();
  const [info, setInfo] = useState<Partial<Hotel> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  // sync info when hotel loaded or initialize new hotel
  useEffect(() => {
    if (loading) return;

    if (hotel) {
      setInfo({ ...hotel, images: hotel.images || [] });
    } else {
      // Nếu chưa có hotel, khởi tạo form để thêm mới
      setInfo({ ...DEFAULT_HOTEL });
    }
    setHasChanges(false);
  }, [hotel, loading]);

  const handleSave = async () => {
    if (!info) return;

    // Validation cơ bản
    if (!info.name?.trim()) {
      toast.error("Tên khách sạn không được để trống");
      return;
    }
    if (!info.email?.trim()) {
      toast.error("Email không được để trống");
      return;
    }
    if (!info.phone?.trim()) {
      toast.error("Số điện thoại không được để trống");
      return;
    }

    try {
      if (info._id) {
        await updateHotel(info._id, info);
        toast.success("✓ Cập nhật thông tin khách sạn thành công");
      } else {
        await createHotel({
          name: info.name!,
          phone: info.phone!,
          email: info.email!,
          address: info.address || "",
          description: info.description || "",
          policy: info.policy || "",
          images: info.images || [],
        });
        toast.success("✓ Tạo khách sạn thành công");
      }
      setHasChanges(false);
    } catch (error) {
      console.error("Error saving hotel:", error);
      toast.error("Lỗi khi lưu thông tin khách sạn");
    }
  };

  const handleReset = () => {
    if (!hotel && !info?.name) {
      setInfo({ ...DEFAULT_HOTEL });
      toast.info("Đã xóa tất cả dữ liệu");
      return;
    }

    if (!hotel) return;
    setConfirmAction("reset");
  };

  const confirmReset = () => {
    if (!hotel) return;
    setInfo({ ...hotel, images: hotel.images || [] });
    setHasChanges(false);
    toast.info("Đã khôi phục dữ liệu gốc");
    setConfirmAction(null);
  };

  // const handleDeleteImage = (index: number) => {
  //   if (!info) return;
  //   setSelectedImageIndex(index);
  //   setConfirmAction("delete-image");
  // };

  const confirmDeleteImage = () => {
    if (selectedImageIndex === null || !info) return;
    const newImages =
      info.images?.filter((_, i) => i !== selectedImageIndex) || [];
    setInfo({ ...info, images: newImages });
    setHasChanges(true);
    toast.success("Đã xóa hình ảnh");
    setConfirmAction(null);
    setSelectedImageIndex(null);
  };

  const handleConfirmAction = (action?: ConfirmAction) => {
    if (action === "reset") {
      confirmReset();
    } else if (action === "delete-image") {
      confirmDeleteImage();
    }
  };

  // const handleAddImage = () => {
  //   if (!info) return;
  //   const url = prompt("Nhập URL hình ảnh:");
  //   if (!url?.trim()) return;
  //   setInfo({ ...info, images: [...(info.images || []), url] });
  //   setHasChanges(true);
  // };

  const handleFieldChange = <K extends keyof Hotel>(
    field: K,
    value: Hotel[K],
  ) => {
    setInfo((prev) => {
      if (!prev) return prev;
      return { ...prev, [field]: value };
    });
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 h-96">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200 border-t-emerald-600 animate-spin mx-auto mb-4"></div>
          <p className="text-slate-500">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="p-8 text-center text-slate-500">
        Không thể tải thông tin
      </div>
    );
  }

  const isNewHotel = !hotel;
  const pageTitle = isNewHotel
    ? "Thêm Khách sạn Mới"
    : "Quản lý Thông tin Khách sạn";
  const pageDescription = isNewHotel
    ? "Nhập thông tin chi tiết về khách sạn của bạn"
    : "Cập nhật thông tin liên hệ, địa chỉ và các chính sách của khách sạn.";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{pageTitle}</h1>
          <p className="text-slate-500">{pageDescription}</p>
          {isNewHotel && (
            <p className="text-sm text-emerald-600 font-medium mt-2">
              ℹ️ Bạn đang tạo khách sạn mới. Hãy điền đầy đủ thông tin bên dưới.
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Hoàn tác
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!hasChanges && !isNewHotel}
            className={`flex items-center gap-2 px-6 py-2 font-bold rounded-xl shadow-lg transition-all ${
              hasChanges || isNewHotel
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-100"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            <Save className="w-4 h-4" />
            {isNewHotel ? "Tạo Khách sạn" : "Lưu thay đổi"}
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
                  Tên khách sạn <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={info.name || ""}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    placeholder="Ví dụ: Khách sạn Paradise"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={info.phone || ""}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                    placeholder="Ví dụ: 0912345678"
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Email liên hệ <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    value={info.email || ""}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    placeholder="Ví dụ: hotel@paradise.com"
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
                    value={info.address || ""}
                    onChange={(e) =>
                      handleFieldChange("address", e.target.value)
                    }
                    placeholder="Ví dụ: 123 Đường Nguyễn Huệ, Quận 1, TP.HCM"
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
                value={info.description || ""}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                placeholder="Nhập mô tả chi tiết về khách sạn của bạn..."
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
                onChange={(e) => handleFieldChange("policy", e.target.value)}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                placeholder="Nhập các chính sách về nhận/trả phòng, hủy phòng, quy định chung..."
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {/* <div className="space-y-8">
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
        </div> */}
      </div>

      {/* CONFIRM MODALS */}
      <ConfirmModal
        open={confirmAction === "reset"}
        title="Hoàn tác thay đổi"
        message="Bạn có chắc chắn muốn hoàn tác tất cả thay đổi? Dữ liệu sẽ quay lại trạng thái ban đầu."
        onConfirm={() => handleConfirmAction("reset")}
        onCancel={() => setConfirmAction(null)}
        confirmText="Hoàn tác"
        cancelText="Hủy"
        isDangerous={true}
      />

      <ConfirmModal
        open={confirmAction === "delete-image"}
        title="Xóa hình ảnh"
        message="Bạn có chắc chắn muốn xóa hình ảnh này? Hành động này không thể hoàn tác."
        onConfirm={() => handleConfirmAction("delete-image")}
        onCancel={() => {
          setConfirmAction(null);
          setSelectedImageIndex(null);
        }}
        confirmText="Xóa"
        cancelText="Hủy"
        isDangerous={true}
      />
    </div>
  );
};

export default HotelSettings;
