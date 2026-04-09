import { useEffect, useState } from "react";
import { getAllRooms } from "../../../common/services/roomService";
import RoomCard from "./view/RoomCard";
import type { Room } from "../../../types/room.types";
import { Link } from "react-router";

interface HomeRoomsSectionProps {
  limit: number;
}

const HomeRoomsSection: React.FC<HomeRoomsSectionProps> = ({ limit }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();

        const limitedRooms = limit ? data.slice(0, limit) : data;

        setRooms(limitedRooms);
        // setRooms(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Đang tải danh sách phòng...</div>;
  }

  if (rooms.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        Không có danh sách phòng
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto py-20 px-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-2">
            Phòng nổi bật
          </h2>
          <p className="text-gray-500 font-medium">
            Những lựa chọn được yêu thích nhất dành cho bạn
          </p>
        </div>

        <Link to="/rooms" className="text-primary font-bold hover:underline">
          Xem tất cả phòng →
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </section>
  );
};

export default HomeRoomsSection;
