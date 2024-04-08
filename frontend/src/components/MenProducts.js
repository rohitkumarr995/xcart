import React from "react";
import {useNavigate} from 'react-router-dom'

function MenProducts() {
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
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1709910251/xc5dv5dfzb3fxfspfwcp.webp"
              loading="lazy"
              id="img1"
              alt="men watch collection"
            />
            <div className="image-text1">
              <div className="category-name">Watches</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('men/watches')}>Shop All</div>
            </div>
          </div>

          <div className="img2 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1709910347/unyqxiuhojrp48purnub.webp"
              loading="lazy"
              id="img2"
              alt="men sunglasses collection"
            />
            <div className="image-text2">
              <div className="category-name">Sunglasses</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('men/sunglasses')}>Shop All</div>
            </div>
          </div>
        </div>
        <div className="bottom-layout-image">
          <div className="img3 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1709910411/v5leiw1dvnov8uwfppfv.webp"
              loading="lazy"
              id="img3"
              alt="men bracelets collection"
            />
            <div className="image-text3">
              <div className="category-name">Bracelets</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('men/bracelets')}>Shop All</div>
            </div>
          </div>

          <div className="img4 landing-image">
            <img
              src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1709910487/buoxmwq3hxhpydhdyjpo.webp"
              loading="lazy"
              id="img4"
              alt="men necklaces collection"
            />
            <div className="image-text4">
              <div className="category-name">Necklaces</div>
              <div className="shop-link" onClick={()=>handleProductNavigation('men/necklaces')}>Shop All</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenProducts;
