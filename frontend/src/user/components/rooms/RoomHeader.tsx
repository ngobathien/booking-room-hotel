import { Search } from "lucide-react";
import { Link } from "react-router";
import { useRoomContext } from "../../../hooks/room/useRoom";

const RoomHeader = () => {
  const { filterParams } = useRoomContext();

  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Thông tin lưu trú</h2>
            <p className="text-sm text-slate-500">
              {filterParams.checkInDate || "15/10/2023"} -{" "}
              {filterParams.checkOutDate || "17/10/2023"} |{" "}
              {filterParams.guests || 2} Khách
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="rounded-xl bg-primary/10 px-6 py-2 text-sm font-bold text-primary hover:bg-primary/20 transition-all"
        >
          Thay đổi
        </Link>
      </div>
    </div>
  );
};

export default RoomHeader;
