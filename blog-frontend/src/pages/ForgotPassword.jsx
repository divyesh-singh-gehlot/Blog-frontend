import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import sendCodeValidator from "../validators/sendCodeValidator";
import recoverPasswordValidator from "../validators/recoverPasswordValidator";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  email: "",
  code: "",
  password: "",
};

const initialFormError = {
  code: "",
  password: "",
};

const ForgotPassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [hasEmail, setHasEmail] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    const errors = sendCodeValidator({ email: formData.email });
    if (errors.email) {
      setEmailError(errors.email);
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/auth/forgot-password-code", {
          email: formData.email,
        });
        toast.success(response.data.message);
        setHasEmail(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    }
  };

  const handleRecoverPassword = async (e) => {
    e.preventDefault();

    const errors = recoverPasswordValidator({
      code: formData.code,
      password: formData.password,
    });

    if (errors.code || errors.password) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/auth/recover-password", formData);
        toast.success(response.data.message);
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
        console.error("Recover Password Error:", error.response || error);
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <form
        onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword}
        className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl shadow-lg w-full max-w-md px-8 py-10 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          {hasEmail ? "Reset Your Password" : "Recover Password"}
        </h2>

        {!hasEmail ? (
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
          </div>
        ) : (
          <>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Verification Code
              </label>
              <input
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="text"
                name="code"
                placeholder="123456"
                value={formData.code}
                onChange={handleChange}
              />
              {formError.code && (
                <p className="text-sm text-red-500 mt-1">{formError.code}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                New Password
              </label>
              <input
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                type="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {formError.password && (
                <p className="text-sm text-red-500 mt-1">{formError.password}</p>
              )}
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:shadow-lg transition duration-300 ease-in-out"
        >
          {loading ? "Processing..." : hasEmail ? "Reset Password" : "Send Code"}
        </button>

        <p className="text-sm text-center text-gray-500 mt-2">
          {hasEmail ? (
            <span>
              Didn't receive a code?{" "}
              <button
                type="button"
                onClick={() => {
                  setHasEmail(false);
                  setFormData(initialFormData);
                  setFormError(initialFormError);
                  setEmailError("");
                }}
                className="text-blue-500 hover:underline"
              >
                Try again
              </button>
            </span>
          ) : (
            "We'll send a code to your email"
          )}
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;