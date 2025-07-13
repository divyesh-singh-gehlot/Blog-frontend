import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import moment from "moment-timezone";
import { motion, AnimatePresence } from "framer-motion";

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/posts?q=${searchValue}`);
      setPosts(res.data.data.posts || []);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [searchValue]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] px-4 py-6 flex flex-col items-center">
      {/* Controls */}
      <div className="w-full max-w-6xl mb-8 flex flex-col sm:flex-row justify-between gap-4">
        <button
          className="w-full sm:w-auto px-5 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition"
          onClick={() => navigate("new-post")}
        >
          + Add Post
        </button>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Posts */}
      <AnimatePresence>
        <motion.div
          key={searchValue}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {loading ? (
            <div className="col-span-full text-center text-gray-600">Loading...</div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No posts found.</div>
          ) : (posts.map((post) => (
  <motion.div
    key={post._id}
    className="relative bg-white shadow-md rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group h-[420px]"
  >
    {/* Image (static size by default, full size on hover) */}
    <div className="relative h-56 overflow-hidden transition-all duration-500 group-hover:absolute group-hover:inset-0 group-hover:h-full group-hover:z-10">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    {/* Content (only visible when not hovered) */}
    <div className="p-5 flex flex-col justify-between h-[calc(100%-14rem)] transition-opacity duration-500 ease-in-out group-hover:opacity-0">
      <div>
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1">{post.title}</h2>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{post.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-semibold uppercase">
          {post.createdBy?.name?.[0] || "U"}
        </div>
        <div>
          <p className="text-gray-700 text-sm font-medium">
            {post.createdBy?.name || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500">
            Updated: {moment(post.updatedAt).tz("Asia/Kolkata").format("DD MMM YYYY, hh:mm A")}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
)))
          }
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PostList;
