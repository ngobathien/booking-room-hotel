import { Filter, Grid, List, Search } from "lucide-react";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useRoomContext } from "../../../hooks/room/useRoom";
import { cn } from "../../../lib/utils";
import RoomSort from "../rooms/RoomSort";
import { RoomGridView } from "../rooms/view/RoomGridView";
import { RoomListView } from "../rooms/view/RoomListView";
import { formatDateDDMMYY } from "../../../utils/formatDateVN";

const RoomLayout = () => {
  const { rooms, loading } = useRoomContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const checkIn = searchParams.get("checkInDate");
  const checkOut = searchParams.get("checkOutDate");
  const capacityParam = searchParams.get("capacity") || "2";
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("list");

  // Filter UI state (chỉ UI, logic filter xử lý ở context/backend)
  const [_priceRange, setPriceRange] = React.useState(
    Number(searchParams.get("maxPrice")) || 3000000,
  );
  const [capacity, setCapacity] = React.useState(
    Number(searchParams.get("capacity")) || 0,
  );

  // Hàm reset filter về mặc định
  const handleResetFilters = () => {
    setPriceRange(3000000);
    setCapacity(0);

    setSearchParams({});
  };

  const handleApplyFilters = () => {
    const params: any = {};

    // if (priceRange) {
    //   params.maxPrice = priceRange;
    // }
    if (capacity) {
      params.capacity = capacity;
    }

    setSearchParams(params);
  };

  return (
    <>
      {/* <Outlet /> */}

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header Info */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Search className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Thông tin lưu trú</h2>
                <p className="text-sm text-slate-500">
                  {checkIn && checkOut ? (
                    <>
                      {formatDateDDMMYY(checkIn)} - {formatDateDDMMYY(checkOut)}
                    </>
                  ) : (
                    "Chưa chọn ngày"
                  )}{" "}
                  | {capacityParam} Khách | 1 Phòng
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

        {/* Filters Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" /> Bộ lọc
                </h3>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Xóa tất cả
                </button>
              </div>

              {/* Price */}

              {/* Capacity */}
              <div className="mb-6">
                <label className="text-sm font-bold text-slate-700">
                  Số lượng khách
                </label>
                <select
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm"
                >
                  <option value="0">Tất cả</option>
                  <option value="1">1 Khách</option>
                  <option value="2">2 Khách</option>
                  <option value="3">3 Khách</option>
                  <option value="4">4 Khách</option>
                </select>
              </div>

              <button
                onClick={handleApplyFilters}
                className="mt-8 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
              >
                Áp dụng bộ lọc
              </button>
            </div>
          </aside>

          {/* Main Room Content */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm font-medium text-slate-500">
                <span className="font-bold text-slate-900">
                  {rooms?.length || 0}
                </span>{" "}
                phòng phù hợp
              </div>

              <div className="flex items-center gap-4">
                {/* Sắp xếp */}
                <RoomSort />

                {/* setViewMode: grid hoặc list */}
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

            {/* Room List */}
            {loading ? (
              <div className="text-center py-10">Đang tải...</div>
            ) : viewMode === "grid" ? (
              <RoomGridView rooms={rooms} />
            ) : (
              <RoomListView rooms={rooms} />
            )}

            {/* Pagination UI */}
            {/* <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  className="h-10 w-10 rounded-lg border border-slate-200"
                >
                  {page}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomLayout;
