import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import changePasswordValidator from "../validators/changePasswordValidator";
import { useAuth } from "../components/context/AuthContext";

const initialFormData = {
  oldPassword: "",
  newPassword: "",
};

const initialFormError = {
  oldPassword: "",
  newPassword: "",
};

const Setting = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = changePasswordValidator({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    });

    if (errors.oldPassword || errors.newPassword) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        const response = await axios.put("/auth/change-password", formData);
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: 1000,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
      } catch (error) {
        const data = error?.response?.data;
        toast.error(data?.message || "Something went wrong", {
          position: "top-right",
          autoClose: 1000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-8 lg:px-24 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-10">
        {/* Verified Capsule */}
        {auth.isVerified && (
          <div className="flex justify-end">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
              ✅ Account Verified
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Go Back
          </button>
        </div>

        {/* Unverified Notice */}
        {!auth.isVerified && (
          <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-yellow-800 font-medium mb-1">Account not verified</p>
              <p className="text-sm text-yellow-700">Please verify your account to access all features.</p>
            </div>
            <button
              onClick={() => navigate("/verify-user")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Verify Now
            </button>
          </div>
        )}

        {/* Change Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Change Password</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Old Password
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter old password"
                />
                {formError.oldPassword && (
                  <p className="text-red-600 text-sm mt-1">{formError.oldPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter new password"
                />
                {formError.newPassword && (
                  <p className="text-red-600 text-sm mt-1">{formError.newPassword}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-black text-white py-2 rounded-lg font-semibold text-sm transition hover:bg-gray-800 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setting;
