import "react-toastify/ReactToastify.css"
import { ToastContainer } from "react-toastify"

import { Route, Routes } from "react-router-dom"
import PrivateLayout from "./components/layout/PrivateLayout"
import Home from "./pages/Home"
import PostList from "./pages/post/PostList"
import CategoryList from "./pages/category/CategoryList"
import Profile from "./pages/Profile"
import Setting from "./pages/Setting"
import PublicLayout from "./components/layout/PublicLayout"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <>
    <Routes>

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="posts" element={<PostList />} />
        <Route path="category" element={<CategoryList />} />
        <Route path="profile" element={<Profile />} />
        <Route path="setting" element={<Setting />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>

    <ToastContainer />
    </>
  )
}

export default App
