import { useState, useEffect } from "react";
import type { Room } from "../../../../types/room.types";

interface Props {
  room: Room;
}

const RoomGallery = ({ room }: Props) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (room?.thumbnail) {
      setActiveImage(room.thumbnail);
    }
  }, [room]);

  const images = [room.thumbnail, ...(room.images || [])].slice(0, 4);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <img
          src={activeImage || room.thumbnail}
          alt="Room"
          className="w-full h-[420px] object-cover rounded-xl"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            onClick={() => setActiveImage(img)}
            className="h-[200px] w-full object-cover rounded-lg cursor-pointer hover:opacity-80"
          />
        ))}
      </div>
    </div>
  );
};

export default RoomGallery;
