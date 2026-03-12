import { BrowserRouter, Link, Route, Routes } from "react-router";
import AppRoutes from "./common/routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";

import { UserProvider } from "./context/UserContext";
import { RoomProvider } from "./context/RoomContext";
import { BookingProvider } from "./context/BookingContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <UserProvider>
            <RoomProvider>
              <BookingProvider>
                <AppRoutes />
              </BookingProvider>
            </RoomProvider>
          </UserProvider>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
