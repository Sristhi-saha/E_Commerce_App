import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoading:false,
    productList:[]
}

export const addNewProduct = createAsyncThunk('/products/addnewProducts',async (FormData)=>{
    const result = await axios.post('http://localhost:5000/api/admin/products/add',FormData,{
        headers:{
            'Content-Type':'application/json',
        }
    })
    return result?.data;
})

export const fetchAllProduct = createAsyncThunk('/products/addnewProducts',async ()=>{
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
export const deleteProduct = createAsyncThunk('/products/addnewProducts',async (id)=>{
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/:${id}`)
    return result?.data;
})


const adminProductSlice = createSlice({
    name:'adminProducts',
    initialState,
    reducers:{},
    extrabuilder: (builder)=>{
        builder.addCase(fetchAllProduct.pending,(state)=>{
            state.isLoading=true
        }),
        builder.addCase(fetchAllProduct.fulfilled,(state,action)=>{
            console.log(action.payload);
            state.isLoading=false,
            state.productList=action.payload
        }),
        builder.addCase(fetchAllProduct.rejected,(state,action)=>{
            console.log(action.payload);
            state.isLoading=false,
            state.productList=[]
        })
    }
});

export default adminProductSlice;