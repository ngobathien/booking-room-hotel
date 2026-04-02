import { BrowserRouter } from "react-router";
import AppRoutes from "./common/routes/AppRoutes";

import { AuthProvider } from "./context/auth/AuthProvider";
import { ToastContainer } from "react-toastify";

import { UserProvider } from "./context/user/UserProvider";
import { RoomProvider } from "./context/room/RoomProvider";
import { BookingProvider } from "./context/booking/BookingProvider";
import { PaymentProvider } from "./context/payment/PaymentProvider";
import { RoomTypeProvider } from "./context/roomType/RoomTypeProvider";
import FloatingChatbot from "./user/components/chatbot/FloatingChatbot";
import FloatingContact from "./user/components/contacts/FloatingContact";

function App() {
  return (
    <>
      {/* Floating Action Button for AI Concierge (Mockup UI) */}
      <FloatingChatbot />

      {/* Floating Contact Button */}
      <FloatingContact />

      <AuthProvider>
        <BrowserRouter>
          <UserProvider>
            <RoomProvider>
              <RoomTypeProvider>
                <BookingProvider>
                  <PaymentProvider>
                    <AppRoutes />
                  </PaymentProvider>
                </BookingProvider>
              </RoomTypeProvider>
            </RoomProvider>
          </UserProvider>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
