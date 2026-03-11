import React from "react";

const BookingBar: React.FC = () => {
  return (
    <div className="relative z-20 -mt-16 max-w-[1000px] mx-auto px-4">
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-end border border-gray-100">
        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Check-In
          </label>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              calendar_today
            </span>

            <input
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Select Date"
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Check-Out
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              calendar_month
            </span>
            <input
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Select Date"
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
        </div>

        <div className="flex-1 w-full space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
            Guests
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              group
            </span>
            <select className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-primary outline-none appearance-none cursor-pointer">
              <option>2 Adults, 0 Children</option>
              <option>1 Adult</option>
              <option>2 Adults, 1 Child</option>
              <option>2 Adults, 2+ Children</option>
              <option>Group Booking</option>
            </select>
          </div>
        </div>

        <button className="w-full md:w-auto h-12 px-8 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/20 active:scale-95">
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
            search
          </span>
          Check Availability
        </button>
      </div>
    </div>
  );
};

export default BookingBar;
