import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axiosInstance"
import { toast } from "react-toastify"
import addCategoryValidator from "../../validators/addCategoryValidator";


const initialFormData = {
  title: "",
  description: ""
}

const initialFormError = {
  title: ""
}

const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const categoryId = params.id;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    if (categoryId) {
      const getCategory = async () => {
        try {

          const response = await axios.get(`/categories/${categoryId}`);
          const data = response.data.data

          console.log("Data is Update Category: ", data)

          setFormData({title: data.category.title , description: data.category.description})

        } catch (error) {

          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-right",
            autoClose: true
          })

        }
      }
      getCategory();
    }
  }, [categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addCategoryValidator({title: formData.title});

    if(errors.title){
      
      setFormError(errors);

    }else{
      try {
        setLoading(true);

        const response = await axios.put(`/categories/${categoryId}`, formData);
        const data = response.data;

        toast.success(data?.message || "Category Updated successfully!", {
          position: "top-right",
          autoClose: 3000
        })

        setFormData(initialFormData);
        setFormError(initialFormError);

        setLoading(false);
        navigate(-1);

      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;

        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-start justify-center px-4 py-20 font-['Inter']">
      <div className="max-w-lg w-full p-8 rounded-2xl shadow-lg bg-white/40 backdrop-blur-md border border-gray-200">
        <h2 className="text-3xl font-['Playfair_Display'] font-semibold text-center mb-6">
          Update Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Category Title"
            />
            {formError.title && <p className="text-red-900">{formError.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              name="description"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              rows={4}
              placeholder="Brief description"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-gray-900 transition-colors hover:cursor-pointer"
          >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <p>Updating...</p>
                </div>
              ) : (
                "Update Category"
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

export default UpdateCategory;
