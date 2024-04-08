import React from "react";
import { useNavigate } from "react-router-dom";

function WomenProducts() {

  const navigate = useNavigate()

  const handleProductNavigation = (category)=>{
    navigate(`/ind/product/${category}`)
  }

  return (
    <>
      <div className="image-container">
        <div className="top-layout-image">
          <div className="img1 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1710068628/gztscfjsokpzbd3qjav7.png"
              loading="lazy"
              id="img1"
              alt="women watch collection"
            />
            <div className="image-text1">
              <div className="category-name">Watches</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('women/watches')}>Shop All</div>
            </div>
          </div>

          <div className="img2 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1710068631/r4o8d9lgwk5frukxxujc.png"
              loading="lazy"
              id="img2"
              alt="women sumglasses collection"
            />
            <div className="image-text2">
              <div className="category-name">Sunglasses</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('women/sunglasses')}>Shop All</div>
            </div>
          </div>
        </div>
        <div className="bottom-layout-image">
          <div className="img3 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1710068625/f5fsoredvlz0nimwlfc2.jpg"
              loading="lazy"
              id="img3"
              alt="women bracelets collection"
            />
            <div className="image-text3">
              <div className="category-name">Bracelets</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('women/bracelets')}>Shop All</div>
            </div>
          </div>

          <div className="img4 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1710068627/gewoifdlg2md1gryljxt.png"
              loading="lazy"
              id="img4"
              alt="women necklaces collection"
            />
            <div className="image-text4">
              <div className="category-name">Necklaces</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('women/necklaces')}>Shop All</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WomenProducts;
