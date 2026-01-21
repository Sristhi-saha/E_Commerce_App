import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    isLoading:false,
    productList:[]
}

export const addNewProduct = createAsyncThunk(
  "products/addnewProducts",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/admin/products/add', data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);


export const fetchAllProduct = createAsyncThunk('/products/getProducts',async ()=>{
    const result = await axios.get('http://localhost:5000/api/admin/products/get')
    return result?.data;
})
export const editAllProduct = createAsyncThunk('/products/editProduct',async ({FormData,id})=>{
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit/:${id}`,FormData,{
        headers:{
            'Content-Type':'application/json',
        }
    })
    return result?.data;
})
export const deleteProduct = createAsyncThunk('/products/deleteProducts',async (id)=>{
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`)
    return result?.data;
})


const adminProductSlice = createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
   extraReducers: (builder) => {
  builder
    .addCase(fetchAllProduct.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    })
    .addCase(fetchAllProduct.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });
}

});

export default adminProductSlice.reducer;