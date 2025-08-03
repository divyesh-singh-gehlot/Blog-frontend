import { NavLink, useNavigate } from "react-router-dom";

const PrivateFooter = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">Notionary</h2>
          <p className="mt-2 text-sm text-gray-600">Your digital-free space to share reflections, ideas, and insights.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm flex flex-col gap-2">

            <NavLink
              to="/posts"
              className="hover:underline"
            >
              Browse Posts
            </NavLink>

            <NavLink
              to="/categories"
              className="hover:underline"
            >
              Categories
            </NavLink>

            <NavLink
              to="/profile"
              className="hover:underline"
            >
              Profile
            </NavLink>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Resources</h3>
          <ul className="space-y-2 text-sm flex flex-col gap-2">
            <NavLink
              to="/terms"
              className="hover:underline"
            >
              Terms of Service
            </NavLink>
            
            <NavLink
              to="/privacy-policy"
              className="hover:underline"
            >
              Privacy Policy
            </NavLink>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-3">Stay Connected</h3>
          <p className="text-sm text-gray-600 mb-4">Follow us for more inspiration:</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-black">
              <i className="fab fa-twitter" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-500 hover:text-black">
              <i className="fab fa-instagram" aria-hidden="true" />
            </a>
            <a href="#" className="text-gray-500 hover:text-black">
              <i className="fab fa-github" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100 py-4 text-center text-sm text-gray-500">
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-4">
          <div>© {new Date().getFullYear()} Notionary. All rights reserved.</div>
          <div className="hidden sm:block">|</div>
          <div>
            Made by <span className="font-medium text-gray-700">DIVYESH SINGH GEHLOT</span>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default PrivateFooter;
