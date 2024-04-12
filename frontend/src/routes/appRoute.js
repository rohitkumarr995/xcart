import React from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader.js";
import Navbar from "../components/Navbar.js";
const LazyStartUp = React.lazy(() => import("../components/Startup.js"));
const LazyHomepage = React.lazy(() => import("../components/HomePage.js"));
const LazyProducts = React.lazy(() => import("../components/Products.js"));
const LazyProduct = React.lazy(() => import("../components/Product.js"));
const LazyItemCart = React.lazy(() => import("../components/ItemCart.js"));
const LazyChecckout = React.lazy(() => import("../components/Checkout.js"));
const LazyOrderSuccess = React.lazy(() => import("../components/OrderSuccess.js"));
const LazyNoMatch = React.lazy(() => import("../components/NoMatch.js"));
const LazyUserRegistration = React.lazy(() => import("../components/UserRegister.js"));
const LazyUserLogin = React.lazy(() => import("../components/UserLogin.js"));

function route() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyStartUp />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/home"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyHomepage />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/home/user/register"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyUserRegistration />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/home/user/login"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyUserLogin />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/product/:gender/:productcategory"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyProducts />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/product/:gender/:productcategory/search"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyProduct />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/product/itemcart"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyItemCart />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/product/itemcart/checkout"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyChecckout />
            </React.Suspense>
          }
        />

        <Route
          path="/ind/product/itemcart/checkout/order"
          element={
            <React.Suspense>
              <LazyOrderSuccess />
            </React.Suspense>
          }
        />

        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loader />}>
              <LazyNoMatch />
            </React.Suspense>
          }
        />
      </Routes>
    </>
  );
}

export default route;
