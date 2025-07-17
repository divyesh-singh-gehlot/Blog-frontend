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
import NewCategory from "./pages/category/NewCategory"
import UpdateCategory from "./pages/category/UpdateCategory"
import NewPost from "./pages/post/NewPost"
import PostDetail from "./pages/post/PostDetail"
import UpdatePost from "./pages/post/UpdatePost"
import UpdateProfile from "./pages/UpdateProfile"
import VerifyUser from "./pages/VerifyUser"
import ForgotPassword from "./pages/ForgotPassword"
import Tos from "./pages/Tos"
import PrivacyPolicy from "./pages/PrivacyPolicy"



function App() {
  return (
    <>
    <Routes>

      {/* Private Routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="posts" element={<PostList />} />
        <Route path="posts/new-post" element={<NewPost />} />
        <Route path="posts/post-detail/:id" element={<PostDetail />} />
        <Route path="posts/update-post/:id" element={<UpdatePost />} />
        
        <Route path="categories" element={<CategoryList />} />
        <Route path="categories/new-category" element={<NewCategory />} />
        <Route path="categories/update-category/:id" element={<UpdateCategory />} />
        
        <Route path="profile" element={<Profile />} />
        <Route path="update-profile" element={<UpdateProfile />} />
        <Route path="setting" element={<Setting />} />
        <Route path="verify-user" element={<VerifyUser />} />

        <Route path="terms" element={<Tos />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
    </Routes>

    <ToastContainer />
    </>
  )
}

export default App
