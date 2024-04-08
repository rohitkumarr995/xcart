import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/EmptyCart.css'
import '../media/EmptyCart.css'

function EmptyCart() {

  useEffect(()=>{
    document.title="Empty Cart"
  },[])
  
  return (
    <>
    <section className="empty-cart-section">
        <div className="empty-cart-main">
        <div className="img-empty-cart">
            <img src="https://res.cloudinary.com/dhrxlyj5c/image/upload/v1710840194/llou2bjnq1mn6h6qwpvb.jpg" alt="empty cart" className='img-cart'/>
        </div>
        <div className="shopping-link">
            <p id='cart-info'>Your Cart is Empty</p>
            <p id='shopping-nav-link'><Link to={'/'}>Click Here to Add Products</Link></p>
        </div>

        </div>
        
    </section>
      
    </>
  )
}

export default EmptyCart
