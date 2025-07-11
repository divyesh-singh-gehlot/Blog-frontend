import moment from "moment-timezone";
import axios from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);


  useEffect(() => {

    const getCategories = async () => {
      try {

        setLoading(true);

        const response = await axios.get("/categories");
        const data = response.data.data
        setCategories(data.categories);

        console.log(data);

        setLoading(false);

      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;

        console.log(data);

        toast.error(data.message, {
          position: "top-right",
          autoClose: true
        })
      }
    }

    getCategories();
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ece9e6] to-[#ffffff] flex items-start justify-center p-4">
      <div className="w-full max-w-6xl backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-serif font-bold text-center mb-6 text-gray-800">📂 Category List</h1>

        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition" onClick={() => navigate("new-category")}>+ Add New Category</button>
          <input
            type="text"
            placeholder="Search here..."
            className="border border-gray-300 px-3 py-2 rounded-lg bg-white/60 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="overflow-x-auto rounded-xl">
          {loading ? (<div className="flex items-center justify-center gap-2">
            <p>Loading...</p>
          </div>) : (<table className="w-full text-sm text-left text-gray-700">
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
                  <td className="px-6 py-4">{moment(category.createdAt).tz("Asia/Kolkata").format("DD/MMM/YYYY, HH:mm:ss")}</td>
                  <td className="px-6 py-4">{moment(category.updatedAt).tz("Asia/Kolkata").format("DD/MMM/YYYY, HH:mm:ss")}</td>
                  <td className="px-6 py-4 flex justify-end gap-3">
                    <button className="px-3 py-1 bg-yellow-400 text-white rounded-md text-xs hover:bg-yellow-500 transition" onClick={() => navigate("update-category")}>Update</button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md text-xs hover:bg-red-600 transition">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>)}

        </div>
      </div>
    </div>
  );
};

export default CategoryList;