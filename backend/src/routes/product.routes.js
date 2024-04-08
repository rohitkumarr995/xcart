const express = require('express')
const { addBracelets, addNecklaces, addWatches, addSunglasses, getBracelets, getNecklaces, getSunglasses, getWatches, getSingleWatches, getSingleNecklace, getSingleBracelet, getSingleSunglass, getWatchesbasedOnPrice, getSunglassesbasedOnPrice, getBraceletsbasedOnPrice, getNecklacesbasedOnPrice, getWatchesbasedOnColor, getSunglassesbasedOnColor, getBraceletsbasedOnColor, getNecklacesbasedOnColor, addShoes, getShoes, getSingleShoe, getShoesbasedOnPrice, getShoesbasedOnColor } = require('../controllers/product.controllers.js')

const router = express.Router()

router.route('/addWatches').post(addWatches)
router.route('/addNecklaces').post(addNecklaces)
router.route('/addBracelets').post(addBracelets) 
router.route('/addSunglasses').post(addSunglasses)
router.route('/addShoes').post(addShoes)
router.route('/watches').get(getWatches)
router.route('/sunglasses').get(getSunglasses)
router.route('/bracelets').get(getBracelets)
router.route('/necklaces').get(getNecklaces)
router.route('/shoes').get(getShoes)

//get single product router
router.route('/search/watches').get(getSingleWatches)
router.route('/search/necklaces').get(getSingleNecklace)
router.route('/search/bracelets').get(getSingleBracelet)
router.route('/search/sunglasses').get(getSingleSunglass)
router.route('/search/shoes').get(getSingleShoe)

//get product based on price filter
router.route('/search/filter/watches').get(getWatchesbasedOnPrice)
router.route('/search/filter/sunglasses').get(getSunglassesbasedOnPrice)
router.route('/search/filter/bracelets').get(getBraceletsbasedOnPrice)
router.route('/search/filter/necklaces').get(getNecklacesbasedOnPrice)
router.route('/search/filter/shoes').get(getShoesbasedOnPrice)

//get product based on color filter
router.route('/search/filter/color/watches').get(getWatchesbasedOnColor) 
router.route('/search/filter/color/sunglasses').get(getSunglassesbasedOnColor) 
router.route('/search/filter/color/bracelets').get(getBraceletsbasedOnColor)
router.route('/search/filter/color/necklaces').get(getNecklacesbasedOnColor)
router.route('/search/filter/color/shoes').get(getShoesbasedOnColor)

module.exports = router