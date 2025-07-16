import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const VerifyUser = () => {
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSendVerificationCode = async () => {
    try {
      setLoadingSend(true);
      const res = await axios.post("/auth/send-verification-code", {
        email: auth.email,
      });
      toast.success(res.data.message || "Verification code sent.");
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send code.";
      toast.error(msg);
    } finally {
      setLoadingSend(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!code || code.length !== 6 || !/^\d+$/.test(code)) {
      setCodeError("Please enter a valid 6-digit code.");
      return;
    }

    try {
      setLoadingVerify(true);
      const res = await axios.post("/auth/verify-user", {
        email: auth.email,
        code,
      });

      setCode("");
      setCodeError("");
      window.localStorage.removeItem("blogData");
      toast.success(res.data.message || "Verification successful.");
      navigate("/login");
    } catch (error) {
      setCode("");
      setCodeError("");
      const msg = error.response?.data?.message || "Verification failed.";
      toast.error(msg);
    } finally {
      setLoadingVerify(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <div className="flex justify-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:underline"
          >
            ← Go Back
          </button>
          <button
            onClick={handleSendVerificationCode}
            disabled={loadingSend}
            className={`text-sm font-medium ${
              loadingSend ? "text-gray-400" : "text-blue-600 hover:underline"
            }`}
          >
            {loadingSend ? "Sending..." : "Send Verification Code"}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Verification Code
            </label>
            <input
              type="text"
              name="code"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-center tracking-widest text-lg"
            />
            {codeError && (
              <p className="text-sm text-red-500 mt-1">{codeError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loadingVerify}
            className={`w-full py-2 text-white font-semibold rounded-lg transition ${
              loadingVerify ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-900"
            }`}
          >
            {loadingVerify ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyUser;
