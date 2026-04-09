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
      </div>
    </>
  );
};

export default HomePage;
