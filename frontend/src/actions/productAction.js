import axios from'axios';
import{ productRequest,
    productSuccess,
    productFail,
    newProductRequest,
    newProductSuccess,
    newProductFail,
    deleteProductRequest,
    deleteProductSuccess,
    deleteProductFail,
    updateProductRequest,
    updateProductSuccess,
    updateProductFail
} from '../slice/productSlice';
export const getProduct=id=>async(dispatch)=>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/v1/product/${id}`);
        dispatch(productSuccess(data))
    }
    catch(error){
        //Handle Error
        dispatch(productFail(error.response.data.message))
    }
}
export const createNewProduct=productData=>async(dispatch)=>{
    try{
        dispatch(newProductRequest())
        const {data} = await axios.post(`/api/v1/admin/product/new`,productData);
        dispatch(newProductSuccess(data))
    }
    catch(error){
        //Handle Error
        dispatch(newProductFail(error.response.data.message))
    }
    }
    export const deleteProduct=id=>async(dispatch)=>{
        try{
            dispatch(deleteProductRequest())
             await axios.delete(`/api/v1/admin/product/${id}`);
            dispatch(deleteProductSuccess())
        }
        catch(error){
            //Handle Error
            dispatch(deleteProductFail(error.response.data.message))
        }
        }
        export const updateProduct=(id,productData)=>async(dispatch)=>{
            try{
                dispatch(updateProductRequest())
                 const {data}=await axios.put(`/api/v1/admin/product/${id}`,productData);
                dispatch(updateProductSuccess(data))
            }
            catch(error){
                //Handle Error
                dispatch(updateProductFail(error.response.data.message))
            }
            }