import {
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  History,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmModal from "../../../common/components/ConfirmModal";
import { useBooking } from "../../../hooks/booking/useBooking";
import { useBookingAction } from "../../../hooks/booking/useBookingAction";
import {
  BOOKING_STATUS,
  BOOKING_STAY_STATUS,
  type Booking,
} from "../../../types/booking.types";

const MyBookingsPage = () => {
  const { myBooking, loading } = useBooking();
  const { fetchMyBookings, cancelBookingAction } = useBookingAction();

  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // useEffect(() => {
  //   fetchMyBookings();

  //   // realtime nhẹ (polling)
  //   const interval = setInterval(() => {
  //     fetchMyBookings();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    fetchMyBookings();
  }, []);

  // ===== MAP STATUS CHUẨN (có stayStatus) =====
  const mapDisplayStatus = (booking: Booking) => {
    if (booking.bookingStatus === BOOKING_STATUS.CANCELLED) {
      return "cancelled";
    }

    if (booking.bookingStatus === BOOKING_STATUS.COMPLETED) {
      return "completed";
    }

    if (booking.stayStatus === BOOKING_STAY_STATUS.CHECKED_OUT) {
      return "checked_out";
    }

    if (booking.stayStatus === BOOKING_STAY_STATUS.CHECKED_IN) {
      return "checked_in";
    }

    if (
      booking.bookingStatus === BOOKING_STATUS.CONFIRMED &&
      booking.stayStatus === BOOKING_STAY_STATUS.NOT_CHECKED_IN
    ) {
      return "upcoming";
    }

    return "pending";
  };

  const canCancelBooking = (booking: Booking) => {
    return (
      booking.bookingStatus !== BOOKING_STATUS.CANCELLED &&
      booking.bookingStatus !== BOOKING_STATUS.COMPLETED &&
      booking.stayStatus !== BOOKING_STAY_STATUS.CHECKED_IN
    );
  };

  // ===== UI CONFIG =====
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return {
          label: "Sắp tới",
          className: "bg-blue-50 text-blue-600 border-blue-200",
          icon: <Clock className="h-4 w-4" />,
        };

      case "checked_in":
        return {
          label: "Đã nhận phòng",
          className: "bg-indigo-50 text-indigo-600 border-indigo-200",
          icon: <CheckCircle2 className="h-4 w-4" />,
        };

      case "checked_out":
        return {
          label: "Đã trả phòng",
          className: "bg-emerald-50 text-emerald-600 border-emerald-200",
          icon: <CheckCircle2 className="h-4 w-4" />,
        };

      case "completed":
        return {
          label: "Hoàn thành",
          className: "bg-green-50 text-green-600 border-green-200",
          icon: <CheckCircle2 className="h-4 w-4" />,
        };

      case "cancelled":
        return {
          label: "Đã hủy",
          className: "bg-slate-100 text-slate-500 border-slate-200",
          icon: <XCircle className="h-4 w-4" />,
        };

      default:
        return {
          label: status,
          className: "bg-gray-100 text-gray-600",
          icon: null,
        };
    }
  };

  const handleCancel = async (id: string) => {
    setCancellingId(id);
    setShowCancelConfirm(true);
  };

  const confirmCancel = async () => {
    if (!cancellingId) return;

    try {
      await cancelBookingAction(cancellingId);
      await fetchMyBookings(); // refresh sau khi hủy
      setShowCancelConfirm(false);
      setCancellingId(null);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      setCancellingId(null);
    }
  };

  const bookings = useMemo(() => myBooking ?? [], [myBooking]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Link to="/" className="hover:text-blue-600 font-medium">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-800 font-semibold">Lịch sử đặt phòng</span>
        </div>

        {/* Header */}
        <div className="mt-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black">
              Lịch sử đặt phòng
            </h1>
            <p className="text-gray-500 mt-2">
              Theo dõi và quản lý các booking của bạn
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-gray-400">
            <History className="h-5 w-5" />
          </div>
        </div>

        {/* List */}
        <div className="mt-10 space-y-6">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border p-16 text-center">
              <History className="mx-auto h-14 w-14 text-gray-300" />
              <h3 className="mt-4 text-xl font-bold text-gray-600">
                Chưa có booking nào
              </h3>
              <p className="text-gray-400 mt-2">
                Hãy đặt phòng để bắt đầu trải nghiệm
              </p>
              <Link
                to="/rooms"
                className="inline-block mt-6 px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Đặt phòng ngay
              </Link>
            </div>
          ) : (
            bookings.map((booking: any) => {
              console.log(booking.room);
              const status = mapDisplayStatus(booking);
              const cfg = getStatusConfig(status);

              return (
                <div
                  key={booking._id}
                  className={`bg-white rounded-2xl shadow-sm ring-1 ring-gray-100 hover:shadow-md hover:-translate-y-0.5 transition overflow-hidden flex flex-col md:flex-row gap-4 p-4 ${
                    status === "cancelled" ? "opacity-70 grayscale" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="md:w-56 h-40 md:h-auto rounded-xl overflow-hidden">
                    <img
                      src={booking.room?.images?.[0]}
                      alt={booking.room?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="text-lg font-bold">
                            #{booking.bookingCode}
                          </h2>

                          <div className="flex gap-2 mt-1">
                            <span className="px-2 py-1 text-xs rounded bg-gray-100">
                              Phòng {booking.room?.roomNumber}
                            </span>

                            <span className="px-2 py-1 text-xs rounded bg-blue-50 text-blue-600">
                              {booking.room?.roomType?.typeName}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                booking.checkInDate,
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                booking.checkOutDate,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.className}`}
                        >
                          {cfg.icon}
                          {cfg.label}
                        </span>
                      </div>

                      <div className="mt-4">
                        <p className="text-xs text-gray-400 uppercase">
                          Tổng thanh toán
                        </p>
                        <p className="text-xl font-black text-gray-900">
                          {(booking.totalPrice ?? 0).toLocaleString()} VND
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap gap-3">
                      {/* LUÔN HIỂN THỊ */}
                      {/* <button className="flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
                        <Eye className="h-4 w-4" />
                        Xem chi tiết
                      </button> */}

                      {/* CHỈ HIỆN KHI ĐƯỢC HỦY */}
                      {canCancelBooking(booking) && (
                        <button
                          onClick={() => handleCancel(booking._id)}
                          disabled={cancellingId === booking._id}
                          className="flex items-center gap-2 px-5 py-2 rounded-xl border font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        >
                          <XCircle className="h-4 w-4" />
                          {cancellingId === booking._id ? "Đang hủy..." : "Hủy"}
                        </button>
                      )}

                      {status === "checked_in" && (
                        <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold">
                          Đang ở
                        </button>
                      )}

                      {status === "checked_out" && (
                        <button className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-semibold">
                          Đã trả phòng
                        </button>
                      )}

                      {/* {status === "completed" && (
                        <button className="px-5 py-2 rounded-xl bg-black text-white font-semibold">
                          Xem lại
                        </button>
                      )} */}

                      {status === "cancelled" && (
                        <button
                          disabled
                          className="px-5 py-2 rounded-xl bg-gray-200 text-gray-400 font-semibold cursor-not-allowed"
                        >
                          Đã hủy
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Cancel Booking Confirm Modal */}
      <ConfirmModal
        open={showCancelConfirm}
        title="Hủy Booking"
        message="Bạn có chắc chắn muốn hủy booking này không? Hành động này không thể hoàn tác."
        onConfirm={confirmCancel}
        onCancel={() => {
          setShowCancelConfirm(false);
          setCancellingId(null);
        }}
        confirmText="Hủy Booking"
        cancelText="Thoát"
        isDangerous={true}
        isLoading={cancellingId !== null}
      />
    </div>
  );
};

export default MyBookingsPage;
