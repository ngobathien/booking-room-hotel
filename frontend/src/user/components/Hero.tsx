import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3iPil48BNGIZi5gi7NsPZgfcvVdzsVGuq2HR4VLnnvdpw4eelF_SKYQcbFF_rOi9JfyNFbvR9BqCdclKv_vK68RldjhKZr51S5RyrzEBICBti8a3iijIukEtNfwAUBRpi5jIFgkRr9BhyLoNC3_vl2iyxOrmUBpJ1T98jdbTzOfYW0kjUcB5XAv-uFG9s8CwuzY508qsbC0f0ipsbEjm1iNlUMltB2vir1FSnToaJTMBwnYm9yPkYGRowHToEXmZ915sRvuhUdpg")`,
        }}
      />
      <div className="relative z-10 max-w-[800px] text-center px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight mb-4 drop-shadow-lg">
          Trải Nghiệm Sang Trọng Mới
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-normal mb-8 max-w-2xl mx-auto drop-shadow">
          Khám phá sự kết hợp hoàn hảo giữa tiện nghi hiện đại và vẻ đẹp vượt
          thời gian tại điểm đến ven biển hàng đầu của chúng tôi.
        </p>
        <div className="flex justify-center gap-4">
          <button className="h-12 px-8 rounded-lg bg-primary text-white font-bold text-base hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-900/40">
            Khám Phá Các Phòng Suite
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
