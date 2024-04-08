import React from 'react'
import '../styles/ChildNavbar.css'
import { useNavigate } from 'react-router-dom'

function ChildNavbar({person, handleChildNavbar}) {

    const navigate = useNavigate()

    const navigateToProductCategory = (category) =>{
        navigate(`/ind/product/${person.toLowerCase()}/${category}`)
    }
    
  return (
    <>
    <nav onMouseOver={handleChildNavbar(true)} className={`child-nav-main-section ${person == "MEN"? `align-container-men`:`align-container-women`}`} >
        <div className="child-nav-main-container">
            <div className="child-nav-title">{person}</div>
            <div className="child-nav-product-category">
                <div className="product-container">
                    <a onClick={()=>navigateToProductCategory("watches")}>Watches</a>
                </div>
                <div className="product-container">
                    <a onClick={()=>navigateToProductCategory("sunglasses")}>Sunglasses</a>
                </div>
                <div className="product-container">
                    <a onClick={()=>navigateToProductCategory("bracelets")}>Bracelets</a>
                </div>
                <div className="product-container">
                    <a onClick={()=>navigateToProductCategory("necklaces")}>Necklaces</a>
                </div>
            </div>
        </div>
    </nav>
      
    </>
  )
}

export default ChildNavbar
