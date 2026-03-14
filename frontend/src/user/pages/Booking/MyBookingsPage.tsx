import { useEffect } from "react";

import { useBookingAction } from "../../../hooks/booking/useBookingAction";
import { Link } from "react-router-dom";

import { Calendar, ChevronRight, History } from "lucide-react";
import { useBooking } from "../../../hooks/booking/useBooking";

const MyBookingsPage = () => {
  const { myBooking, loading } = useBooking();
  const { fetchMyBookings, cancelBookingAction } = useBookingAction();

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const mapStatus = (status: string) => {
    if (status === "pending" || status === "confirmed") return "upcoming";
    if (status === "completed") return "completed";
    if (status === "cancelled") return "cancelled";
    return status;
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "upcoming":
        return "Sắp tới";
      case "completed":
        return "Đã hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-600";
      case "completed":
        return "bg-emerald-100 text-emerald-600";
      case "cancelled":
        return "bg-slate-100 text-slate-500";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-[1000px] px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-gray-500">
          <Link to="/" className="text-sm font-medium hover:text-blue-500">
            Trang chủ
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-sm font-bold text-black">
            Lịch sử đặt phòng
          </span>
        </div>

        {/* Title */}
        <div className="mt-8">
          <h1 className="text-4xl font-extrabold">Lịch sử đặt phòng</h1>
          <p className="text-gray-500 mt-2">
            Quản lý các lần đặt phòng của bạn.
          </p>
        </div>

        {/* Booking List */}
        <div className="mt-8 flex flex-col gap-6">
          {myBooking?.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-20 text-center shadow-sm">
              <History className="h-16 w-16 text-gray-200" />
              <p className="mt-6 text-xl font-bold text-gray-400">
                Không có booking nào
              </p>

              <Link
                to="/rooms"
                className="mt-4 text-blue-500 font-bold hover:underline"
              >
                Đặt phòng ngay
              </Link>
            </div>
          ) : (
            myBooking?.map((booking: any) => {
              const status = mapStatus(booking.bookingStatus);

              return (
                <div
                  className={`flex flex-col md:flex-row gap-6 rounded-2xl bg-white p-5 shadow-sm border ${
                    status === "cancelled" && "opacity-70 grayscale"
                  }`}
                >
                  {/* Image */}
                  {/* Image */}
                  <div className="w-full md:w-64 aspect-video md:aspect-square rounded-xl overflow-hidden">
                    <img
                      src={booking.room?.images?.[0]}
                      alt={booking.room?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xl font-bold">
                            #{booking.bookingCode}
                          </h3>

                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <p className="text-sm">
                              {new Date(
                                booking.checkInDate,
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                booking.checkOutDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyles(
                            status,
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400 uppercase">
                          Tổng thanh toán
                        </p>

                        <p className="text-2xl font-black">
                          {booking.totalPrice.toLocaleString()} VND
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                      {status === "upcoming" && (
                        <>
                          <button className="rounded-xl bg-blue-500 px-6 py-2 text-white font-bold hover:bg-blue-600">
                            Xem chi tiết
                          </button>

                          {booking.bookingStatus === "pending" && (
                            <button
                              onClick={() => cancelBookingAction(booking._id)}
                              className="rounded-xl border px-6 py-2 font-bold text-gray-600 hover:bg-gray-50"
                            >
                              Hủy đặt phòng
                            </button>
                          )}
                        </>
                      )}

                      {status === "completed" && (
                        <button className="rounded-xl bg-black px-6 py-2 text-white font-bold">
                          Xem lại đơn
                        </button>
                      )}

                      {status === "cancelled" && (
                        <button className="rounded-xl bg-gray-200 px-6 py-2 text-gray-400 font-bold cursor-not-allowed">
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

        {/* Load more */}
        <div className="mt-12 flex justify-center"></div>
      </main>
    </div>
  );
};

export default MyBookingsPage;
