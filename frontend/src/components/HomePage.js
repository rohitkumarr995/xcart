import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import '../media/Home.css'
import MenProducts from "./MenProducts";
import WomenProducts from "./WomenProducts";
import ShoeCollections from "./ShoeCollections";
import Navbar from "./Navbar";

function HomePage() {
  const [isMenCategoryActive, setMenCategoryActive] = useState(true);
  const [isWomenCategoryActive, setWomenCategoryActive] = useState(false);

  useEffect(()=>{
    window.scrollTo(0,0)
    document.title="XCart"
  },[])

  const changeLandingPageMenProductcategory = () => {
    setMenCategoryActive(true);
    setWomenCategoryActive(false);
  };
  
  const changeLandingPageWomenProductcategory = () => {
    setMenCategoryActive(false);
    setWomenCategoryActive(true);
  };

  const goToCollection =()=>{
    window.scrollTo(0,500)
  }

  return (
    <>
    <Navbar/>
      <section className="home-section">
        <div className="banner-top">
          <img
            src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1711047567/cwbmrj4vpwkt3bsqqmlc.webp"
            loading="lazy"
            alt="home-banner"
            className="img-banner-top"
            onClick={goToCollection}
          />
        </div>

        {/* title section */}
        <div className="center-title">
          <div className="title">Shop By Categories</div>
          <div className="category">
            <div
              className="men-category category-style"
              style={
                isMenCategoryActive === true
                  ? { color: "black", fontWeight: "bold", borderBottom:'0.2rem solid black' }
                  : { color: "grey", textDecoration: "none" }
              }
              onClick={changeLandingPageMenProductcategory}
            >
              {" "}
              MENS
            </div>
            <div
              className="women-category category-style"
              style={
                isWomenCategoryActive === true
                  ? { color: "black", fontWeight: "bold", borderBottom:'0.2rem solid black' }
                  : { color: "grey" }
              }
              onClick={changeLandingPageWomenProductcategory}
            >
              WOMENS
            </div>
          </div>
        </div>

        {isMenCategoryActive === true ? <MenProducts /> : <WomenProducts />}

        <ShoeCollections/>
        
      </section>
     
    </>
  );
}

export default HomePage;
