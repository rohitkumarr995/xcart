import React, { createContext, useEffect, useRef, useState } from "react";
import "../styles/Sidebar.css";
import "../media/Sidebar.css";

import ProductSection from "./ProductSection.js";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar.js";

export const minPriceSearchParamData = createContext();
export const maxPriceSearchParamData = createContext();
export const colorSearchParamData = createContext();

function Products() {
  const [sidbarToggle, setSidebarToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const priceUnder40ref = useRef();
  const priceBetween40to60ref = useRef();
  const priceBetween60to80ref = useRef();
  const priceAbove80ref = useRef();
  const colorWhiteRef = useRef();
  const colorGreyRef = useRef();
  const colorBlackRef = useRef();
  const colorBlueRef = useRef();
  const colorGreenRef = useRef();
  const colorOrangeRef = useRef();
  const colorSilverRef = useRef();
  const colorGoldRef = useRef();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title="Products Home Page"
    window.scrollTo(0, 0);
  }, []);

  const handleColor = (color) => {
    switch (color) {
      case "White":
        const colorWhite = colorWhiteRef.current.innerText;
        setSearchParams({ color: colorWhite });
        console.log(colorWhite);
        break;
      case "Grey":
        const colorGrey = colorGreyRef.current.innerText;
        setSearchParams({ color: colorGrey });
        console.log(colorGrey);
        break;
      case "Black":
        const colorBlack = colorBlackRef.current.innerText;
        setSearchParams({ color: colorBlack });
        console.log(colorBlack);
        break;
      case "Blue":
        const colorBlue = colorBlueRef.current.innerText;
        setSearchParams({ color: colorBlue });
        console.log(colorBlue);
        break;
      case "Green":
        const colorGreen = colorGreenRef.current.innerText;
        setSearchParams({ color: colorGreen });
        console.log(colorGreen);
        break;
      case "Orange":
        const colorOrange = colorOrangeRef.current.innerText;
        setSearchParams({ color: colorOrange });
        console.log(colorOrange);
        break;
      case "Silver":
        const colorSilver = colorSilverRef.current.innerText;
        setSearchParams({ color: colorSilver });
        console.log(colorSilver);
        break;
      case "Gold":
        const colorGold = colorGoldRef.current.innerText;
        setSearchParams({ color: colorGold });
        console.log(colorGold);
        break;
    }
  };

  const handlePrice = (priceStr) => {
    switch (priceStr) {
      case "Under 40 USD":
        const priceUnder40 = priceUnder40ref.current.innerText;
        const minPriceUnder40 = 0;
        const maxPriceUnder40 = parseInt(priceUnder40.replace(/\D/g, ""));
        setSearchParams({
          minPrice: minPriceUnder40,
          maxPrice: maxPriceUnder40,
        });
        break;
      case "40-60 USD":
        const price40to60 = priceBetween40to60ref.current.innerText;
        const minPrice40to60 = price40to60.split(" ")[0].split("-")[0];
        const maxPrice40to60 = price40to60.split(" ")[0].split("-")[1];
        setSearchParams({ minPrice: minPrice40to60, maxPrice: maxPrice40to60 });
        break;
      case "60-80 USD":
        const price60to80 = priceBetween60to80ref.current.innerText;
        const minPrice60to80 = price60to80.split(" ")[0].split("-")[0];
        const maxPrice60to80 = price60to80.split(" ")[0].split("-")[1];
        setSearchParams({ minPrice: minPrice60to80, maxPrice: maxPrice60to80 });
        break;
      case "Above 80 USD":
        const priceAbove80 = priceAbove80ref.current.innerText;
        const minPriceAbove80 = parseInt(priceAbove80.replace(/\D/g, ""));
        const maxPriceAbove80 = 90;
        setSearchParams({
          minPrice: minPriceAbove80,
          maxPrice: maxPriceAbove80,
        });
        break;
    }
  };

  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const color = searchParams.get("color");

  const displaySidebar = (toggle) => {
    toggle === false ? setSidebarToggle(true) : setSidebarToggle(false);
    console.log("child display sidebar", sidbarToggle);
  };

  return (
    <>
      <Navbar />
      <aside
        className={
          sidbarToggle === false ? `aside-container` : `aside-container-active`
        }
      >
        <div className="main-sidebar-title">Navigation and Search</div>
        <div className="asidebar-quick-links-container">
          <div className="quick-link-title">MEN</div>
          <div className="quick-link-category">
            <div className="men-watches category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/men/watches");
                }}
              >
                Men's Watches
              </a>
            </div>
            <div className="men-sunglasses category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/men/sunglasses");
                }}
              >
                Men's Sunglasses
              </a>
            </div>
            <div className="men-bracelets category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/men/bracelets");
                }}
              >
                Men's Bracelets
              </a>
            </div>
            <div className="men-necklaces category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/men/necklaces");
                }}
              >
                Men's Neclaces
              </a>
            </div>
            <div className="men-shoes category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/men/shoes");
                }}
              >
                Men's Shoes
              </a>
            </div>
          </div>

          <div className="quick-link-title">WOMEN</div>
          <div className="quick-link-category">
            <div className="women-watches category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/women/watches");
                }}
              >
                Women's Watches
              </a>
            </div>
            <div className="women-sunglasses category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/women/sunglasses");
                }}
              >
                Women's Sunglasses
              </a>
            </div>
            <div className="women-bracelets category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/women/bracelets");
                }}
              >
                Women's Bracelets
              </a>
            </div>
            <div className="women-necklaces category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/women/necklaces");
                }}
              >
                Women's Neclaces
              </a>
            </div>
            <div className="women-shoes category-title">
              <a
                onClick={() => {
                  navigate("/ind/product/women/shoes");
                }}
              >
                Women's Shoes
              </a>
            </div>
          </div>
        </div>

        {/* Quick Filters */}

        <div className="quick-filter-container">
          <div className="filter-header">Quick Filters</div>

          <div className="handle-price">
            <div id="heading-price">Price</div>
            <div className="price-range">
              <div
                ref={priceUnder40ref}
                onClick={() => {
                  handlePrice("Under 40 USD");
                }}
              >
                Under 40 USD
              </div>
              <div
                ref={priceBetween40to60ref}
                onClick={() => {
                  handlePrice("40-60 USD");
                }}
              >
                40-60 USD
              </div>
              <div
                ref={priceBetween60to80ref}
                onClick={() => {
                  handlePrice("60-80 USD");
                }}
              >
                60-80 USD
              </div>
              <div
                ref={priceAbove80ref}
                onClick={() => {
                  handlePrice("Above 80 USD");
                }}
              >
                Above 80 USD
              </div>
            </div>
          </div>

          <div className="handle-color">
            <div id="heading-color">Color</div>
            <div className="color-selection">
              <div
                id="color-white"
                ref={colorWhiteRef}
                onClick={() => handleColor("White")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="white"
                  style={{ accentColor: "white" }}
                />
                <label htmlFor="white">White</label>
              </div>
              <div
                id="color-grey"
                ref={colorGreyRef}
                onClick={() => handleColor("Grey")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="grey"
                  style={{ accentColor: "grey" }}
                />
                <label htmlFor="grey">Grey</label>
              </div>
              <div
                id="color-black"
                ref={colorBlackRef}
                onClick={() => handleColor("Black")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="black"
                  style={{ accentColor: "black" }}
                />
                <label htmlFor="black">Black</label>
              </div>
              <div
                id="color-blue"
                ref={colorBlueRef}
                onClick={() => handleColor("Blue")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="blue"
                  style={{ accentColor: "blue" }}
                />
                <label htmlFor="blue">Blue</label>
              </div>
              <div
                id="color-green"
                ref={colorGreenRef}
                onClick={() => handleColor("Green")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="green"
                  style={{ accentColor: "green" }}
                />
                <label htmlFor="green">Green</label>
              </div>
              <div
                id="color-orange"
                ref={colorOrangeRef}
                onClick={() => handleColor("Orange")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="orange"
                  style={{ accentColor: "orange" }}
                />
                <label htmlFor="orange">Orange</label>
              </div>
              <div
                id="color-silver"
                ref={colorSilverRef}
                onClick={() => handleColor("Silver")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="silver"
                  style={{ accentColor: "silver" }}
                />
                <label htmlFor="silver">Silver</label>
              </div>
              <div
                id="color-gold"
                ref={colorGoldRef}
                onClick={() => handleColor("Gold")}
              >
                <input
                  type="radio"
                  name="radiobtn"
                  id="gold"
                  style={{ accentColor: "gold" }}
                />
                <label htmlFor="gold">Gold</label>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <minPriceSearchParamData.Provider value={minPrice}>
        <maxPriceSearchParamData.Provider value={maxPrice}>
          <colorSearchParamData.Provider value={color}>
            <ProductSection displaySidebar={displaySidebar} />
          </colorSearchParamData.Provider>
        </maxPriceSearchParamData.Provider>
      </minPriceSearchParamData.Provider>
    </>
  );
}

export default Products;
