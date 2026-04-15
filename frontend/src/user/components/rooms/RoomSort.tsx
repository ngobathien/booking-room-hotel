import { useSearchParams } from "react-router-dom";

const RoomSort = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get("sort") || "price_asc";

  const handleSortChange = (value: string) => {
    const params: Record<string, string> = {};

    // giữ lại các query khác (keyword, page, filter...)
    searchParams.forEach((val, key) => {
      params[key] = val;
    });

    // luôn set sort (KHÔNG delete nữa)
    params.sort = value;

    // reset page khi đổi sort
    params.page = "1";

    setSearchParams(params);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
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
