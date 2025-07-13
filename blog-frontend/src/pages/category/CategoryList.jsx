import moment from "moment-timezone";
import axios from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import DeleteModal from "../../components/modal/DeleteModal";

const CategoryList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/categories?q=${searchValue}&page=${currentPage}`);
        const data = response.data.data;
        setCategories(data.categories);
        setTotalPage(data.pages);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Failed to fetch categories", {
          position: "top-right",
          autoClose: true
        });
      }
    };
    getCategories();
  }, [currentPage, searchValue]);

  useEffect(() => {
    let tempPageCount = [];
    for (let i = 1; i <= totalPage; i++) {
      tempPageCount.push(i);
    }
    setPageCount(tempPageCount);
  }, [totalPage]);

  const handlePrev = () => setCurrentPage((prev) => prev - 1);
  const handleNext = () => setCurrentPage((prev) => prev + 1);
  const handlePage = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteClick = (id) => {
    setCategoryToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/categories/${categoryToDelete}`);
      toast.success("Category deleted successfully!");
      closeDeleteModal();
      const response = await axios.get(`/categories?q=${searchValue}&page=${currentPage}`);
      const data = response.data.data;
      setCategories(data.categories);
      setTotalPage(data.pages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-6 text-black">
      {/* Top Controls */}
      <div className="w-full max-w-6xl mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          className="px-5 py-3 bg-black text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition"
          onClick={() => navigate("new-category")}
        >
          + Add Category
        </button>
        <input
          type="text"
          placeholder="Search categories..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <AnimatePresence mode="wait">
  <motion.div
    key={currentPage}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    {loading ? (
      <div className="col-span-full text-center py-6 text-gray-600 text-lg">Loading...</div>
    ) : (
      categories.map((category) => (
        <div
          key={category._id}
          className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all"
        >
          {/* Title & CreatedBy */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white uppercase">
              {(category.updatedBy?.name || "U").slice(0, 1)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 leading-tight line-clamp-1">{category.title}</h3>
              <p className="text-xs text-gray-500">By {category.updatedBy?.name || "Unknown"}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{category.description}</p>

          {/* Dates Section */}
          <div className="text-xs text-gray-500 mb-4 space-y-1 border-t pt-3 border-gray-300">
            <div className="flex justify-between">
              <span className="font-medium">Created</span>
              <span>{moment(category.createdAt).tz("Asia/Kolkata").format("DD/MMM/YYYY, HH:mm")}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Updated</span>
              <span>{moment(category.updatedAt).tz("Asia/Kolkata").format("DD/MMM/YYYY, HH:mm")}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold hover:bg-yellow-200 transition"
              onClick={() => navigate(`update-category/${category._id}`)}
            >
              ✏️ Update
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-600 text-xs font-semibold hover:bg-red-200 transition"
              onClick={() => handleDeleteClick(category._id)}
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))
    )}
  </motion.div>
</AnimatePresence>


      {/* Pagination */}
      {pageCount.length > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:bg-gray-400"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {pageCount.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`px-4 py-2 text-sm rounded-lg transition ${
                currentPage === pageNumber
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handlePage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}
          <button
            className="px-4 py-2 bg-black text-white rounded-lg text-sm disabled:bg-gray-400"
            onClick={handleNext}
            disabled={currentPage === totalPage}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Category?"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
};

export default CategoryList;
