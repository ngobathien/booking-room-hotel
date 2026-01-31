import React from "react";
import type { RoomType } from "../../../types/room-types.types";
interface Props {
  roomTypes: RoomType[];
  handleDelete: (id: string) => void;
}

// nhận props từ file ManageRoomTypesPage
const RoomTypesListTable = ({ roomTypes, handleDelete }: Props) => {
  return (
    <table className="w-full text-left border-collapse">
      {/* tiêu đề */}
      <thead>
        <tr className="bg-gray-50/50 border-b border-gray-200">
          {/*  Tên loại phòng #*/}
          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">
            Tên loại phòng #
          </th>

          {/*  Số lượng người */}
          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Số lượng người
          </th>

          {/*  Giá / đêm */}
          <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
            Giá / đêm
          </th>
        </tr>
      </thead>

      {/* Dữ liệu danh sách phòng */}
      <tbody className="divide-y divide-[#e7ebf3]">
        {roomTypes?.map((rt) => (
          <tr
            key={rt._id}
            className="hover:bg-gray-50/80 transition-colors group"
          >
            {/* typeName */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-sm font-bold text-gray-900">
                {rt.typeName}
              </span>
            </td>
            {/* capacity */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400 text-lg">
                  {/* {getRoomIcon(rooms.roomType)} */}
                </span>
                <span className="text-sm text-gray-700 font-medium">
                  {rt.capacity}
                </span>
              </div>
            </td>

            {/* pricePerNight */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="text-sm font-semibold text-gray-900">
                ${rt.pricePerNight.toFixed(2)}
              </span>
            </td>

            {/* nút thao tác */}
            <td className="px-6 py-4 whitespace-nowrap text-right">
              <div className="flex items-center justify-end gap-2  transition-opacity">
                {/* nút edit một loại phòng */}
                <button
                  // onClick={() => onEditRoom(room)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                  title="Edit"
                >
                  <span className="material-symbols-outlined text-lg">
                    edit
                  </span>
                </button>

                {/* nút đã xuất bản_with_changes một loại phòng: chưa rõ chức năng này, tìm hiểu sau */}
                {/* <button
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all"
                  title="Toggle Status"
                >
                  <span className="material-symbols-outlined text-lg">
                    published_with_changes
                  </span>
                </button> */}

                {/* nút xóa một loại phòng */}
                <button
                  onClick={() => handleDelete(rt._id)}
                  className="p-2 text-gray-400 hover:text-danger hover:bg-red-50 rounded-lg transition-all"
                  title="Delete"
                >
                  <span className="material-symbols-outlined text-lg">
                    delete
                  </span>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomTypesListTable;
