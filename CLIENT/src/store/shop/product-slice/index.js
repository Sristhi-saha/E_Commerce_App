import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isloading:false,
    productList:[]
}
export const fetchAllFilterProducts = createAsyncThunk('/products/getProducts', async () => {
  const result = await axios.get('http://localhost:5000/api/admin/products/get')
  return result?.data;
})

const shopProductSlice = createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllFilterProducts.pending, (state,action) => {
            state.isloading = true;

        }).addCase(fetchAllFilterProducts.fulfilled,(state,action)=>{
            console.log("action.payload.data",action.payload.data);
            state.isloading = false;
            state.productList = action.payload.data;
        }).addCase(fetchAllFilterProducts.rejected,(state,action)=>{
            console.log("action.payload.data",action.payload.data);
            state.isloading = false;
            state.productList =[];
        })
    }
})