const { Bracelets, Necklaces, Watches, Sunglasses, Shoes } = require("../models/product.models.js");

const addWatches = async (request, response)=>{
    const {imgUrl, collection, size, color, price, gender, description, specification, ratings, images} = request.body

    const product = await Watches.create({imgUrl, collection, size, color, price, gender, description, specification, ratings, images})
    if(!product){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(201).json({product, message:"product added successfully"})
}

const addNecklaces = async (request, response)=>{
    const {imgUrl, collection, color, price, gender, description, specification, ratings, images} = request.body

    const necklace = await Necklaces.create({imgUrl, collection, color, price, gender, description, specification, ratings, images})
    if(!necklace){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(201).json({necklace, message:"product added successfully"})
}

const addBracelets = async (request, response)=>{
    const {imgUrl, collection, color, price, gender, description, specification, ratings, images} = request.body

    const bracelet = await Bracelets.create({imgUrl, collection, color, price, gender, description, specification, ratings, images})
    if(!bracelet){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(201).json({bracelet, message:"product added successfully"})
}

//Post Request - Sunglasses
const addSunglasses= async (request, response)=>{
    const {imgUrl, collection, color, price, isPolarized, gender, description, specification, ratings, images} = request.body

    const sunglass = await Sunglasses.create({imgUrl, collection, color, price, isPolarized, gender, description, specification, ratings, images})
    if(!sunglass){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(201).json({sunglass, message:"product added successfully"})
}

const addShoes= async (request, response)=>{
    const {imgUrl, collection, color, price, gender, ratings, images, description, specification} = request.body

    const shoe = await Shoes.create({imgUrl, collection, color, price, gender, ratings, images, description, specification})
    if(!shoe){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(201).json({shoe, message:"product added successfully"})
}

//Get Request - Watches

const getWatches = async (request, response)=>{
    const watches = await Watches.find()
    if(!watches){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(200).json({watches, message:"product added successfully"})
}

//Get Request - Necklaces
const getNecklaces = async (_, response)=>{
    const necklaces = await Necklaces.find()
    if(!necklaces){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(200).json({necklaces, message:"product added successfully"})
}

//Get Request - Bracelets

const getBracelets = async (request, response)=>{

    const bracelets = await Bracelets.find()
    if(!bracelets){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(200).json({bracelets, message:"product added successfully"})
}

//Get Sunglasses
const getSunglasses= async (request, response)=>{

    const sunglasses = await Sunglasses.find()
    if(!sunglasses){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({sunglasses, message:"product added successfully"})
}

//Get Shoes
const getShoes= async (request, response)=>{

    const shoes = await Shoes.find()
    if(!shoes){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({shoes, message:"product added successfully"})
}

//Get single watch

const getSingleWatches = async (request, response)=>{
    const {collection, id} = request.query
    const watches = await Watches.findOne({'collection':collection, '_id':id})
    if(!watches){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(200).json({watches, message:"product added successfully"})
}

//get single Necklace

const getSingleNecklace = async (request, response)=>{
    const {collection, id} = request.query
    const necklaces = await Necklaces.findOne({'collection':collection, '_id':id})
    if(!necklaces){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(200).json({necklaces, message:"product added successfully"})
}

//Get Single Bracelets

const getSingleBracelet = async (request, response)=>{
    const {collection, id} = request.query
    const bracelets = await Bracelets.findOne({'collection':collection, '_id':id})
    if(!bracelets){
        return response.status(401).json({message:"something went wrong"})
    }

    return response.status(200).json({bracelets, message:"product added successfully"})
}

//Get Single Sunglass

const getSingleSunglass = async (request, response)=>{
    const {collection, id} = request.query
    const sunglasses = await Sunglasses.findOne({'collection':collection, '_id':id})
    if(!sunglasses){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({sunglasses, message:"product added successfully"})
}

//Get single shoe
const getSingleShoe = async (request, response)=>{
    const {collection, id} = request.query
    const shoes = await Shoes.findOne({'collection':collection, '_id':id})
    if(!shoes){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({shoes, message:"product added successfully"})
}

//Get Watches based on price filter: query params
const getWatchesbasedOnPrice = async(request, response)=>{
    const {minPrice, maxPrice} = request.query
    const watches = await Watches.find({$and : [{'price':{$gt:minPrice}}, {'price': {$lt:maxPrice}}]}) 
    if(!watches){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({watches, message:"product added successfully"})
}

//Get sunglasses based on price filter: query params
const getSunglassesbasedOnPrice = async(request, response)=>{
    const {minPrice, maxPrice} = request.query
    const sunglasses = await Sunglasses.find({$and : [{'price':{$gt:minPrice}}, {'price': {$lt:maxPrice}}]}) 
    if(!sunglasses){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({sunglasses, message:"product added successfully"})
}

//Get bracelets based on price filter: query params
const getBraceletsbasedOnPrice = async(request, response)=>{
    const {minPrice, maxPrice} = request.query
    const bracelets = await Bracelets.find({$and : [{'price':{$gt:minPrice}}, {'price': {$lt:maxPrice}}]}) 
    if(!bracelets){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({bracelets, message:"product added successfully"})
}

//Get necklaces based on price filter: query params
const getNecklacesbasedOnPrice = async(request, response)=>{
    const {minPrice, maxPrice} = request.query
    const necklaces = await Necklaces.find({$and : [{'price':{$gt:minPrice}}, {'price': {$lt:maxPrice}}]}) 
    if(!necklaces){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({necklaces, message:"product added successfully"})
}

//Get shoes based on price filter: query params
const getShoesbasedOnPrice = async(request, response)=>{
    const {minPrice, maxPrice} = request.query
    const shoes = await Shoes.find({$and : [{'price':{$gt:minPrice}}, {'price': {$lt:maxPrice}}]}) 
    if(!shoes){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({shoes, message:"product added successfully"})
}

//Get Watches based on color filter: query params
const getWatchesbasedOnColor = async(request, response)=>{
    const {color} = request.query
    const watches = await Watches.find({'color': {$regex : color}}) 
    if(!watches){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({watches, message:"product added successfully"})
}

//Get Sunglasses based on color filter: query params
const getSunglassesbasedOnColor = async(request, response)=>{
    const {color} = request.query
    const sunglasses = await Sunglasses.find({'color': {$regex : color}}) 
    if(!sunglasses){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({sunglasses, message:"product added successfully"})
}

//Get Bracelets based on color filter: query params
const getBraceletsbasedOnColor = async(request, response)=>{
    const {color} = request.query
    const bracelets = await Bracelets.find({'color': {$regex : color}}) 
    if(!bracelets){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({bracelets, message:"product added successfully"})
}

//Get Bracelets based on color filter: query params
const getNecklacesbasedOnColor = async(request, response)=>{
    const {color} = request.query
    const necklaces = await Necklaces.find({'color': {$regex : color}}) 
    if(!necklaces){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({necklaces, message:"product added successfully"})
}

const getShoesbasedOnColor = async(request, response)=>{
    const {color} = request.query
    const shoes = await Shoes.find({'color': {$regex : color}}) 
    if(!shoes){
        return response.status(401).json({message:"something went wrong"})
    }
    return response.status(200).json({shoes, message:"product added successfully"})
}

module.exports=  {
    addWatches, 
    addNecklaces, 
    addBracelets, 
    addSunglasses, 
    addShoes,
    getNecklaces, 
    getWatches, 
    getBracelets,
    getSunglasses, 
    getShoes,
    getSingleWatches, 
    getSingleNecklace,
    getSingleBracelet, 
    getSingleSunglass,
    getSingleShoe, 
    getWatchesbasedOnPrice,
    getSunglassesbasedOnPrice, 
    getBraceletsbasedOnPrice, 
    getNecklacesbasedOnPrice,
    getShoesbasedOnPrice,   
    getWatchesbasedOnColor,
    getSunglassesbasedOnColor,
    getBraceletsbasedOnColor,
    getNecklacesbasedOnColor,
    getShoesbasedOnColor
}