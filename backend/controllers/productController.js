const Product = require('../models/productModel')
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');
//Get Products - /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next)=>{
    const resPerPage=3;
    let buildQuery=()=>{
       return new APIFeatures(Product.find(),req.query).search().filter();
    }
    const filteredProductsCount= await buildQuery().query.countDocuments({})
    const totalProductsCount=await Product.countDocuments({})
    let productsCount=totalProductsCount;
    if(filteredProductsCount!==totalProductsCount){
        productsCount = filteredProductsCount;
    }
     const products = await buildQuery().paginate(resPerPage).query;
    res.status(200).json({
        success:true,
        count:productsCount,
        resPerPage,
        products
    })
})
//Create Product - /api/v1/admin/product/new
exports.newProduct= catchAsyncError(async(req,res,next)=>{
    let images=[]
    if(req.files.length>0){
        req.files.forEach(file=>{
            let url=`${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;
            images.push({image:url})
        })
    }
    req.body.images=images;
    req.body.user=req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});
// Get Single Product - /api/v1/product/:id
exports.getSingleProduct = async(req,res,next)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
       return next(new ErrorHandler('Product not found',400))
    }
  
    res.status(201).json({
        success:true,
        product
    })
}
//Update Products - /api/v1/product/:id
exports.updateProduct=async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    //Uploading Images
    let images=[]

    //If images not cleared then we keep existing images
    if(req.body.imagesCleared==='false'){
        images=product.images;
    }
    let BASE_URL=process.env.BACKEND_URL;
    if(process.env.NODE_ENV==="production"){
        BASE_URL=`${req.protocol}://${req.get('host')}`
    }
    if(req.files.length>0){
        req.files.forEach(file=>{
            let url=`${BACKEND_URL}/uploads/product/${file.originalname}`;
            images.push({image:url})
        })
    }
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        })
}
product=await Product.findByIdAndUpdate(req.params.id, req.body,{
    new:true,
    runValidators:true
})
 res.status(200).json({
    success:true,
    product
 })
}
// Delete a product - /api/v1/product/:id
exports.deleteProduct=async(req,res,next)=>{
    const product =await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found"
        });
    }
    await product.deleteOne();
    res.status(200).json({
        success:true,
        message:"Product deleted!"
    })
}
    // Get Admin Products - api/v1/admin/products
    exports.getAdminProducts=catchAsyncError(async(req,res,next)=>{
        const products= await Product.find();
        res.status(200).send({
            success:true,
            products
        })
    });




