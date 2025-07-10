import React from "react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-20 bg-white">
      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-bold font-serif mb-2">Login</h2>
        <p className="text-gray-500 mb-6 text-sm font-light">
          Log in to read exclusive blogs, bold ideas, and inspiring stories.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 font-serif">
              Email Address:
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400 text-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 font-serif">
              Password:
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400 text-md"
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 text-sm tracking-wide font-semibold font-serif hover:bg-gray-900 transition"
            >
              LOG IN
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center pt-4">
            By logging in, you agree to our Terms and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
