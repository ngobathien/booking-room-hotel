import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRoomAction from "../../../hooks/useRoomAction";
import { useRoomContext } from "../../../context/RoomContext";
import RoomBookingCard from "../../components/rooms/detail/RoomBookingCard";

const RoomDetailPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { getRoomById } = useRoomAction();
  const { currentRoom, loading } = useRoomContext();

  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (roomId) getRoomById(roomId);
  }, [roomId]);

  useEffect(() => {
    if (currentRoom?.thumbnail) {
      setActiveImage(currentRoom.thumbnail);
    }
  }, [currentRoom]);

  if (loading) return <p>Loading...</p>;
  if (!currentRoom) return <p>Room not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* ===== Gallery ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={activeImage || currentRoom.thumbnail}
            alt="Room"
            className="w-full h-[420px] object-cover rounded-xl"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[currentRoom.thumbnail, ...(currentRoom.images || [])]
            .slice(0, 4)
            .map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setActiveImage(img)}
                className="h-[200px] w-full object-cover rounded-lg cursor-pointer hover:opacity-80"
              />
            ))}
        </div>
      </div>

      {/* ===== Content ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Phòng {currentRoom.roomNumber}
            </h1>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                currentRoom.status === "AVAILABLE"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {currentRoom.status}
            </span>
          </div>

          <p className="text-gray-500">
            {currentRoom.roomType.typeName} • {currentRoom.roomType.capacity}{" "}
            khách
          </p>

          <div className="border-t pt-4 space-y-2">
            <h2 className="text-lg font-semibold">Thông tin phòng</h2>

            <ul className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <li>🛏 Loại phòng: {currentRoom.roomType.typeName}</li>
              <li>👥 Sức chứa: {currentRoom.roomType.capacity} người</li>
              <li>🏨 Mã phòng: {currentRoom.roomNumber}</li>
              <li>
                🕒 Cập nhật:{" "}
                {new Date(currentRoom.updatedAt).toLocaleDateString()}
              </li>
            </ul>
          </div>
        </div>

        {/* Right */}
        <RoomBookingCard room={currentRoom} />
      </div>
    </div>
  );
};

export default RoomDetailPage;
