import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRoomAction from "../../../hooks/room/useRoomAction";
import { useRoomContext } from "../../../hooks/room/useRoom";

import RoomBookingCard from "../../components/rooms/detail/RoomBookingCard";
import { RoomReviews } from "../../components/reviews/RoomReviews";

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
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <img
            src={activeImage || currentRoom.thumbnail}
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

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">Phòng {currentRoom.roomNumber}</h1>

          <p className="text-gray-500">
            {currentRoom.roomType.typeName} • {currentRoom.roomType.capacity}{" "}
            khách
          </p>
        </div>

        <RoomBookingCard room={currentRoom} />
      </div>

      {/* Reviews */}
      <RoomReviews roomId={currentRoom._id} />
    </div>
  );
};

export default RoomDetailPage;
