import { useLocation, useNavigate } from "react-router-dom";
import { productData, genderData, categoryrData } from "./ProductSection.js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  colorSearchParamData,
  maxPriceSearchParamData,
  minPriceSearchParamData,
} from "./Products.js";
import NewArrival from "./NewArrival.js";
import NoItem from "./NoItem.js";
import { Menu } from "lucide-react";
import { BASE_URI } from "../utils/Constants.js";

export const FilterBasedOnPrice = () => {
  const products = useContext(productData);
  const gender = useContext(genderData);
  const category = useContext(categoryrData);

  const [filteredProduct, setFilteredProduct] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [toggle, setToggle] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const minPrice = useContext(minPriceSearchParamData);
  const maxPrice = useContext(maxPriceSearchParamData);
  const color = useContext(colorSearchParamData);

  useEffect(() => {
    let isMounted = true; 
  
    const getFilteredProduct = async () => {
      try {
        let response;
        if (location.search.includes("color")) {
          response = await axios.get(
            `${BASE_URI}/api/v1/products/search/filter/color/${category}?color=${color}`
          );
        } else {
          response = await axios.get(
            `${BASE_URI}/api/v1/products/search/filter/${category}?minPrice=${minPrice}&maxPrice=${maxPrice}`
          );
        }
  
        if (isMounted) {
          const data = response.data;
          setFilteredProduct(data[`${category}`]);
        }
      } catch (error) {
        console.log("Error caught while fetching the data from endpoint:", error);
      }
    };
  
    getFilteredProduct(); 
  
    return () => {
      isMounted = false; 
    };
  }, [minPrice, maxPrice, location.search]); 


  const handleProductNavigation = (collection, id) => {
    navigate(`${location.pathname}/search?collection=${collection}&id=${id}`);
  };

  const displaySidebar = ()=>{
    toggle === false ? setToggle(true) : setToggle(false)
  }

  return (
    <>
      <div className="filtered-product-main-section">
        <div className="subnav-main-section">
          <div className="subnav-sub-container">
            <div className="main-search-box">
              <input
                type="text"
                value={searchText}
                className="product-search-text-box"
                placeholder="Search Product.."
                onChange={(event) => setSearchText(event.target.value)}
              />
            </div>
            <div className="product-sectionmenu-btn-container" onClick={displaySidebar}>
              <Menu size={50} />
            </div>
          </div>
          
        </div>

        {location.search.includes("?minPrice") == true ||
        location.search.includes("?color") == true ? (
          <div className="products-container">
            {filteredProduct.filter((product) => product.gender === gender)
              .length == 0 ? (
              <NoItem />
            ) : (
              filteredProduct
                .filter((product) => product.collection.includes(searchText))
                .filter((product) => product.gender === gender)
                .map((product) => {
                  return (
                    <div
                      className="product-card"
                      key={product._id}
                      onClick={() =>
                        handleProductNavigation(product.collection, product._id)
                      }
                    >
                      <div className="product-image">
                        <img
                          src={product.imgUrl}
                          alt={product.collection}
                          loading="lazy"
                          id="pr-image"
                        />
                      </div>
                      <div className="product-collection">
                        {product.collection}
                      </div>
                      <div className="product-price">{product.price} USD</div>
                      <div className="product-ratings">{product.ratings}</div>
                    </div>
                  );
                })
            )}
          </div>
        ) : (
          <div className="products-container">
            {products
              .filter((product) => product.collection.includes(searchText))
              .filter((product) => product.gender === gender)
              .map((product) => {
                return (
                  <div
                    className="product-card"
                    key={product._id}
                    onClick={() =>
                      handleProductNavigation(product.collection, product._id)
                    }
                  >
                    <div className="product-image">
                      <img
                        src={product.imgUrl}
                        alt={product.collection}
                        loading="lazy"
                        id="pr-image"
                      />
                    </div>
                    <div className="product-collection">
                      {product.collection}
                    </div>
                    <div className="product-price">{product.price} USD</div>
                    <div className="product-ratings">{product.ratings}</div>
                  </div>
                );
              })}
          </div>
        )}
        {category === "shoes" ? <NewArrival /> : null}
      </div>
    </>
  );
};
