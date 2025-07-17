import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../utils/axiosInstance";
import moment from "moment-timezone";
import { FaCalendarAlt, FaUserEdit, FaPlus } from "react-icons/fa";
import ImageWithFallback from "../components/ImageWithFallback";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [fileUrls, setFileUrls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await axios.get("/auth/current-user");
        const postsRes = await axios.get("/posts?size=1000");

        console.log(postsRes);

        const currentUser = userRes.data.data.user || {};
        const allPosts = postsRes.data.data.posts || [];

        const postsByUser = allPosts.filter((post) => {
          const currentUserId = currentUser._id;

          const updatedById =
            typeof post.updatedby === "object" ? post.updatedby?._id : post.updatedby;

          return (
            updatedById === currentUserId
          );
        });

        setUser(currentUser);
        setUserPosts(postsByUser);

        console.log(userPosts);

        const urls = {};
        for (const post of postsByUser.slice(0, 8)) {
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
        console.error("Error fetching profile data:", err);
      }
    };

    fetchProfileData();
  }, []);

  if (!user) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-[#f3f4f6] to-[#fff] min-h-screen py-12 px-6 lg:px-20 font-sans text-gray-800">
      {/* Profile Header */}
      <motion.div
        className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* User Info */}
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-400 text-white flex items-center justify-center text-lg sm:text-xl font-semibold uppercase">
            {(user?.name || "U").charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {user.name}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">{user.email}</p>

            {/* Verified Badge */}
            {user.isVerified && (
              <span className="inline-block mt-1 px-3 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                ✅ Verified
              </span>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
              <span className="flex items-center gap-1">
                <FaCalendarAlt className="text-green-500" />
                Joined: {moment(user.createdAt).format("MMM YYYY")}
              </span>
            </div>
            <p className="text-sm mt-1 text-gray-400">
              Total Posts:{" "}
              <span className="font-semibold text-gray-700">{userPosts.length}</span>
            </p>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 items-center">
          <button
            onClick={() => navigate("/update-profile")}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-lg shadow transition"
          >
            <FaUserEdit className="text-sm" />
            <span>Update</span>
          </button>
          <button
            onClick={() => navigate("/posts/new-post")}
            className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1.5 rounded-lg shadow transition"
          >
            <FaPlus className="text-sm" />
            <span>Post</span>
          </button>
        </div>

      </motion.div>


      {/* Posts Section */}
      <div className="mt-12">
        <motion.h2
          className="text-2xl font-bold text-gray-900 mb-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          My Posts
        </motion.h2>

        {userPosts.length === 0 ? (
          <p className="text-gray-500">You haven’t posted anything yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userPosts.map((post, i) => (
              <motion.div
                key={post._id}
                variants={fadeInUp}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                onClick={() => navigate(`/posts/post-detail/${post._id}`)}
                className="cursor-pointer group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                      src={fileUrls[post._id]}
                      alt={post.title}
                      className="w-full h-full group-hover:scale-105"
                    />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {post.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Updated:{" "}
                    {moment(post.updatedAt)
                      .tz("Asia/Kolkata")
                      .format("DD MMM YYYY, hh:mm A")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
