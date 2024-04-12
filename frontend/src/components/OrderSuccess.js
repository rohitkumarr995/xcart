import React, { useEffect, useState } from 'react'
import '../styles/OrderSuccess.css'
import '../media/OrderSuccess.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck} from '@fortawesome/free-regular-svg-icons'

function OrderSuccess() {
  const navigate = useNavigate()

  const continueShopping =()=> {
    navigate('/ind/home/')
  } 

const cartIcon = <FontAwesomeIcon icon={faCircleCheck} size='10x'/>
  return (
    <>
    <section className="order-success-main-container">
    <div className='order-success-sub-container'>       
        <div className='order-success-layout'>
            <div className='success-circleCheck'>
                {cartIcon}
            </div>
            <div className='success-message'>               
                <p className='success-message-desc'>Thank you for placing your order</p>
            </div>
            <div className='continue-shopping-link-container'>               
                <p className='continue-shopping-link'>
                <span onClick={continueShopping} className='continue-shopping-link-desc'>Click here</span> 
                 to continue shopping.</p>
            </div>
            <div className='order-queries'>               
                <p className='order-queries-desc'>If you have any questions, please contact us at <span className='query-email-address'>query@ultimatecart.com</span></p>
            </div>
        </div>
       
    </div>
    </section>
      
    </>
  )
}

export default OrderSuccess
