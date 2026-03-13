import type { BookingStatus } from "../../../types/booking.types";

type Props = {
  status: BookingStatus;
};

export default function BookingStatusBadge({ status }: Props) {
  const map = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-green-100 text-green-700",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm font-medium ${map[status]}`}>
      {status}
    </span>
  );
}
