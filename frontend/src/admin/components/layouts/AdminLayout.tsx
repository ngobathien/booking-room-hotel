import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import { useEffect, useState } from "react";
import NavbarAdmin from "../NavbarAdmin";

const AdminLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  // Tự động đóng sidebar trên mobile khi chuyển route
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  // 1️⃣ Lấy theme từ localStorage (tránh reload mất dark mode)
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="flex h-screen overflow-hidden bg-background-light font-display transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isDark={isDark}
        onToggleDark={() => setIsDark(!isDark)}
      />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto relative transition-all duration-300">
        {/* Top navbar */}
        <NavbarAdmin
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        {/* Route content render tại đây */}
        <div className="p-4 sm:p-8 w-full max-w-[1600px] mx-auto transition-all duration-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
