import React, { useState } from "react";
import "../styles/SubNavbar.css";
import { FilterBasedOnPrice } from "./FilteredProduct";

function SubNavbar() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="subnav-main-section">
        <div className="subnav-sub-container">
          <div className="main-search-box">
            <input
              type="text"
              value={search}
              className="product-search-text-box"
              placeholder="Search Product.."
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="toggle-sort"></div>
        </div>
      </div>
{/*    */}
    </>
  );
}

export default SubNavbar;
