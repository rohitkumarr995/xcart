import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/OrderSummary.css'
import '../media/OrderSummary.css'

function OrderSummary({cartProduct,cartSubtotal,shipping,totalAmount}) {

  return (
    <>
      <section className="order-summary-main-container">
        <div className="order-summary-sub-container">
          <div className="order-summary-title">Order Summary</div>
          <div className="product-details">
            {
            cartProduct.map((product,index)=>{
              return (
                <>
                <div className="ordered-product-list">
                  <div className='product-items'>{product.collection}</div>
                  <div className="quantity-subtotal">{product.quantity} x {product.price} US$</div>
                  <div className="subtotal">Subtotal : {product.quantity * product.price} US$</div>
                </div>              
                </>
              )
            })
            }
            <div className='product-shipping-charges'>Shipping Charges : <span className='span-shipping'>{shipping} US$</span></div>
            <div className='product-total-amount'>Total Payable Amount: <span className='span-totalamount'>{totalAmount} US$</span></div>
          </div>         
          </div>
        
      </section>
    </>
  )
}

export default OrderSummary
