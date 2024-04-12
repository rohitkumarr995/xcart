import React, { useEffect, useRef, useState } from "react";
import "../styles/Navbar.css";
import "../media/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ChildNavbar from "./ChildNavbar";
import axios from "axios";
import { Menu } from "lucide-react";
import { BASE_URI } from "../utils/Constants.js";
import {useSelector} from 'react-redux'

function Navbar() {
  const [isUserHandlesActive, setUserHandlesActive] = useState(false);
  const [person, setPerson] = useState();
  const [fullname, setFullname] = useState();
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = useSelector(state=>state.cart)

  useEffect(() => {
    if (isLoggedOut == true) {
      window.location.reload();
    }
  }, [isLoggedOut]);

  useEffect(() => {
    if (localStorage.getItem("accessToken") && window.location.href!="/ind/home/user/login") {
      try {
        const getUserProduct = async () => {
          const response = await axios.post(
            `${BASE_URI}/api/v1/users/get/user`,
            {
              clientAccesssToken: localStorage.getItem("accessToken"),
            }
          );
          const data = await response?.data;
          setFullname(data.user.fullname.toCapitalize());
        };
        getUserProduct();
      } catch (error) {
        console.log("Error occured while fetching data",error);
      }
    } 
    else if (!localStorage.getItem("accessToken")) {
      setFullname("user".toCapitalize());
    }

    if (
      !localStorage.getItem("accessToken") &&
      location.search.includes("?collection")
    ) {
      navigate(`/ind/home/user/login`);
    }
  }, [window.location.href]);

  const cartIcon = <FontAwesomeIcon icon={faShoppingCart} size="3x" />;
  const userIcon = <FontAwesomeIcon icon={faUser} size="2x" />;

  const handleUserMouseOver = () => {
    setUserHandlesActive(true);
  };

  const handleUserMouseLeave = () => {
    setUserHandlesActive(false);
  };

  const handleLogo = () => {
    navigate("/ind/home");
  };

  const handleSignUp = () => {
    navigate("/ind/home/user/register");
  };

  const handleSignIn = () => {
    navigate("/ind/home/user/login");
  };

  const handleSignOut = async () => {
    localStorage.removeItem("accessToken");
    setIsLoggedOut(true);
  };

  const handleChildNavbar = (flag) => {
    setIsMouseOver(flag);
  };

  String.prototype.toCapitalize = function () {
    if (this.includes(" ")) {
      const nameArray = this.split(" ");
      const firstName =
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[0].substring(1, nameArray[0].length);
      const lastName =
        nameArray[1].charAt(0).toUpperCase() +
        nameArray[1].substring(1, nameArray[0].length);
      return firstName + " " + lastName;
    } else {
      return this.charAt(0).toUpperCase() + this.substring(1, this.length);
    }
  };

  const toggleNavbar = () => {
    toggle === false ? setToggle(true) : setToggle(false);
    console.log(toggle);
  };

  return (
    <>
      <nav>
        <div className={toggle === false ? `navbar-left` : `navbar-left-active`}>
          <div>
            <NavLink to={'/ind/product/men/watches'}>WATCHES</NavLink>
          </div>
          <div>
            <NavLink to={'/ind/product/men/sunglasses'}>SUNGLASSES</NavLink>
          </div>
          <div>
            <NavLink to={'/ind/product/men/bracelets'}>BRACELETS</NavLink>
          </div>
          <div>
            <NavLink to={'/ind/product/men/necklaces'}>NECKLACES</NavLink>
          </div>
          <div>
            <NavLink to={'/ind/product/men/shoes'}>SHOES</NavLink>
          </div>
        </div>
        
        <div className="navbar-center">
          <div className="menu-btn-container" onClick={toggleNavbar}>
            <Menu size={30} />
          </div>
          <div>
            <a className="logo" onClick={handleLogo}>
              <sup>X</sup>CART
            </a>
          </div>
        </div>
        <div className="navbar-right">
          <div
            className="user-profile-container"
            onMouseEnter={handleUserMouseOver}
            onMouseLeave={handleUserMouseLeave}
          >
            <div className="nav-user-profile-info">
              <div className="nav-profile-icon">
                <a>{userIcon}</a>
              </div>
              <div className="nav-profile-name-container">
                <div className="greeting">Hello</div>
                <div className="nav-profile-name">{fullname}</div>
              </div>
            </div>

            <div
              className="user-handle-primary"
              style={
                isUserHandlesActive === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <div
                className={`user-auth-handle ${
                  fullname !== "User"
                    ? "unauthentication-user-handle-primary"
                    : null
                }`}
              >
                {fullname === "User" ? (
                  <>
                    <div
                      className="signin-link auth-layout"
                      id="signin"
                      onClick={handleSignIn}
                    >
                      <div id="handle-sign-in">Sign In</div>
                    </div>
                    <div className="signup-link" onClick={handleSignUp}>
                      <div id="handle-sign-up">Sign Up</div>
                    </div>
                  </>
                ) : (
                  <div className="signout-link auth-layout">
                    <div id="handle-sign-out" onClick={handleSignOut}>
                      Sign Out
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="cart-container" onClick={() => navigate("/ind/product/itemcart")}>
            <div>
              <div className="cart-icon">{cartIcon}
                <div className="cart-item-count">{cartItems.length}</div>
              </div>
             
            </div>
            
          </div>
        </div>
      </nav>

      {isMouseOver === true ? (
        <ChildNavbar person={person} handleChildNavbar={handleChildNavbar} />
      ) : null}
    </>
  );
}

export default Navbar;
