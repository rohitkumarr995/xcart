import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "../styles/Product.css";
import "../media/Product.css";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { BASE_URI } from "../utils/Constants";

function Product() {
  const [singleProduct, setSingleProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [specification, setSpecification] = useState([]);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const [shoeSize, setShoeSize] = useState();
  const [selectedShoeSize, setSelectedShoeSize] = useState();
  const ref = useRef([]);
  const [backgroundColor, setBackgroundColor] = useState();
  const [loading, setLoading] = useState(false);

  const [userCart, setUserCart] = useState();
  const [count, setCount] = useState(0);
  const [forwardBtnActive, setForwardBtnActive] = useState();
  const [backwardBtnActive, setBackwardBtnActive] = useState();

  const params = useParams();

  const collection = searchParams.get("collection");
  const id = searchParams.get("id");

  const shoeSizes = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5];

  useEffect(() => {
    setImage(images[count]);
    console.log(count);
    if (count === 0) {
      //backward btn should be disabled
      setForwardBtnActive(true);
      setBackwardBtnActive(false);
    } else if (count === images.length - 1) {
      //forward btn should be disabled
      setForwardBtnActive(false);
      setBackwardBtnActive(true);
    } else {
      setForwardBtnActive(true);
      setBackwardBtnActive(true);
    }
    console.log("processing...");
  }, [count]);

  useEffect(()=>{
    let isMounted = true

    const fetchSingleProduct =async()=>{
      try {
        const response = await axios.get(
          `${BASE_URI}/api/v1/products/search/${params.productcategory}?collection=${collection}&id=${id}`
        );
        if(isMounted){
          const data = response.data;
          setSingleProduct(data[`${params.productcategory}`]);
          setImages(data[`${params.productcategory}`].images);
          setImage(data[`${params.productcategory}`].images[0]);
          setSpecification(data[`${params.productcategory}`].specification);
        }
      } catch (error) {
        console.log("Error occurred while fetching api", error);
      }
    }
    fetchSingleProduct()

    return ()=>{
      isMounted=false
    }
  },[])

  const addToCart = () => {
    setLoading(true);
    try {
      const addProductToUser = async () => {
        let response;
        if (params.productcategory === "shoes") {
          response = await axios.patch(
            `${BASE_URI}/api/v1/users/search/filter/cart/${params.productcategory}`,
            {
              clientAccesssToken: localStorage.getItem("accessToken"),
              cart: {
                ...singleProduct,
                quantity: productQuantity,
                subtotal: singleProduct.price * productQuantity,
                size: shoeSize,
              },
            }
          );        
        } else {
          response = await axios.patch(
            `${BASE_URI}/api/v1/users/search/filter/cart/${params.productcategory}`,
            {
              clientAccesssToken: localStorage.getItem("accessToken"),
              cart: {
                ...singleProduct,
                quantity: productQuantity,
                subtotal: singleProduct.price * productQuantity,
              },
            }
          );
        }
        const product = response.data;
        setUserCart(product.userCart.cart);
        setLoading(false);
      };
      addProductToUser();
    } catch (error) {
      console.log("Error occurred while fetching api", error);
    }
  };

  const getShoeSize = (index) => {
    setShoeSize(ref.current[index].innerText);

    setSelectedShoeSize(index);
    const bgColor = {
      backgroundColor: "grey",
    };
    setBackgroundColor(bgColor);
  };

  const forwardImage = () => {
    setCount((prev) => prev + 1);
  };

  const backwardImage = () => {
    setCount((prev) => prev - 1);
  };

  return (
    <>
      <Navbar userCart={userCart} />
      {loading === true ? (
        <Loader />
      ) : (
        <section className="product-drilldown-main-container">
          <div className="product-images-container">
            <div className="image-layout-all">
              <button
                disabled={backwardBtnActive === true ? false : true}
                style={
                  backwardBtnActive == false
                    ? { cursor: "no-drop" }
                    : { cursor: "pointer" }
                }
                onClick={backwardImage}
                id="btnbackward"
              >
                <ChevronLeft />
              </button>
              <img src={image} alt="image" className="single-image" />
              <button
                disabled={forwardBtnActive === true ? false : true}
                style={
                  forwardBtnActive == false
                    ? { cursor: "no-drop" }
                    : { cursor: "pointer" }
                }
                onClick={forwardImage}
                id="btnforwrd"
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div className="product-details-container">
            <div className="product-layout-basic">
              <div className="product-title-drilldown">
                {singleProduct.collection}
              </div>
              <div className="product-color-drilldown">
                {singleProduct.color}
              </div>

              {params.productcategory === "sunglasses" ? (
                <div className="product-polarized-drilldown">
                  <div>Polarized</div>
                  <div className="polarization-check-class">
                    {singleProduct.isPolarized}
                  </div>
                </div>
              ) : null}
              <div className="product-quantity">
                Quantity:{" "}
                <span>
                  <select
                    className="quantity-dropdown"
                    value={productQuantity}
                    onChange={(event) => setProductQuantity(event.target.value)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </span>
              </div>
              <div className="product-price-drilldown">
                <button id="addtocart" onClick={addToCart}>
                  ADD TO CART | {singleProduct.price} $ USD
                </button>
              </div>

              {params.productcategory === "shoes" ? (
                <>
                  <div className="product-size">SELECT SIZE</div>
                  <div className="shoes-size-container">
                    <div className="shoe-size-sub-container">
                      {shoeSizes.map((size, index) => (
                        <div
                          key={index}
                          ref={(element) => (ref.current[index] = element)}
                          style={{
                            backgroundColor:
                              selectedShoeSize === index ? "grey" : null,
                          }}
                          onClick={() => getShoeSize(index)}
                        >
                          {size}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : null}
              <div className="product-description-drilldown">
                <details className="details-description-container" open>
                  <summary className="details-summary-conatainer">
                    DESCRIPTION
                  </summary>
                  <p className="product-description">
                    {singleProduct.description}
                  </p>
                </details>
              </div>

              <div className="specification-container">
                <details className="details-summary-container" open>
                  <summary className="details-summary-specification-container">
                    SPECIFICATIONS
                  </summary>
                  {params.productcategory === "necklaces" ? (
                    <>
                      <div className="product-circumference-drilldown specification-drilldown">
                        Circumference :{" "}
                        <span>{specification.circumference}</span>
                      </div>
                      <div className="product-length-drilldown specification-drilldown">
                        Length : <span>{specification.length}</span>
                      </div>
                      <div className="product-jewelryClosure-drilldown specification-drilldown">
                        Jewelry Closure :{" "}
                        <span>{specification.jewelryClosure}</span>
                      </div>
                    </>
                  ) : params.productcategory === "bracelets" ? (
                    <>
                      <div className="product-width-drilldown specification-drilldown">
                        Width : <span>{specification.width}</span>
                      </div>
                      <div className="product-circumference-drilldown specification-drilldown">
                        Circumference :{" "}
                        <span>{specification.circumference}</span>
                      </div>
                      <div className="product-coreMaterial-drilldown specification-drilldown">
                        Core Material :{" "}
                        <span>{specification.coreMaterial}</span>
                      </div>
                      <div className="product-jewelryClosure-drilldown specification-drilldown">
                        Jewelry Closure :{" "}
                        <span>{specification.jewelryClosure}</span>
                      </div>
                    </>
                  ) : params.productcategory === "sunglasses" ? (
                    <>
                      <div className="product-uvProtection-drilldown specification-drilldown">
                        UV Protection :{" "}
                        <span>{specification.uvprotection}</span>
                      </div>
                      <div className="product-fit-drilldown specification-drilldown">
                        Fit : <span>{specification.fit}</span>
                      </div>
                      <div className="product-frameShape-drilldown specification-drilldown">
                        Frame Shape : <span>{specification.frameShape}</span>
                      </div>
                      <div className="product-lensType-drilldown specification-drilldown">
                        Lens Type : <span>{specification.lensType}</span>
                      </div>
                      <div className="product-frameMaterial-drilldown specification-drilldown">
                        Frame Material :{" "}
                        <span>{specification.frameMaterial}</span>
                      </div>
                      <div className="product-frameWidth-drilldown specification-drilldown">
                        Frame Width : <span>{specification.frameWidth}</span>
                      </div>
                    </>
                  ) : params.productcategory === "watches" ? (
                    <>
                      <div className="product-caseMaterial-drilldown specification-drilldown">
                        Case Material :{" "}
                        <span>{specification.caseMaterial}</span>
                      </div>
                      <div className="product-caseSize-drilldown specification-drilldown">
                        Case Size : <span>{specification.caseSize}</span>
                      </div>
                      <div className="product-movementType-drilldown specification-drilldown">
                        Movement Type :{" "}
                        <span>{specification.movementType}</span>
                      </div>
                      <div className="product-glassType-drilldown specification-drilldown">
                        Glass Type : <span>{specification.glassType}</span>
                      </div>
                      <div className="product-waterResistance-drilldown specification-drilldown">
                        Water Resistance :{" "}
                        <span>{specification.waterResistance}</span>
                      </div>
                    </>
                  ) :params.productcategory === "shoes" ? (
                    <>
                      <div className="product-closureType-drilldown specification-drilldown">
                        Closure Type :{" "}
                        <span>{specification.closureType}</span>
                      </div>
                      <div className="product-heelType-drilldown specification-drilldown">
                        Heel Type : <span>{specification.heelType}</span>
                      </div>
                      <div className="product-waterResistance-drilldown specification-drilldown">
                        Water Resistance :{" "}
                        <span>{specification.waterResistance}</span>
                      </div>
                      <div className="product-soleMaterial-drilldown specification-drilldown">
                        Sole Material : <span>{specification.soleMaterial}</span>
                      </div>
                      <div className="product-waterResistance-drilldown specification-drilldown">
                        Outer Material :{" "}
                        <span>{specification.outerMaterial}</span>
                      </div>
                    </>):null
                  }
                </details>
              </div>

              <div className="product-review-drilldown">
                <details className="details-review-container" open>
                  <summary className="details-summary-review-container">
                    REVIEW
                  </summary>
                  <div className="review-text-container">
                    <p id="review-heading">
                      Interested In Reviewing This Item?
                    </p>
                    <p id="review-description">
                      There are no reviews for this item yet, but you could be
                      the first one! Once you purchase this item, we'll send you
                      a link to review.
                    </p>
                  </div>
                </details>
              </div>

              <div className="product-return-drilldown">
                <details className="details-return-container" open>
                  <summary className="details-summary-return-container">
                    RETURN
                  </summary>
                  <div className="return-text-container">
                    <p id="return-heading">Want To Return This Item?</p>
                    <p id="return-description">
                      We offer free domestic and international shipping and free
                      returns on all orders! After your payment is verified, it
                      takes up to 24 hours to process and ship your order. Any
                      brand new product can be returned for a full refund within
                      60 days of delivery.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default Product;
