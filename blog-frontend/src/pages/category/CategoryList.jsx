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
        const data = response.data.data
        setCategories(data.categories);
        setTotalPage(data.pages);

        setLoading(false);

      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        toast.error(data.message, {
          position: "top-right",
          autoClose: true
        })
      }
    }

    getCategories();
  }, [currentPage])

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage, searchValue]);

  const handlePrev = () => {
    setCurrentPage((prev) => prev - 1);
  }

  const handlePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  }

  const handleSearch = async (e) => {
    try {
      const input = e.target.value;
      setSearchValue(input);
      setCurrentPage(1);

      const response = await axios.get(`/categories?q=${input}&page=${currentPage}`);
      const data = response.data.data;

      setCategories(data.categories);
      setTotalPage(data.pages);

    } catch (error) {
      const response = error.response;
      const data = response.data;

      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: true,
      });
    }
  }

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

      // Refetch the list
      const response = await axios.get(`/categories?q=${searchValue}&page=${currentPage}`);
      const data = response.data.data;
      setCategories(data.categories);
      setTotalPage(data.pages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete category.");
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ece9e6] to-[#ffffff] flex items-start justify-center p-4">
      <div className="w-full max-w-6xl backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-serif font-bold text-center mb-6 text-gray-800">📂 Category List</h1>

        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition hover:cursor-pointer" onClick={() => navigate("new-category")}>+ Add New Category</button>
          <input
            type="text"
            placeholder="Search here..."
            value={searchValue}
            name="search"
            onChange={handleSearch}
            className="border border-gray-300 px-3 py-2 rounded-lg bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.table
            key={currentPage}
            className="w-full text-sm text-left text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center py-4">Loading...</td>
                </tr>
              </tbody>
            ) : (
              <>
                <thead className="bg-white/30 border-b border-gray-300 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Title</th>
                    <th className="px-6 py-3 font-semibold">Description</th>
                    <th className="px-6 py-3 font-semibold">Created At</th>
                    <th className="px-6 py-3 font-semibold">Updated At</th>
                    <th className="px-6 py-3 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white/40 backdrop-blur-sm">
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="even:bg-white/60 hover:bg-white/80 transition-all"
                    >
                      <td className="px-6 py-4">{category.title}</td>
                      <td className="px-6 py-4">{category.description}</td>
                      <td className="px-6 py-4">
                        {moment(category.createdAt).tz("Asia/Kolkata").format("DD/MMM/YYYY, HH:mm:ss")}
                      </td>
                      <td className="px-6 py-4">
                        {moment(category.updatedAt).tz("Asia/Kolkata").format("DD/MMM/YYYY, HH:mm:ss")}
                      </td>
                      <td className="px-6 py-4 flex justify-end gap-3">
                        <button
                          className="px-3 py-1 bg-yellow-400 text-white rounded-md text-xs hover:bg-yellow-500 transition hover:cursor-pointer"
                          onClick={() => navigate(`update-category/${category._id}`)}
                        >
                          Update
                        </button>
                        <button className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition hover:cursor-pointer" onClick={() => handleDeleteClick(category._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </motion.table>
        </AnimatePresence>




        {pageCount.length > 0 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className="px-4 py-2 hover:cursor-pointer bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition shadow disabled:bg-gray-500 disabled:cursor-default"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {pageCount.map((pageNumber, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg text-sm backdrop-blur-md shadow transition-all duration-300 hover:cursor-pointer
      ${currentPage === pageNumber
                    ? "bg-black text-white"
                    : "bg-white/60 text-gray-800 hover:bg-white/80"}
    `}
                onClick={() => handlePage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              className="px-4 py-2 hover:cursor-pointer bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition shadow disabled:bg-gray-500 disabled:cursor-default"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
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