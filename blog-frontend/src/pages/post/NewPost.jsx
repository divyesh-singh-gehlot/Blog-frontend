import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  description: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const NewPost = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formError, setFormError] = useState(initialFormError);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [extensionError, setExtensionError] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(`/categories?size=1000`);
        const data = response.data.data;
        setCategories(data.categories);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load categories", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    };

    getCategories();
  }, []);

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

        const response = await axios.post("/posts", input);
        const data = response.data;

        toast.error(data.message || "Post Published Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate(-1);
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message || "Failed to submit post", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formInput = new FormData();
    formInput.append("image", file);

    const type = file.type;
    if (["image/png", "image/jpg", "image/jpeg"].includes(type)) {
      setExtensionError(null);
      setPreview(URL.createObjectURL(file));

      try {
        setIsDisable(true);
        const response = await axios.post("/file/upload", formInput);
        setFileId(response.data.data._id);

        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
        setIsDisable(false);
      } catch (error) {
        setIsDisable(false);
        toast.error(error?.response?.data?.message || "Upload failed", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    } else {
      setExtensionError("Only .png, .jpg, or .jpeg files are allowed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f7f7] to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white/30 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 md:p-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            className="flex items-center gap-2 px-5 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-900 transition"
            onClick={() => navigate(-1)}
          >
            <span className="text-lg">←</span>
            <span>Back</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 text-center w-full -ml-5">
            📝 New Blog Post
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Panel */}
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                className="w-full px-5 py-3 bg-white/80 rounded-xl text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
              />
              {formError.title && <p className="text-red-600 text-sm mt-1">{formError.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-white hover:file:bg-gray-900"
              />
              {extensionError && <p className="text-red-600 text-sm mt-1">{extensionError}</p>}
              {preview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-56 object-cover rounded-xl border border-gray-300 shadow-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-white/80 rounded-xl text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              {formError.category && (
                <p className="text-red-600 text-sm mt-1">{formError.category}</p>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col h-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="14"
              placeholder="Write your blog content here..."
              className="w-full h-full resize-none px-6 py-4 bg-white/80 rounded-xl text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black shadow-sm"
            />
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-10 flex justify-end">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isDisable}
            className="px-6 py-3 text-sm font-semibold bg-black text-white rounded-full hover:bg-gray-900 transition shadow-md disabled:opacity-50"
          >
            {loading ? "⏳ Publishing..." : "🚀 Publish Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
