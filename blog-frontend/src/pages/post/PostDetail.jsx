import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);

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

                    setPost(data.post);
                } catch (error) {
                    setLoading(false);
                    const response = error.response;
                    const data = response.data;

                    toast.error(data.message, {
                        position: "top-right",
                        autoClose: 3000
                    })
                }
            };

            getPost();
        }
    }, [postId]);

    useEffect(() => {
        if (post && post?.file) {
            const getFile = async () => {
                try {
                    // api request
                    const response = await axios.get(
                        `/file/signed-url?key=${post.file.key}`
                    );
                    const data = response.data.data;

                    setFileUrl(data.url);
                } catch (error) {
                    const response = error.response;
                    const data = response.data;
                    toast.error(data.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        autoClose: true,
                    });
                }
            };

            getFile();
        }
    }, [post]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/posts/${postId}`);

            setShowModal(false);

            const data = response.data;
            toast.success(data.message || "Post Deleted Successfully", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });

            navigate("/posts");
        } catch (error) {
            setShowModal(false);
            const response = error.response;
            const data = response.data;
            toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <button className="button button-block" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <button
                className="button button-block"
                onClick={() => navigate(`/posts/update-post/${postId}`)}
            >
                Update Post
            </button>
            <button
                className="button button-block"
                onClick={() => setShowModal(true)}
            >
                Delete Post
            </button>
            <div className="detail-container">
                <h2 className="post-title">{post?.title}</h2>
                <h5 className="post-category">Category: {post?.category?.title}</h5>
                <h5 className="post-category">
                    Created at: {moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </h5>
                <h5 className="post-category">
                    Updated at: {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </h5>
                <p className="post-desc">{post?.desc}</p>

                <img src={fileUrl} alt="mern" />
            </div>


        </div>
    );
};

export default PostDetail;