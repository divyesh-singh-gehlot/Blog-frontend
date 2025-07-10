import { useState } from "react"
import axios from "../utils/axiosInstance"
import { toast } from "react-toastify"
import loginValidator from "../validators/loginValidator"
import { useNavigate } from "react-router-dom"

const initialFormData = {
  email: "",
  password: ""
}

const initialFormError = {
  email: "",
  password: ""
}

const Login = () => {

  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = loginValidator({
      email: formData.email,
      password: formData.password,
    });

    if (errors.email || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        const response = await axios.post("/auth/signin/", formData);
        const data = response.data;

        window.localStorage.setItem("sessionData", JSON.stringify(data.data));

        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000
        })

        setFormData(initialFormData);
        setFormError(initialFormError);

        setLoading(false);
        navigate("/")

      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: true
        })
      }
    }

  }

  return (
    <div className="min-h-screen flex flex-col justify-start items-center pt-20 bg-white">
      <div className="w-full max-w-md px-6">
        <h2 className="text-2xl font-bold font-serif mb-2">Login</h2>
        <p className="text-gray-500 mb-6 text-sm font-light">
          Log in to read exclusive blogs, bold ideas, and inspiring stories.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 font-serif">
              Email Address:
            </label>
            <input
              type="text"
              name="email"
              placeholder="you@example.com"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400 text-md"
              value={formData.email}
              onChange={handleChange}
            />
            {formError.email && <p className="text-red-900">{formError.email}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 font-serif">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full border-b border-gray-300 focus:outline-none py-2 placeholder-gray-400 text-md"
              value={formData.password}
              onChange={handleChange}
            />
            {formError.password && <p className="text-red-900">{formError.password}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="hover:cursor-pointer w-full bg-black text-white py-3 text-sm tracking-wide font-semibold font-serif hover:bg-gray-900 transition"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                </div>
              ) : (
                "Sign In"
              )}
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
