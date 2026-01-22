import { BrowserRouter, Link, Route, Routes } from "react-router";
import AppRoutes from "./common/routes/AppRoutes";
import Navbar from "./common/components/Navbar";

import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import UserLayout from "./user/components/UserLayout";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          {/* <UserLayout /> */}
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
