import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateNavbar = () => {

  const navigate = useNavigate();

  const navLinkClass =
    "relative font-serif text-base text-gray-700 px-2 py-1 transition-colors duration-300 hover:text-black";

  const activeClass = "after:w-full after:opacity-100 text-black";

  const handleLogout = () => {
    window.localStorage.removeItem("sessionData");
    toast.success("Logout Successfull", {
      position: "top-right",
      autoClose: 3000
    })
    navigate("/login");
  }

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-transparent">
      <NavLink
        to="/"
        className="text-xl font-bold font-serif tracking-wide text-black"
      >
        Notionary
      </NavLink>

      <div className="flex space-x-4">
        {[
          { to: "/", label: "Home" },
          { to: "/posts", label: "Posts" },
          { to: "/category", label: "Categories" },
          { to: "/setting", label: "Setting" },
          { to: "/profile", label: "Profile" },
        ].map(({ to, label }) => (
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
        <NavLink
          to="/login"
          className={`${navLinkClass} hover:text-red-700`}
          onClick={handleLogout}
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
