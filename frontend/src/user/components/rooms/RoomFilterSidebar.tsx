import { Filter } from "lucide-react";

interface Props {
  priceRange: number;
  setPriceRange: (value: number) => void;
  capacity: number;
  setCapacity: (value: number) => void;
  onApply: () => void;
  onReset: () => void;
}

const RoomFilterSidebar = ({
  priceRange,
  setPriceRange,
  capacity,
  setCapacity,
  onApply,
  onReset,
}: Props) => {
  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" /> Bộ lọc
          </h3>
          <button
            onClick={onReset}
            className="text-xs font-bold text-primary hover:underline"
          >
            Xóa tất cả
          </button>
        </div>

        <div className="mb-6">
          <label className="text-sm font-bold text-slate-700">
            Giá tối đa: {priceRange.toLocaleString()} VNĐ
          </label>
          <input
            type="range"
            min="500000"
            max="3000000"
            step="500000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full mt-3 accent-primary"
          />
        </div>

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
          onClick={onApply}
          className="mt-8 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
        >
          Áp dụng bộ lọc
        </button>
      </div>
    </aside>
  );
};

export default RoomFilterSidebar;
