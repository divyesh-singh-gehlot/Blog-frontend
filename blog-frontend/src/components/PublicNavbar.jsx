import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex justify-end items-center bg-white shadow-sm">
      <div className="space-x-6 text-sm">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `font-serif tracking-wide ${
              isActive ? "text-black underline" : "text-gray-500 hover:text-black transition"
            }`
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            `font-serif tracking-wide ${
              isActive ? "text-black underline" : "text-gray-500 hover:text-black transition"
            }`
          }
        >
          Signup
        </NavLink>
      </div>
    </nav>
  );
};

export default PublicNavbar;
