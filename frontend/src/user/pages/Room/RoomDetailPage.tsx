import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRoomAction from "../../../hooks/room/useRoomAction";
import { useRoomContext } from "../../../hooks/room/useRoom";

import RoomBookingCard from "../../components/rooms/detail/RoomBookingCard";
import { RoomReviews } from "../../components/reviews/RoomReviews";
import { STATUS_ROOM_LABEL } from "../../../types/room.types";

/**
 * 🔥 Hàm bổ trợ để trích xuất 'name' từ chuỗi Object MongoDB thô
 * Dùng để xử lý dữ liệu dạng: "{ name: 'Máy lạnh', ... }"
 */
const parseAmenityName = (amenityStr: any): string => {
  if (typeof amenityStr !== "string") return amenityStr?.name || "";

  // Sử dụng Regex để tìm giá trị nằm sau "name: '"
  const match = amenityStr.match(/name:\s*'([^']+)'/);
  if (match && match[1]) return match[1];

  // Nếu không dùng nháy đơn, thử tìm nháy kép
  const matchDouble = amenityStr.match(/name:\s*"([^"]+)"/);
  return matchDouble ? matchDouble[1] : "Tiện ích";
};

const RoomDetailPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { getRoomWithAmenitiesById } = useRoomAction();
  const { currentRoom, loading } = useRoomContext();

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (roomId) {
      getRoomWithAmenitiesById(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    if (currentRoom?.thumbnail) {
      setActiveImage(currentRoom.thumbnail);
    }
  }, [currentRoom]);

  const renderIcon = (icon?: string) => {
    if (!icon) {
      return <span className="text-gray-400">🔧</span>;
    }

    // URL ảnh
    if (icon.startsWith("http")) {
      return <img src={icon} className="w-5 h-5 object-contain" />;
    }

    // FontAwesome
    if (icon.startsWith("fa")) {
      return <i className={`${icon} text-lg`}></i>;
    }

    return <span className="text-gray-400">🔧</span>;
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">
          Đang tải chi tiết phòng...
        </p>
      </div>
    );
  }

  if (!currentRoom) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 font-bold">
          Không tìm thấy thông tin phòng.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 animate-in fade-in duration-700">
      {/* 📸 Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={activeImage || currentRoom.thumbnail}
            className="w-full h-[450px] object-cover rounded-[2rem] shadow-2xl shadow-slate-200"
            alt="Main Room"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[currentRoom.thumbnail, ...(currentRoom.images || [])]
            .slice(0, 4)
            .map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`h-[218px] w-full object-cover rounded-[1.5rem] cursor-pointer transition-all duration-300 hover:scale-[1.03] ${
                  activeImage === img
                    ? "ring-4 ring-blue-600 ring-offset-2"
                    : "opacity-80 hover:opacity-100"
                }`}
                alt={`Room thumb ${idx}`}
              />
            ))}
        </div>
      </div>

      {/* 📄 Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-10">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                {STATUS_ROOM_LABEL[currentRoom.status]}
              </span>
            </div>
            <h1 className="text-4xl font-black text-slate-900">
              Phòng {currentRoom.roomNumber}
            </h1>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">bed</span>
              {currentRoom.roomType?.typeName} •
              <span className="material-symbols-outlined text-sm ml-2">
                group
              </span>
              Tối đa {currentRoom.roomType?.capacity} khách
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Mô tả chi tiết
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {currentRoom.description ||
                "Phòng nghỉ dưỡng với không gian yên tĩnh và đầy đủ tiện nghi, mang lại cho bạn cảm giác thoải mái nhất."}
            </p>
          </div>

          <hr className="border-slate-100" />

          {/* ❄️ Amenities Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tight">
              <span className="material-symbols-outlined text-blue-600">
                grid_view
              </span>
              Tiện ích phòng
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {currentRoom.amenities && currentRoom.amenities.length > 0 ? (
                currentRoom.amenities.map((item: any, idx: number) => {
                  const amenityName = parseAmenityName(item);

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 group p-2 rounded-2xl hover:bg-slate-50"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200 transition-all">
                        {/* {renderIcon(item.icon)}  */}
                      </div>

                      <span className="font-bold text-slate-700 text-sm italic group-hover:text-blue-600">
                        {amenityName}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-slate-400 italic text-sm">
                  Chưa cập nhật tiện ích cho phòng này.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 💳 Booking Card sticky */}
        <div className="relative">
          <div className="sticky top-10">
            <RoomBookingCard room={currentRoom} />
          </div>
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* ⭐ Reviews Section */}
      <div className="pt-4">
        <RoomReviews roomId={currentRoom._id} />
      </div>
    </div>
  );
};

export default RoomDetailPage;
