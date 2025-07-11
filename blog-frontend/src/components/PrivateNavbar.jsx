import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const PrivateNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("sessionData");
    toast.success("Logout Successful", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/login");
  };

  const navLinkClass =
    "relative font-serif text-base text-gray-700 px-2 py-1 transition-colors duration-300 hover:text-black";
  const activeClass = "after:w-full after:opacity-100 text-black";

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/posts", label: "Posts" },
    { to: "/categories", label: "Categories" },
    { to: "/setting", label: "Setting" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <nav className="w-full bg-transparent shadow-md px-6 py-4 flex justify-between items-center">
      <NavLink
        to="/"
        className="text-xl font-bold font-serif tracking-wide text-black"
      >
        Notionary
      </NavLink>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-4 items-center">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${navLinkClass} ${isActive ? activeClass : ""} 
              after:content-[''] after:absolute after:-bottom-0.5 after:left-0 
              after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 
              hover:after:w-full`
            }
          >
            {label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className={`${navLinkClass} hover:text-red-700`}
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-black focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Drawer from Right */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-lg font-semibold">Notionary</span>
          <button onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-lg font-serif ${isActive ? "text-black font-semibold" : "text-gray-700"}`
              }
              onClick={toggleMenu}
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
            className="text-lg text-red-700 font-serif"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-white/10 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default PrivateNavbar;
