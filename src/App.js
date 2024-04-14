import React from "react";
import { Notifications } from 'react-push-notification';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/ProtectedRoute";
import Basket from "./pages/Basket";
import Error404 from "./pages/Error404";
import Admin from "./pages/Admin";
import AdminHome from "./pages/Admin/AdminHome";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminProducts from "./pages/Admin/AdminProducts";
import AdminProductDetail from "./pages/Admin/AdminProductDetail";
import NewProduct from "./pages/Admin/AdminProducts/NewProduct";
import SigninToOrder from "./pages/Auth/Signin/indexToOrder";
import Footer from "./components/Footer";
import "./App.css";
import History from "./pages/History";
import { Button } from "antd";


function App() {

 
  return (
    <Router>
      <div id="app">
        <Notifications/>
        <Navbar />
       

        <div className="content" >
          <Routes>
            <Route path="/" exact element={<Basket />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signintoorder" element={<SigninToOrder />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/basket" element={<Basket />} />
            <Route path="/history" element={<History />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} admin={true}>
                <Route exact path="home" element={<AdminHome />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="/admin/products/new" element={<NewProduct />} />
                <Route
                  path="/admin/products/:product_id"
                  element={<AdminProductDetail />}
                />
              </Route>
            </Route>

            <Route path="*" element={<Error404 />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;