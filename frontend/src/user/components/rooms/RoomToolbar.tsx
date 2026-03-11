import { Grid, List } from "lucide-react";
import { cn } from "../../../lib/utils";
import RoomSort from "../rooms/RoomSort";

interface Props {
  roomsLength: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

const RoomToolbar = ({ roomsLength, viewMode, setViewMode }: Props) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="text-sm font-medium text-slate-500">
        <span className="font-bold text-slate-900">{roomsLength}</span> phòng
        phù hợp
      </div>

      <div className="flex items-center gap-4">
        <RoomSort />

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-1",
              viewMode === "grid" ? "text-primary" : "text-slate-300",
            )}
          >
            <Grid className="h-5 w-5" />
          </button>

          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-1",
              viewMode === "list" ? "text-primary" : "text-slate-300",
            )}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomToolbar;
