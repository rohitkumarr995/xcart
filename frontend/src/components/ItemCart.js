import React, { useEffect, useState } from "react";
import "../styles/ItemCart.css";
import "../media/ItemCart.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Star } from "lucide-react";
import { Trash } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import EmptyCart from "./EmptyCart";
import { BASE_URI } from "../utils/Constants";
import {useDispatch, useSelector} from 'react-redux'
import { deleteItem, removeItem } from "../store/cartSlice";

function ItemCart() {
  const navigate = useNavigate();
  const [cartProduct, setCartProduct] = useState([]);

  const dispatch = useDispatch()
  const storeItem = useSelector(state=>state.cart)

  const getUserProduct = async () => {
    const response = await axios.post(
      `${BASE_URI}/api/v1/users/get/user`,
      {
        clientAccesssToken: localStorage.getItem("accessToken"),
      }
    );
    const data = await response?.data;
    setCartProduct(data.user.cart);
  };

  useEffect(() => {
    document.title="Products Drilldown"
    if (!localStorage.getItem("accessToken")) {
      navigate("/ind/home/user/login");
    } else {
      try {
        getUserProduct();
      } catch (error) {
        console.log("Error occured while fetching data",error);
      }
    }

    const handleBeforeUnload = (event) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const removeProductFromCart = async (productId) => {
    const response = await axios.post(
      `${BASE_URI}/api/v1/users/remove/product/cart`,
      {
        clientAccesssToken: localStorage.getItem("accessToken"),
        productId: productId,
      }
    );
    const data = await response.data.user;
    setCartProduct(data);
    getUserProduct();
    dispatch(deleteItem(productId))
  };

  const clearCart = async () => {
    const response = await axios.put(
      `${BASE_URI}/api/v1/users/clear/cart`,
      {  
        clientAccesssToken: localStorage.getItem("accessToken"),
      }
    );

    const data = await response.data.user.cart;
    setCartProduct(data);
    getUserProduct();
    dispatch(removeItem())
  };

  const cartSubtotal = cartProduct
    .map((cart) => cart.subtotal)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const shipping = cartSubtotal < 500 ? 75 : 0;

  const totalAmount = cartSubtotal + shipping;

  useEffect(()=>{
    if(storeItem.length===0){
      clearCart()
    }
  },[storeItem])

  return (
    <>
      {storeItem.length === 0 ? (
        <EmptyCart />
      ) :  (
        <section className="cart-main-section">
          <div className="cart-items-details-section">
            <div className="main-table-container">
              <div className="free-shipping-policy">
                {cartSubtotal >= 500 ? (
                  <>
                    <Star color="orange" />
                    <span style={{ paddingLeft: "5px" }}>
                      Congratulations! You've got free shipping.
                    </span>
                  </>
                ) : (
                  <>
                    <CircleDollarSign color="green" />
                    <span style={{ paddingLeft: "5px" }}>
                      Spend {500 - totalAmount} $ more to get free shipping.
                    </span>
                  </>
                )}
              </div>
              <table className="sub-table-container">
                <tr className="product-header-title">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
                {cartProduct.map((cart) => {
                  return (
                    <>
                      <tr className="product-body-container">
                        <td>
                          <div className="product-table-cell">
                            <img
                              src={cart.imgUrl}
                              alt={cart.collection}
                              width={100}
                              height={100}
                              id="product-img"
                            />
                          <div id="product-collection">
                            {cart.collection}
                          </div>
                          <div id="trash" className="btn-remove">
                              <Trash2 color="red" onClick={() => removeProductFromCart(cart._id)} />
                            </div>
                          </div> 
                        </td>
                        <td id="product-price">{cart.price}</td>
                        <td id="product-qty">{cart.quantity}</td>
                        <td id="product-subtotal">{cart.subtotal}</td>
                      </tr>
                    </>
                  );
                })}
              </table>
              <div>
                <button className="clear-shopping-cart-btn" onClick={clearCart}>
                  <Trash color="red" />
                  <span>Clear Shopping Cart</span>
                </button>
              </div>
            </div>
          </div>

          <div className="cart-items-checkout-section">
            <div className="cart-items-checkout-main">
              <div className="cart-item-checkout-title">CART TOTALS</div>
              <hr />
              <div className="checkout-description">
                <div className="cart-subtotal">
                  Subtotal
                  <span>{cartSubtotal} $</span>
                </div>
                <div className="cart-shipping">
                  Shipping<span>{shipping} $</span>
                </div>
                <div className="cart-total">
                  TOTAL <span>{totalAmount} $</span>
                </div>
                <button
                  className="checkout-button"
                  onClick={() => navigate("/ind/product/itemcart/checkout")}
                >
                  Proceeed to Checkout
                </button>

                <div className="continue-shopping-link">
                  <Link to={"/ind/home"} className="lnk-shopping">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default ItemCart;
