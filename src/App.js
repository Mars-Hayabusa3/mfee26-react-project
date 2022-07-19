import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import BackgroundWaveAnimation from './components/BackgroundWaveAnimation';
import './App.css';

import Cart from './pages/Cart';
import ProductsYu from './pages/Products-Yu/Products-Yu';
import Membercenter from './pages/member/Membercenter';
import Login from './pages/member/Login';
import MemberRegister from './pages/member/MemberRegister';
import MemberHistory from './pages/member/MemberHistory';
import MemberPsdchange from './pages/member/MemberPsdchange';

import AdminLogin from './pages/Admin-Willow/AdminLogin';
import News from './pages/Admin-Willow/News';
import Report from './pages/Admin-Willow/Report';
import PostMessage from './pages/Admin-Willow/PostMessage';
// react router 錄影檔 7/19 14:33
function App() {
  // 設定會員登入狀態 錄影檔 7/19 14:55
  // const [auth, setAuth] = useState(false);

  return (
    <BrowserRouter>
      <Navbar />

      {/* 路由表 */}
      <Routes>
        {/* LoveYu的頁面 */}
        <Route path="ProductsYu" element={<ProductsYu />} />
        <Route path="Cart" element={<Cart />} />

        {/* Yu的頁面 */}
        <Route path="Login" element={<Login />} />
        <Route path="Membercenter" element={<Membercenter />} />
        <Route path="MemberRegister" element={<MemberRegister />} />
        <Route path="MemberHistory" element={<MemberHistory />} />
        <Route path="MemberPsdchange" element={<MemberPsdchange />} />

        {/* willow的頁面 */}
        <Route path="AdminLogin" element={<AdminLogin />} />
        <Route path="News" element={<News />} />
        <Route path="Report" element={<Report />} />
        <Route path="PostMessage" element={<PostMessage />} />
      </Routes>

      <Footer />
      <BackgroundWaveAnimation />
    </BrowserRouter>
  );
}

export default App;
