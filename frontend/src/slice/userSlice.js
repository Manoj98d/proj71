import { createSlice } from "@reduxjs/toolkit";
const userSlice=createSlice({
    name:'user',
    initialState:{
        loading:false,
        users:{}
    },
    reducers:{
        usersRequest(state,action){
            return{
                ...state,
                loading:true
            }
        },
        usersSuccess(state,action){
            return{
                ...state,
                loading:false,
                users:action.payload.users,
                
            }
        },
        usersFail(state,action){
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        },
        clearError(state,action){
            return{
                ...state,
                error:null
            }
        }
    }
    })
    const {actions,reducer}=userSlice;
    export const{
        usersRequest,
        usersSuccess,
        usersFail,
        clearError
    }=actions;
    export default reducer;