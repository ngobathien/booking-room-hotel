
import BookingBar from "../../components/bookings/BookingBar";
import Hero from "../../components/Hero";
import HomeRoomsSection from "../../components/rooms/HomeRoomsSection";

const HomePage = () => {
  return (
    <>
      {/* gọi card chứa thông tin room  */}
      <div className="min-h-screen bg-background-light flex flex-col selection:bg-primary/20">
        {/* <Navbar /> */}

        <main className="flex-grow">
          <Hero />

          <div id="booking">
            <BookingBar />
          </div>

          <div id="rooms">
            <HomeRoomsSection limit={4} />
          </div>

          {/* <div id="attractions">
            <Attractions />
          </div> */}

          {/* <div id="membership">
            <CTA />
          </div> */}
        </main>

        {/* Floating Action Button for AI Concierge (Mockup UI) */}
        <button className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group overflow-hidden">
          <div className="bg-blue-700 absolute inset-0 " />
          <span className="material-symbols-outlined relative z-10 text-2xl group-hover:rotate-12 transition-transform">
            auto_awesome
          </span>
        </button>
      </div>
    </>
  );
};

export default HomePage;
