const express = require('express')
const { addProductToUserCart, clearCartFromUser, fetchUserDetails, placeOrder, registerUser, removeProductFromcart, sendConfirmationMail, userLogin, userLogout } = require('../controllers/user.controllers.js')
// const {verifyJwt}  = require( '../middleware/auth.middleware.js')


const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(userLogin)
router.route('/logout').post(userLogout)
router.route('/search/filter/cart/:productcategory').patch(addProductToUserCart)  
router.route('/get/user').post(fetchUserDetails)
router.route('/remove/product/cart').post(removeProductFromcart)    
router.route('/clear/cart').put(clearCartFromUser)
router.route('/cart/placeorder').post(placeOrder)
router.route('/cart/placeorder/emailconfirmation').post(sendConfirmationMail)

module.exports  = router