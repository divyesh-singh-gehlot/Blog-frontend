const Signup = () => {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center px-4 py-16">
      <div className="max-w-md w-full">
        <h2 className="text-3xl font-serif font-semibold tracking-tight text-gray-900 mb-6">
          Sign Up
        </h2>
        <p className="text-gray-500 font-light mb-8 text-sm leading-relaxed">
          Sign up to unlock exclusive blogs, bold ideas, and fresh inspiration.
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address:</label>
            <input
              type="email"
              className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700"> Confirm Password:</label>
            <input
              type="password"
              className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white tracking-wide py-3 mt-4 text-sm uppercase font-semibold hover:bg-gray-800 transition-colors"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Signup
