import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-24 pb-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-primary">
                apartment
              </span>
              <h2 className="text-2xl font-black tracking-tight">
                LuxuryHotel
              </h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              A curated collection of the world's most elegant properties,
              offering unparalleled service and timeless comfort since 1995.
            </p>
            <div className="flex gap-4">
              {[
                { icon: "public", label: "Website" },
                { icon: "share", label: "Social" },
                { icon: "contact_support", label: "Support" },
              ].map((item) => (
                <a
                  key={item.label}
                  className="w-11 h-11 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 transition-all"
                  href="#"
                  aria-label={item.label}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {item.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-xs">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              {[
                "Our Rooms",
                "Dining & Bar",
                "Spa & Wellness",
                "Special Offers",
              ].map((link) => (
                <li key={link}>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-xs">
              Support
            </h4>
            <ul className="space-y-4 text-sm font-medium text-gray-500">
              {[
                "Contact Us",
                "Booking Guide",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <a
                    className="hover:text-primary transition-colors flex items-center gap-2 group"
                    href="#"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-8 uppercase tracking-widest text-xs">
              Newsletter
            </h4>
            <p className="text-sm font-medium text-gray-500 mb-6">
              Subscribe to receive exclusive deals and upcoming event news.
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                className="w-full px-4 py-3 bg-gray-50 border-gray-100 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm transition-all"
                placeholder="Your email address"
                type="email"
              />
              <button className="w-full py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-gray-400">
            © 2024 LuxuryHotel Group. Crafted with elegance.
          </p>
          <div className="flex gap-8 text-sm font-bold text-gray-500">
            <a className="hover:text-primary transition-colors cursor-pointer">
              English (US)
            </a>
            <a className="hover:text-primary transition-colors cursor-pointer">
              USD ($)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
