import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { STATUS_ROOM_STYLE, type Room } from "../../../types/room.types";

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  // hiển thị đúng thông tin trên thanh địa chỉ
  const handleClickNextRoomDetail = () => {
    navigate(`/rooms/${room._id}/room-${room.roomNumber}`);
  };

  return (
    <div
      onClick={handleClickNextRoomDetail}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url("${room.thumbnail}")` }}
        />
        {/* {room.featured && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-primary shadow-sm">
            FEATURED
          </div>
        )} */}
      </div>

      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
            {room.roomNumber}
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              STATUS_ROOM_STYLE[room.status]
            }`}
          >
            {room.status}
          </span>
        </div>

        {/* Body */}
        <div className="space-y-1 text-gray-600">
          <p>
            <span className="font-medium">Loại phòng:</span>{" "}
            {room.roomType.typeName}
          </p>
          <p>
            <span className="font-medium">Sức chứa:</span>{" "}
            {room.roomType.capacity} người
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-bold text-blue-600">
            {room.roomType.pricePerNight.toLocaleString()} ₫ / đêm
          </p>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Đặt phòng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
