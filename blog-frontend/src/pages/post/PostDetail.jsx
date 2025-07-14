import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteModal from "../../components/modal/DeleteModal";


const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [fileUrl, setFileUrl] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id: postId } = useParams();

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;
          setPost(data.post);
          
        } catch (error) {
          toast.error(error?.response?.data?.message || "Failed to fetch post", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    if (post?.file) {
      const getFile = async () => {
        try {
          const response = await axios.get(`/file/signed-url?key=${post.file.key}`);
          setFileUrl(response.data.data.url);
        } catch (error) {
          toast.error(error?.response?.data?.message || "Failed to fetch file", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      };

      getFile();
    }
  }, [post]);


  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/posts/${postId}`);
      toast.success(response.data.message || "Post deleted", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/posts");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-6 flex flex-col items-center">
      {/* Action Buttons */}
      <div className="flex gap-4 mb-8 w-full max-w-4xl justify-start">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
        >
          ← Go Back
        </button>
        <button
          onClick={() => navigate(`/posts/update-post/${postId}`)}
          className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 text-sm font-medium transition"
        >
          ✏️ Update
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 text-sm font-medium transition"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Blog Container */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-3xl p-6 border border-gray-200">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{post?.title}</h1>

        {/* Category */}
        <p className="text-sm text-gray-500 mb-4">Category: {post?.category?.title}</p>

        {/* Author + Time */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center font-semibold uppercase">
            {(post?.updatedby?.name || "U").charAt(0)}
          </div>
          <div className="text-sm text-gray-600">
            <p>By <span className="font-medium">{post?.updatedby?.name || "Unknown"}</span></p>
            <p className="text-xs">
              Updated: {moment(post?.updatedAt).format("DD MMM YYYY, HH:mm")}
            </p>
          </div>
        </div>

        {/* Image */}
        {fileUrl && (
          <img
            src={fileUrl}
            alt={post?.title}
            className="rounded-xl mb-6 max-h-[500px] w-full object-cover"
          />
        )}

        {/* Description */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <p>{post?.description}</p>
        </div>
      </div>

      {/* Footer Ending */}
      <div className="mt-16 text-center text-sm text-gray-500">
        — End of Blog —
      </div>

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title="Delete Post?"
        message="Are you sure you want to delete this post? This action cannot be undone."
      />
    </div>
  );
};

export default PostDetail;
