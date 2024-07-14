const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter the product name"],
        trim : true,
        maxlength : [100, "Product name cannot exceed 100 characters"]
    },
    price :{
        type :Number,
        required :true,
        default : 0.0,
    },
    description:{
        type : String,
        required : [true,"Please enter the product description"]
    },

    images :[
        {
            image :{
                type : String,
                required : true
            }

        }
    ],
    category : {
        type : String,
        required :[true, "Please enter the product's category"],
        enum:{
            values:[
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Fan',
                'Sports',
                'Outdoor',
                'Home',
                'Gaming Consoles',
                'Television',
                'Kitchen Appliances',
                'SmartWatch',
                'Camera',
                'watches'
            ],
            message:"Please select valid category"
        }
    },
    seller:{
        type : String,
        required : [true,"Please enter product's seller name"]
    },
    stock:{
        type : Number,
        required :[true, "Please enter the number of stocks available"],
        maxLength :[20," Product's stock cannot exceed 20"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId

    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})
let schema = mongoose.model('Product', productSchema)
module.exports = schema