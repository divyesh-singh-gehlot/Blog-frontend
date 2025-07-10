import { useState } from "react"
import signupValidator from "../validators/signupValidator"
import axios from "../utils/axiosInstance"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const initialFormData = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const initialFormError = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Signup = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formError, setFormError] = useState(initialFormError);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = signupValidator({
            name:formData.name,
            email:formData.email,
            password:formData.password,
            confirmPassword: formData.confirmPassword
        });

        if(errors.name || errors.email || errors.password || errors.confirmPassword){
            setFormError(errors);
        }else{
            try {
                setLoading(true);

                const requestBody = {
                    name:formData.name,
                    email:formData.email,
                    password:formData.password
                }

                const response = await axios.post("/auth/signup/", requestBody);
                const data = response.data;
                
                toast.success(data.message , {
                    position: "top-right",
                    autoClose:3000
                })

                setFormData(initialFormData);
                setFormError(initialFormError);

                setLoading(false);

                navigate("/login");

            } catch (error) {
                setLoading(false);
                const response = error.response;
                const data = response.data;
                
                toast.error(data.message , {
                    position: "top-right",
                    autoClose:true
                })
            }
        }

    }

    return (
        <div className="min-h-screen bg-white flex items-start justify-center px-4 py-16">
            <div className="max-w-md w-full">
                <h2 className="text-3xl font-serif font-semibold tracking-tight text-gray-900 mb-6">
                    Sign Up
                </h2>
                <p className="text-gray-500 font-light mb-8 text-sm leading-relaxed">
                    Sign up to unlock exclusive blogs, bold ideas, and fresh inspiration.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
                            placeholder="Jane Doe"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {formError.name && <p className="text-red-900">{formError.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address:</label>
                        <input
                            type="text"
                            name="email"
                            className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formError.email && <p className="text-red-900">{formError.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {formError.password && <p className="text-red-900">{formError.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700"> Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="mt-1 block w-full border-b border-gray-300 focus:border-black focus:outline-none font-light text-md py-2"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {formError.confirmPassword && <p className="text-red-900">{formError.confirmPassword}</p>}

                    </div>

                    <button
                        type="submit"
                        className="w-full hover:cursor-pointer bg-black text-white tracking-wide py-3 mt-4 text-sm uppercase font-semibold hover:bg-gray-800 transition-colors"
                    >
                        {loading ? (
  <div className="flex items-center justify-center gap-2">
    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
    Saving...
  </div>
) : (
  "Sign Up"
)}
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
