import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";

import { cn } from "../../../lib/utils";

import CustomerInfoStep from "../../components/bookings/step/CustomerInfoStep";
import ConfirmationStep from "../../components/bookings/step/ConfirmationStep";

import useRoomAction from "../../../hooks/room/useRoomAction";
import BookingSummary from "../../components/bookings/BookingSummary";

import { PaymentBookingPage } from "../Payments/PaymentBookingPage";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useBooking } from "../../../hooks/booking/useBooking";
import { useRoomContext } from "../../../hooks/room/useRoom";

export const CheckoutPage = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [step, setStep] = React.useState(1);
  const { getRoomById } = useRoomAction();
  const { rooms, currentRoom } = useRoomContext();
  console.log("currentRoom", currentRoom);

  const [searchParams] = useSearchParams();

  const queryCheckIn =
    searchParams.get("checkIn") || searchParams.get("checkInDate");
  const queryCheckOut =
    searchParams.get("checkOut") || searchParams.get("checkOutDate");

  const {
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
    loading,
  } = useBooking();
  const { user } = useAuth();

  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const { setRooms } = useRoomContext();

  const calculateNights = (start: string | null, end: string | null) => {
    if (!start || !end) return 0;
    const s = new Date(start);
    const e = new Date(end);
    const diff = e.getTime() - s.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights(checkInDate, checkOutDate);
  useEffect(() => {
    if (queryCheckIn && queryCheckOut) {
      setCheckInDate(queryCheckIn);
      setCheckOutDate(queryCheckOut);
    }
  }, [queryCheckIn, queryCheckOut]);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (!roomId) return;

        const data = await getRoomById(roomId);
        setRooms(data); // hoặc có thể dùng currentRoom luôn
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoom();
  }, [roomId]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        Đang tải...
      </div>
    );

  if (!rooms || !currentRoom)
    return (
      <div className="flex h-screen items-center justify-center">
        Không tìm thấy phòng
      </div>
    );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Progress Stepper */}
      <div className="mb-12 flex items-center justify-center">
        {[
          { num: 1, label: "Thông tin" },
          { num: 2, label: "Xác nhận" },
          { num: 3, label: "Thanh toán" },
        ].map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all",
                  step >= s.num
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-slate-100 text-slate-400",
                )}
              >
                {step > s.num ? <Check className="h-5 w-5" /> : s.num}
              </div>
              <span
                className={cn(
                  "text-xs font-bold uppercase tracking-wider",
                  step >= s.num ? "text-primary" : "text-slate-400",
                )}
              >
                {s.label}
              </span>
            </div>
            {i < 2 && (
              <div
                className={cn(
                  "mx-4 h-0.5 w-12 md:w-24",
                  step > s.num ? "bg-primary" : "bg-slate-100",
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <CustomerInfoStep
              onNext={nextStep}
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          )}

          {step === 2 && (
            <ConfirmationStep
              onNext={nextStep}
              onBack={prevStep}
              room={currentRoom}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              customerInfo={customerInfo}
            />
          )}

          {step === 3 && <PaymentBookingPage />}
        </div>

        {/* Summary Sidebar nằm bên phải*/}
        <BookingSummary room={currentRoom} nights={nights} />
      </div>
    </div>
  );
};
