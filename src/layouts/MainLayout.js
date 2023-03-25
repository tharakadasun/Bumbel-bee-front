import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cart from "../components/cart/Cart";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

function MainLayout() {
  const [userLogin , setUserLogin] = useState(false);
  return (
    <>
      <Header userLogin={userLogin} setUserLogin={setUserLogin}/>
      <Cart/>
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
