interface Props {
  label: string;
  value: string;
  badge?: boolean;
  active?: boolean;
}

const InfoRow = ({ label, value, badge, active }: Props) => {
  return (
    <div className="flex justify-between items-center py-2 border-b last:border-b-0">
      <span className="text-sm text-gray-600">{label}</span>

      {badge ? (
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full
          ${active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {value}
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-800">{value}</span>
      )}
    </div>
  );
};

export default InfoRow;
