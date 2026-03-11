import React, { useEffect, useRef, useState } from "react";
import { resendOtp, verifyOtp } from "../../services/authService";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "react-toastify";

const VerifyOtpEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const emailFromState = location.state?.email;
  const emailFromQuery = searchParams.get("email");
  const emailFromStorage = localStorage.getItem("verifyEmail");

  const email = emailFromState || emailFromQuery || emailFromStorage;

  console.log(email);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);

  const otpRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (email) {
      localStorage.setItem("verifyEmail", email);
    } else {
      toast.error("Link xác thực không hợp lệ");
      navigate("/register");
    }
  }, [email]);

  // countdown resend otp
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // nhập otp
  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  // backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // verify otp
  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      toast.error("Vui lòng nhập đủ OTP");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp({ email, otp: otpValue });
      localStorage.removeItem("verifyEmail");
      toast.success("Xác thực thành công");

      navigate("/login");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Không thể xác thực OTP";

      toast.error(message);

      console.log("Verify OTP error:", error.response?.data);
      // reset OTP input
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // gửi lại mã
  const handleResendOtp = async () => {
    try {
      setResending(true);

      const res = await resendOtp(email);

      toast.success(res?.message || "OTP mới đã được gửi");
      setTimer(60);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Không thể gửi lại OTP. Vui lòng thử lại.";

      toast.error(message);

      console.log("Resend OTP error:", error.response?.data);
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 w-[420px]">
        {/* header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-50 text-green-500 mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-slate-900">Xác thực OTP</h1>

          <p className="text-slate-500 text-sm mt-2">
            Mã xác thực đã được gửi đến <br />
            <span className="text-slate-900 font-bold">{email}</span>
          </p>
        </div>

        {/* otp inputs */}
        <div className="flex justify-between gap-2 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) otpRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 text-center text-xl font-black bg-white border-2 border-slate-300 rounded-xl 
    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            />
          ))}
        </div>

        {/* verify button */}
        <button
          disabled={loading || otp.some((d) => !d)}
          onClick={handleVerifyOtp}
          className="w-full bg-blue-600 text-white rounded-2xl py-4 font-bold shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? "Đang xác thực..." : "Xác nhận mã"}
        </button>

        {/* resend otp */}
        <div className="mt-8 text-center">
          {timer > 0 ? (
            <p className="text-slate-400 text-sm font-medium">
              Gửi lại mã sau{" "}
              <span className="text-blue-600 font-bold">{timer}s</span>
            </p>
          ) : (
            <button
              disabled={resending}
              onClick={handleResendOtp}
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline disabled:opacity-50"
            >
              <RefreshCw className="w-4 h-4" />
              {resending ? "Đang gửi..." : "Gửi lại mã ngay"}
            </button>
          )}
        </div>

        {/* back */}
        <button
          onClick={() => navigate("/register")}
          className="w-full mt-6 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
        >
          Quay lại trang đăng ký
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpEmail;
