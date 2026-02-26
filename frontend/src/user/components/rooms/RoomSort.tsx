import React from "react";
import { useSearchParams } from "react-router";

const RoomSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort");

  const handleSortChange = (value: string) => {
    const params = Object.fromEntries([...searchParams]);

    if (value === "price_asc") {
      delete params.sort;
    } else {
      params.sort = value;
    }

    // reset page khi đổi sort
    params.page = "1";

    setSearchParams(params);
  };
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="text-slate-400">Sắp xếp:</span>

      <select
        value={sort}
        onChange={(e) => handleSortChange(e.target.value)}
        className="border-none bg-transparent font-bold text-primary focus:ring-0 p-0 text-sm"
      >
        <option value="price_asc">Giá thấp đến cao</option>
        <option value="price_desc">Giá cao đến thấp</option>
      </select>
    </div>
  );
};

export default RoomSort;
