import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch category by ID
    // Example:
    // fetch(`/api/categories/${id}`).then(res => res.json()).then(data => {
    //   setTitle(data.title);
    //   setDescription(data.description);
    // });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Update API call logic here
    console.log({ id, title, description });
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-start justify-center px-4 py-20 font-['Inter']">
      <div className="max-w-lg w-full p-8 rounded-2xl shadow-lg bg-white/40 backdrop-blur-md border border-gray-200">
        <h2 className="text-3xl font-['Playfair_Display'] font-semibold text-center mb-6">
          Update Category
        </h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Category Title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              rows={4}
              placeholder="Brief description"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-gray-900 transition-colors"
          >
            Update
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
