import React from "react";

import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumb from "../Breadcrumb";

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
