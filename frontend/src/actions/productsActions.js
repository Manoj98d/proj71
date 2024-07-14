import axios from'axios';
import{ productsRequest,productsSuccess,productsFail, adminproductsRequest,adminproductsSuccess,adminproductsFail} from '../slice/productsSlice';
export const getProducts=(keyword,price,category,currentPage)=>async(dispatch)=>{
    try{
        dispatch(productsRequest())
        let link=`/api/v1/products?page=${currentPage}`;
        if(keyword){
            link+=`&keyword=${keyword}`
        }
         if(price){
            link+=`&price[gte]=${price[0]} &price[lte]=${price[1]}`
         }
         if(category){
            link+=`&category=${category}`
         }
        const { data } = await axios.get(link);
        dispatch(productsSuccess(data))
        }
    catch(error){
        //Handle Error
        dispatch(productsFail(error.response.data.message))
    }
}
export const getAdminProducts=async(dispatch)=>{
    try{
        dispatch(adminproductsRequest())
        const {data} = await axios.get(`/api/v1/admin/products`);
        dispatch(adminproductsSuccess(data))
    }
    catch(error){
        //Handle Error
        dispatch(adminproductsFail(error.response.data.message))
    }
    }