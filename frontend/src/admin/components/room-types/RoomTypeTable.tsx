import React from "react";
import { useNavigate } from "react-router-dom";

import type { RoomType } from "../../../types/room-types.types";

interface Props {
  roomTypes: RoomType[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const RoomTypeTable: React.FC<Props> = ({ roomTypes, loading, onDelete }) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="p-6">Đang tải dữ liệu...</div>;
  }
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <th className="px-6 py-4">Tên loại phòng</th>
            <th className="px-6 py-4">Sức chứa</th>
            <th className="px-6 py-4">Đơn giá</th>
            <th className="px-6 py-4">Tình trạng</th>
            <th className="px-6 py-4 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {roomTypes.map((rt) => (
            <tr
              key={rt._id}
              className="hover:bg-slate-50 transition-colors group"
            >
              {/* typeName */}
              <td className="px-6 py-3 font-bold text-slate-900">
                {rt.typeName}
              </td>

              {/* capacity */}
              <td className="px-6 py-3 text-sm text-slate-500 font-medium">
                {rt.capacity}
              </td>

              {/*  */}
              <td className="px-6 py-3 font-black text-primary">
                {rt.pricePerNight} ₫
              </td>

              {/*  */}
              <td className="px-6 py-3">
                <span className="text-xs font-bold text-slate-400">
                  {/* {rt?.available} trống / {rt.total} tổng */}
                </span>
              </td>
              <td className="px-6 py-3 text-right">
                <button
                  onClick={() => navigate(`edit/${rt._id}`)}
                  className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined">edit_square</span>
                </button>

                {/* nút xóa */}
                <button
                  onClick={() => onDelete(rt._id)}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTypeTable;
