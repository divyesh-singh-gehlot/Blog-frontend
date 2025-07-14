import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const UpdatePost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          // api request
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;

          setFormData({
            title: data.post.title,
            description: data.post.description,
            category: data.post.category._id,
            file: data.post?.file?._id,
          });
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: true,
          });
        }
      };

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        // api request
        const response = await axios.get(`/category?size=1000`);
        const data = response.data.data;
        setCategories(data.categories);
      } catch (error) {
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    getCategories();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });
    if (errors.title || errors.category) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        let input = formData;

        if (fileId) {
          input = { ...input, file: fileId };
        }
        // api request
        const response = await axios.put(`/posts/${postId}`, input);
        const data = response.data;

        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate(`/posts/post-detail/${postId}`);
      } catch (error) {
        setLoading(false);
        setFormError(initialFormError);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleFileChange = async (e) => {
    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);

    const type = e.target.files[0].type;

    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setExtensionError(null);

      try {
        setIsDisable(true);
        // api request
        const response = await axios.post("/file/upload", formInput);
        const data = response.data;
        setFileId(data.data._id);

        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
        setIsDisable(false);
      } catch (error) {
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      setExtensionError("Only .png or .jpg or .jpeg file allowed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-3xl shadow-xl px-6 py-10 sm:p-12 md:p-16 transition-all duration-300">
        {/* Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:text-black mb-6 transition"
        >
          ← Go Back
        </button>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-10 text-center leading-tight">
          ✏️ Update Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Field */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && (
              <p className="text-red-500 text-sm mt-1">{formError.title}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              rows="5"
              className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Start writing here..."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">Upload Image</label>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="text-sm file:px-4 file:py-2 file:rounded-full file:border-0 file:bg-black file:text-white hover:file:bg-gray-800"
            />
            {extensionError && (
              <p className="text-red-500 text-sm mt-1">{extensionError}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-sm mb-2 text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="px-4 py-3 rounded-xl border border-gray-300 shadow-inner focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.category && (
              <p className="text-red-500 text-sm mt-1">{formError.category}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 text-center">
            <input
              type="submit"
              disabled={isDisable}
              value={loading ? "Updating..." : "Update"}
              className="px-8 py-3 bg-black text-white rounded-full hover:scale-105 hover:shadow-lg transition-transform duration-200 disabled:opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;