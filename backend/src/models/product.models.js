// import mongoose from "mongoose";
const mongoose = require('mongoose')

const shoeSpecificationSchema = new mongoose.Schema({
    closureType:{
        type:String,
        required:true
    },
    heelType:{
        type:String,
        required:true
    },
    waterResistance:{ 
        type:String,
        required:true
    },
    soleMaterial:{
        type:String,
        required:true
    },
    outerMaterial:{
        type:String,
        required:true
    }
})

const braceletSpecificationSchema = new mongoose.Schema({
    width:{
        type:String,
        required:true
    },
    circumference:{
        type:String,
        required:true
    },
    coreMaterial:{
        type:String,
        required:true
    },
    jewelryClosure:{
        type:String,
        required:true
    },
})

const braceletSchema = new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    collection:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    specification:braceletSpecificationSchema,
    images:{
        type:Array,
        required:true
    },
    ratings:{
        type:String,
        required: true
    }

})

const necklaceSpecificationSchema = new mongoose.Schema({
    circumference:{
        type:String,
        required:true
    },
    length:{
        type:String,
        required:true
    },
    jewelryClosure:{
        type:String,
        required:true
    },
})

const necklaceSchema = new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    collection:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    specification:necklaceSpecificationSchema,
    images:{
        type:Array,
        required:true
    },
    ratings:{
        type:String,
        required: true
    }
},
{
    timestamps:true
}
)

const watchSpecificationSchema = new mongoose.Schema({
    
    caseMaterial:{
        type:String,
        required:true
    },
    caseSize:{
        type:String,
        required:true
    },
    movementType:{
        type:String,
        required:true
    },
    glassType:{
        type:String,
        required:true
    },
    waterResistance:{
        type:String,
        required:true
    }
})

const watchSchema = new mongoose.Schema({

    imgUrl:{
        type:String,
        required:true
    },
    collection:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    specification:watchSpecificationSchema,
    images:{
        type:Array,
        required:true
    },
    ratings:{
        type:String,
        required: true
    }
},
{
    timestamps:true
}
)

const sunglassesSpecificationSchema = new mongoose.Schema({
    uvprotection:{
        type:String,
        required:true
    },
    fit:{
        type:String,
        required:true
    },
    frameShape:{
        type:String,
        required:true
    },
    lensType:{
        type:String,
        required:true
    },
    frameMaterial:{
        type:String,
        required:true
    },
    frameWidth:{
        type:String,
        required:true
    }
})

const sunglassesSchema = new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    collection:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    isPolarized:{
        type:String,
        required:true
    },    
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    specification:sunglassesSpecificationSchema,
    ratings:{
        type:String,
        required: true
    }
}
,
{
    timestamps:true
})

const shoeSchema = new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    collection:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    specification:shoeSpecificationSchema,
    images:{
        type:Array,
        required:true
    },
    ratings:{
        type:String,
        required: true
    }
})

const Watches = mongoose.model("watch", watchSchema)
const Necklaces = mongoose.model("necklace", necklaceSchema)
const Bracelets = mongoose.model("bracelet", braceletSchema)
const Sunglasses = mongoose.model("sunglasses", sunglassesSchema)
const Shoes = mongoose.model("shoe",shoeSchema)

module.exports  = {Watches, Necklaces, Bracelets, Sunglasses, Shoes}