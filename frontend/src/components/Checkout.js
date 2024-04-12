import React from "react";
import "../styles/Checkout.css";
import "../media/Checkout.css";
import Navbar from "./Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import OrderSummary from "./OrderSummary";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart.js";
import { BASE_URI } from "../utils/Constants.js";
import { useGetUser } from "../hooks/useGetUser.js";
import {useDispatch} from 'react-redux'
import { removeItem } from "../store/cartSlice.js";

function Checkout() {
  const navigate = useNavigate();
  const cartProduct = useGetUser()
  const dispatch = useDispatch()

  const cartSubtotal = cartProduct
    .map((cart) => cart.subtotal)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const shipping = cartSubtotal < 500 ? 75 : 0;

  const totalAmount = cartSubtotal + shipping;

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      houseNumber: "",
      street: "",
      landmark: "",
      city: "",
      state: "",
      zip: "",
      contact: "",
      email: "",
    },
  });

  const { errors } = formState;

  const placeOrder = async(data)=>{
    const response = await axios.post(
      `${BASE_URI}/api/v1/users/cart/placeorder`,
      {
        clientAccesssToken: localStorage.getItem("accessToken"),
        product: {
          cartProduct,
          personalInfo: data,
        },
      }
    );
  }
  
  const formSubmit = async (data) => {  
    placeOrder(data)  
    dispatch(removeItem())
    navigate("/ind/product/itemcart/checkout/order");
  };

  return (
    <>   
        <section className="checkout-section-container">
          <div className="personalinfo-main-container">
            <div className="checkout-title">Personal Information</div>
            <form onSubmit={handleSubmit(formSubmit)} className="form-personal-information">
              <div className="name-container checkout-name-block">
                <div className="firstname-container name-container">
                  <div>
                    <label className="checkout-label">First Name</label>
                    <br />
                    <input
                      className="input-firstname checkout-name-input regular-input"
                      type="text"
                      placeholder="Full Name"
                      {...register("firstName", {
                        required: {
                          value: true,
                          message: "Please enter your first name",
                        },
                      })}
                    />
                  </div>
                  <div className="error-message-container">
                    <span className="firstname-error-msg checkout-error-mgs">
                      {errors.firstName?.message}
                    </span>
                  </div>
                </div>

                <div className="lastname-container name-container">
                  <div>
                    <label className="checkout-label">Last Name</label>
                    <br />
                    <input
                      className="input-lastname checkout-name-input regular-input"
                      type="text"
                      placeholder="Last Name"
                      {...register("lastName", {
                        required: {
                          value: true,
                          message: "Please enter your last name",
                        },
                      })}
                    />
                  </div>
                  <div className="error-message-container">
                    <span className="lastname-error-msg checkout-error-mgs">
                      {errors.lastName?.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="house-container checkout-input-block">
                <div>
                  <label className="checkout-label">House Number</label>
                  <br />
                  <input
                    className="input-house checkout-input regular-input"
                    type="text"
                    placeholder="House Number"
                    {...register("houseNumber", {
                      required: {
                        value: true,
                        message: "Please enter your house number",
                      },
                    })}
                  />
                </div>
                <div className="error-message-container">
                  <span className="house-error-msg checkout-error-mgs">
                    {errors.houseNumber?.message}
                  </span>
                </div>
              </div>

              <div className="address-container checkout-address-block">
                <div className="street-container">
                  <div>
                    <label className="checkout-label">Street Number</label>
                    <br />
                    <input
                      className="street-house checkout-address-input regular-input"
                      type="text"
                      placeholder="Street Number"
                      {...register("street", {
                        required: {
                          value: true,
                          message: "Please enter your street number",
                        },
                      })}
                    />
                  </div>
                  <div className="error-message-container">
                    <span className="street-error-msg checkout-error-mgs">
                      {errors.street?.message}
                    </span>
                  </div>
                </div>

                <div className="landmark-container">
                  <div>
                    <label className="checkout-label">Landmark</label>
                    <br />
                    <input
                      className="checkout-address-input regular-input"
                      type="text"
                      placeholder="Landmark E.g. near apollo hospital"
                      {...register("landmark", {
                        required: {
                          value: true,
                          message: "Please enter your landmark",
                        },
                      })}
                    />
                  </div>
                  <div className="error-message-container">
                    <span className="landmark-error-msg checkout-error-mgs">
                      {errors.landmark?.message}
                    </span>
                  </div>
                </div>
              </div>

              <div className="city-container checkout-input-block">
                <div>
                  <label className="checkout-label">City / Town</label>
                  <br />
                  <input
                    className="city-town checkout-input regular-input"
                    type="text"
                    placeholder="City/Town"
                    {...register("city", {
                      required: {
                        value: true,
                        message: "Please enter your city/town",
                      },
                    })}
                  />
                </div>
                <div className="error-message-container">
                  <span className="city-error-msg checkout-error-mgs">
                    {errors.city?.message}
                  </span>
                </div>
              </div>

              <div className="state-container checkout-input-block">
                <div>
                  <label className="checkout-label">State / Region</label>
                  <br />
                  <input
                    className="state-region checkout-input regular-input"
                    type="text"
                    placeholder="State/Region"
                    {...register("state", {
                      required: {
                        value: true,
                        message: "Please enter your state/region",
                      },
                    })}
                  />
                </div>
                <div className="error-message-container">
                  <span className="state-error-msg checkout-error-mgs">
                    {errors.state?.message}
                  </span>
                </div>
              </div>

              <div className="zip-container checkout-input-block">
                <div>
                  <label className="checkout-label">Postcode / ZIP</label>
                  <br />
                  <input
                    className="postcode-zip checkout-input regular-input"
                    type="text"
                    placeholder="Postcode/ZIP"
                    {...register("zip", {
                      required: {
                        value: true,
                        message: "Please enter your postcode/zip",
                      },
                    })}
                  />
                </div>
                <div className="error-message-container">
                  <span className="zip-error-msg checkout-error-mgs">
                    {errors.zip?.message}
                  </span>
                </div>
              </div>

              <div className="contact-container checkout-input-block">
                <div>
                  <label className="checkout-label">Contact Number</label>
                  <br />
                  <input
                    className="contactnumber checkout-input regular-input"
                    type="text"
                    placeholder="Contact Number"
                    {...register("contact", {
                      required: {
                        value: true,
                        message: "Please enter your contact number",
                      },
                      pattern: {
                        value: /^([6-9][0-9]{9})$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                </div>
                <div className="error-message-container">
                  <span className="contact-error-msg checkout-error-mgs">
                    {errors.contact?.message}
                  </span>
                </div>
              </div>

              <div className="email-container checkout-input-block">
                <div>
                  <label className="checkout-label">Email Address</label>
                  <br />
                  <input
                    className="emailaddress checkout-input regular-input"
                    type="text"
                    placeholder="Email Address"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Please enter your email address",
                      },
                      pattern: {
                        value: /^([a-zA-z0-9\.-]+)@([a-z]{2,8}).([a-z]{2,8})$/,
                        message: "Invalid email format",
                      },
                    })}
                  />
                </div>
                <div className="error-message-container">
                  <span className="email-error-msg checkout-error-mgs">
                    {errors.email?.message}
                  </span>
                </div>
              </div>

              <div className="submit-button-container">
                <button className="btn-place-order">Place Order</button>
              </div>
            </form>
          </div>
          <OrderSummary
            cartProduct={cartProduct}
            cartSubtotal={cartSubtotal}
            shipping={shipping}
            totalAmount={totalAmount}
          />
        </section>
    </>
  );
}

export default Checkout;
