import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import { toast } from "react-toastify";

const initialFormData = {
  name: "",
  email: ""
};

const initialFormError = {
  name: "",
  email: ""
};

const UpdateProfile = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/current-user");
        const user = res.data.data.user;
        setFormData({ name: user.name, email: user.email });
      } catch (err) {
        toast.error("Failed to load user info", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchUser();
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        const res = await axios.put("/auth/update-profile", formData);
        toast.success(res.data?.message || "Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setFormError(initialFormError);
        setLoading(false);
        navigate("/profile");
      } catch (err) {
        setLoading(false);
        const message =
          err?.response?.data?.message || "Failed to update profile";
        toast.error(message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-start justify-center px-4 py-20 font-['Inter']">
      <div className="max-w-lg w-full p-8 rounded-2xl shadow-lg bg-white/40 backdrop-blur-md border border-gray-200">
        <h2 className="text-3xl font-['Playfair_Display'] font-semibold text-center mb-6">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Full Name"
            />
            {formError.name && (
              <p className="text-red-900 text-sm">{formError.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Email Address"
            />
            {formError.email && (
              <p className="text-red-900 text-sm">{formError.email}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-gray-900 transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <p>Updating...</p>
              </div>
            ) : (
              "Update Profile"
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full mt-2 text-center text-sm text-gray-600 underline hover:text-black transition"
          >
            Go Back
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
