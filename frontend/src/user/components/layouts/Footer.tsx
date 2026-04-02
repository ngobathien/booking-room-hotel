import React from "react";
import { useHotel } from "../../../hooks/hotel/useHotel";

const Footer: React.FC = () => {
  const { hotel, loading } = useHotel();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* THÔNG TIN KHÁCH SẠN */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">
              {loading ? "Đang tải..." : hotel?.name || "Khách sạn"}
            </h2>

            {hotel?.description && (
              <p className="text-gray-500 text-sm leading-relaxed">
                {hotel.description}
              </p>
            )}

            <div className="text-sm text-gray-500 space-y-1">
              {hotel?.address && <p>📍 {hotel.address}</p>}
              {hotel?.phone && <p>📞 {hotel.phone}</p>}
              {hotel?.email && <p>📧 {hotel.email}</p>}
            </div>
          </div>

          {/* LIÊN KẾT NHANH */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Trang chủ</li>
              <li>Danh sách phòng</li>
              <li>Đặt phòng của tôi</li>
            </ul>
          </div>

          {/* HỖ TRỢ */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Liên hệ</li>
              <li>Chính sách</li>
              <li>Điều khoản</li>
            </ul>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="border-t pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} {hotel?.name || "Khách sạn"} - Tất cả
          quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
