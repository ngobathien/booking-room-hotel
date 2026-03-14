import type { Room } from "../../../../types/room.types";

interface Props {
  room: Room;
}

const RoomInfo = ({ room }: Props) => {
  return (
    <div className="md:col-span-2 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Phòng {room.roomNumber}</h1>

        <span
          className={`px-4 py-1 rounded-full text-sm font-medium ${
            room.status === "AVAILABLE"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {room.status}
        </span>
      </div>

      <p className="text-gray-500">
        {room.roomType.typeName} • {room.roomType.capacity} khách
      </p>

      <div className="border-t pt-4 space-y-2">
        <h2 className="text-lg font-semibold">Thông tin phòng</h2>

        <ul className="grid grid-cols-2 gap-3 text-sm text-gray-600">
          <li>🛏 Loại phòng: {room.roomType.typeName}</li>
          <li>👥 Sức chứa: {room.roomType.capacity} người</li>
          <li>🏨 Mã phòng: {room.roomNumber}</li>
        </ul>
      </div>
    </div>
  );
};

export default RoomInfo;
