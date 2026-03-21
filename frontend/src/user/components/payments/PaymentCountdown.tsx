// PaymentCountdown.tsx
import { useEffect, useState } from "react";

const PaymentCountdown = ({ expiryAt }: { expiryAt: string }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const expiryTime = new Date(expiryAt).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, expiryTime - now);

      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);
        localStorage.removeItem("payment_expiry");

        window.location.href = "/payment/result?status=expired";
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryAt]);

  if (!timeLeft) return null;

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-center">
      ⏳ Còn {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default PaymentCountdown;
