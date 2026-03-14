import { Outlet } from "react-router";
import Breadcrumb from "../Breadcrumb";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;
