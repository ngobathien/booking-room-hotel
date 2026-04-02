import { Hotel, Menu, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import LoadingSkeleton from "../../../common/LoadingSkeleton";
import { useAuth } from "../../../hooks/auth/useAuth";
import type { Hotel as Hoteltype } from "../../../types/hotel.types";
import { getHotelInfo } from "../../../common/services/hotelService";
import { useHotel } from "../../../hooks/hotel/useHotel";

interface NavLink {
  label: string;
  to: string;
  show?: (isLoggedIn: boolean, role?: string) => boolean;
}

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, logout, loading } = useAuth();
  const { hotel, loading: hotelLoading } = useHotel();
  if (loading) return <LoadingSkeleton />;

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const links: NavLink[] = [
    { label: "Trang chủ", to: "/", show: (loggedIn) => loggedIn },
    { label: "Danh sách phòng", to: "/rooms", show: (loggedIn) => loggedIn },
    { label: "Trang cá nhân", to: "/profile", show: (loggedIn) => loggedIn },
    {
      label: "Đặt phòng của tôi",
      to: "/my-bookings",
      show: (loggedIn) => loggedIn,
    },
    {
      label: "Dashboard",
      to: "/dashboard",
      show: (_, role) => role === "ADMIN",
    },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary">
            <Hotel className="h-8 w-8" />
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              {hotelLoading ? "Loading..." : hotel?.name || "Hotel"}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {isLoggedIn &&
              links
                .filter((link) => link.show?.(isLoggedIn, user?.role))
                .map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-sm font-semibold transition-colors ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-slate-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

            {/* Greeting & Logout */}
            {/* {isLoggedIn && (
              <>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex h-10 px-5 items-center justify-center rounded-lg bg-primary text-white text-sm font-bold transition-shadow shadow-lg"
                >
                  Đăng xuất
                </button>
              </>
            )} */}

            {/* Cart Button */}

            {/* Notifications */}
            {/* {isLoggedIn && (
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all hover:bg-primary/20">
                <Bell className="h-5 w-5" />
              </button>
            )} */}

            {/* User Avatar */}
            {isLoggedIn && (
              <Link
                to="/profile"
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary/20"
              >
                <img
                  src={user?.avatar || ""}
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </Link>
            )}

            {/* When not logged in */}
            {!isLoggedIn && (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:flex h-10 px-5 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold hover:bg-gray-200 transition-colors"
                >
                  Đăng ký
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="border-t border-slate-200 bg-white p-4 md:hidden"
            >
              <nav className="flex flex-col gap-4">
                {isLoggedIn &&
                  links
                    .filter((link) => link.show?.(isLoggedIn, user?.role))
                    .map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-semibold text-slate-600"
                      >
                        {link.label}
                      </Link>
                    ))}

                {!isLoggedIn && (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      <User className="h-5 w-5" />
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 text-sm font-semibold text-primary"
                    >
                      <User className="h-5 w-5" />
                      Đăng ký
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
