import React from "react";
import { useNavigate } from "react-router-dom";
import type { RoomType } from "../../../types/roomType.types";

interface Props {
  roomTypes: RoomType[];
}

const RoomTypeGrid: React.FC<Props> = ({ roomTypes }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {roomTypes.map((type) => (
        <div
          key={type._id}
          onClick={() => navigate(`edit/${type._id}`)}
          className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all relative group flex flex-col justify-between min-h-[220px]"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-primary/10 text-primary rounded-2xl">
                <span className="material-symbols-outlined text-2xl">
                  king_bed
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 mb-1 group-hover:text-primary transition-colors">
                {type.typeName}
              </h3>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="material-symbols-outlined text-sm">group</span>
                <span className="text-xs font-bold uppercase tracking-widest">
                  {type.capacity}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-50">
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-none mb-1">
                Giá từ
              </p>
              <p className="text-xl font-black text-primary leading-none">
                {type.pricePerNight} ₫
              </p>
            </div>
            <button
              onClick={() => navigate(`edit/${type._id}`)}
              className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary hover:text-white transition-all flex items-center justify-center active:scale-90"
            >
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomTypeGrid;
