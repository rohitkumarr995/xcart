import axios from "axios";
import { BASE_URI } from "../utils/Constants.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

export const useGetUser = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    let isMount = true;

    const fetchUserData = async () => {

      if(!localStorage.getItem("accessToken")){
        navigate("/ind/home/user/login");
      }else{
        try {
          const response = await axios.post(`${BASE_URI}/api/v1/users/get/user`, 
          {
            clientAccesssToken: localStorage.getItem("accessToken"),
          });
          if (isMount) {
            const userData = await response?.data;
            setCartProduct(userData.user.cart);        
          }
        } catch (error) {
          console.log("Error occurred while fetching api", error);
        }
      }
    };

    fetchUserData();

    return () => {
      isMount = false;
    };
  },[]);

  return cartProduct;
};
