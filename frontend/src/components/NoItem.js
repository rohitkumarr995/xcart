import React from 'react'
import '../styles/NoItem.css'
import { Link } from 'react-router-dom'

function NoItem() {
  return (
    <>
    <section className='no-item-main-section'>
      <div className="no-item-sub-container">
        <div className="no-item-card">
          <div className="status-description">No items found</div>
        </div>
        <div className="home-page-navigation-link">
          <Link to={'/'}>Click here to Home Page</Link>
        </div>
      </div>
    </section>
      
      
    </>
  )
}

export default NoItem
