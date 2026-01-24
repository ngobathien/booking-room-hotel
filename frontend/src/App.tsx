import { BrowserRouter, Link, Route, Routes } from "react-router";
import AppRoutes from "./common/routes/AppRoutes";
import Navbar from "./user/components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import UserLayout from "./user/components/UserLayout";
import { UserProvider } from "./context/UserContext cp";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          {/* <UserLayout /> */}
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
