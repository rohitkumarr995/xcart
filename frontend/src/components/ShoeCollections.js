import React from "react";
import "../styles/ShoeCollection.css";
import "../media/ShoeCollection.css";
import { useNavigate } from "react-router-dom";

function ShoeCollections() {

  const navigate = useNavigate()

  const shopShoes = (gender)=>{
    navigate(`/ind/product/${gender}/shoes`)
  }
  return (
    <>
      <seection className="main-show-collection">
        <div className="favourite-title">Our Favourite</div>
        <div className="shoe-banner-01">
          <img
            src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1712210906/vmkavpm9pkcea0oiev99.avif"
            loading="lazy"
            alt="Shoe Banner"
            className="shoe-banner-top"
          />
          <div className="text-overlay">
            <div className="text-overlay-styles">
                <div className="banner-text-para1">Your Escape Artists</div>
                <div className="banner-text-para2">Lightweight and machine washable styles? Yes please.</div>
            </div>
            
            <div className="handle-shoe-category">
                <button className="shop-men-btn1 shop-link-btn" onClick={()=>shopShoes("men")}>SHOP MEN</button>
                <button className="shop-men-btn2 shop-link-btn" onClick={()=>shopShoes("women")}>SHOP WOMEN</button>
            </div>
          </div>
          <div className="text-box-overlay">
            <div className="text-box-overlay-title">FEATURED</div>
            <div className="text-box-overlay-subtitle">
                <div onClick={()=>shopShoes("men")}>Men's Shoes</div>
                <div onClick={()=>shopShoes("women")}>Women's Shoes</div>
                <div>New Arrivals</div>
            </div>           
          </div>
        </div>

        {/* <div className="new-arrival-section">
            <div>
                <div className="new-arrival-title">New Arrivals</div>
                <div className="show-banner-02">
                <img
                src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1709921280/landingPage/jclyybg5xv3nsileinqa.avif"
                loading="lazy"
                alt="Shoe Banner"
                className="shoe-banner-center"
                />
                </div>
                <div className="new-arrival-orange-crush">
                    <div className="orange-crush-title">
                        Orange Crush
                    </div>
                    <div className="orange-crush-description">
                        Part limited-edition color, part mood booster. Available in three styles.
                    </div>
                    <div className="orange-crush-handle-category">
                        <button className="orange-crush-btn1 orange-crush-link-btn">SHOP MEN</button>
                        <button className="orange-crush-btn2 orange-crush-link-btn">SHOP WOMEN</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="show-banner-03">
                    <img
                    src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1710073799/landingPage/k84ps1frruch0kygv4km.avif"
                    loading="lazy"
                    alt="Shoe Banner Lighten Up"
                    className="shoe-banner-bottom"
                    />
                </div>

                <div className="new-arrival-lighten-up">
                    <div className="lighten-up-title">
                        Lighten Up
                    </div>
                    <div className="lighen-up-description">
                        Warmer temps mean new hues in our SuperLight styles.
                    </div>
                    <div className="lighten-up-handle-category">
                        <button className="lighten-up-btn1 lighten-up-link-btn">SHOP MEN</button>
                        <button className="lighten-up-btn2 lighten-up-link-btn">SHOP WOMEN</button>
                    </div>
                </div>
            </div>
        </div> */}
      </seection>
    </>
  );
}

export default ShoeCollections;
