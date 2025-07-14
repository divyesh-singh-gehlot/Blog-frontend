import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance";
import moment from "moment-timezone";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);
  const [recentCategories, setRecentCategories] = useState([]);
  const [fileUrls, setFileUrls] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get("/posts");
        const catRes = await axios.get("/categories");

        const posts = postRes.data.data.posts || [];
        const categories = catRes.data.data.categories || [];

        setRecentPosts(posts.slice(0, 8));
        setRecentCategories(categories.slice(0, 10));

        const urls = {};
        for (const post of posts.slice(0, 8)) {
          const key = post.file?.key;
          if (key) {
            try {
              const res = await axios.get(`/file/signed-url?key=${key}`);
              urls[post._id] = res.data.data.url;
            } catch {
              console.warn(`Could not load image for ${post._id}`);
            }
          }
        }
        setFileUrls(urls);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#f9f9f9] font-sans text-gray-800">
  {/* Hero Section */}
  <motion.section
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    className="min-h-screen bg-[#f9f9f9] flex items-center justify-center px-4 sm:px-6 lg:px-20"
  >
    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* Left Text Section */}
      <div className="text-left space-y-6">
        <p className="text-sm tracking-widest text-gray-500 uppercase">Discover</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
          Welcome to <br className="hidden sm:inline" /> Notionary
        </h1>
        <p className="text-gray-600 text-lg max-w-md">
          Dive into a world of curated stories, reflections, and fresh ideas from a passionate creative community.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("posts")}
          className="mt-4 inline-block px-6 py-3 bg-black text-white text-sm font-semibold rounded-full shadow hover:shadow-xl transition-all"
        >
          Browse Posts
        </motion.button>
      </div>

      {/* Right Accent Column */}
      <div className="hidden lg:flex gap-10 flex-col items-end text-right space-y-6">
        <div className="border-l-2 border-gray-300 pl-6">
          <p className="uppercase text-xs text-gray-400 tracking-widest mb-1">Inspiration</p>
          <h2 className="text-2xl font-serif font-semibold text-gray-800 leading-snug">
            Read. Reflect. <br /> Reimagine.
          </h2>
        </div>
        <div className="text-sm text-gray-400 rotate-90 writing-mode-vertical-lr">
          Scroll →
        </div>
      </div>
    </div>
  </motion.section>

  {/* Main Content Section */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-6 lg:px-12 py-12">
    {/* Posts Section */}
    <div className="lg:col-span-9 space-y-8">
      {/* Responsive Heading */}
      <motion.h2
        className="text-2xl sm:text-3xl font-bold font-serif text-gray-900"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Recent Posts
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentPosts.map((post, i) => {
          const isMiddle = i % 3 === 1;
          const offsetClass = isMiddle ? "lg:mt-16" : "mt-0";

          return (
            <motion.div
              key={post._id}
              variants={fadeInUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => navigate(`/posts/post-detail/${post._id}`)}
              className={`relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group ${offsetClass}`}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={fileUrls[post._id] || "/fallback.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between h-[220px]">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-semibold uppercase">
                    {post.updatedby?.name?.[0] || "U"}
                  </div>
                  <div>
                    <p className="text-gray-700 text-sm font-medium">
                      {post.updatedby?.name || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-500">
                      Updated: {moment(post.updatedAt).tz("Asia/Kolkata").format("DD MMM YYYY, hh:mm A")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* Sidebar */}
    <div className="lg:col-span-3 space-y-8">
      {/* Categories */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold font-serif mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {recentCategories.map((cat) => (
            <span
              key={cat._id}
              onClick={() => navigate(`/posts?category=${cat._id}`)}
              className="bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-300 cursor-pointer"
            >
              {cat.title}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Top Contributors */}
      <motion.div
        className="bg-white p-6 rounded-2xl shadow"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-xl font-bold font-serif mb-4">Top Contributors</h2>
        <ul className="space-y-4">
          <li className="text-sm text-gray-500">Coming soon...</li>
        </ul>
      </motion.div>
    </div>
  </div>
</div>

  );
};

export default Home;
