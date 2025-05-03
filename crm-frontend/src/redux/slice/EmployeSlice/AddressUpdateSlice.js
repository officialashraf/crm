import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addressshow : false,
    addresstarget: null,
    addressid: ''
}

const AddressUpdateSlice = createSlice({
    name: 'numberupdate',
    initialState,
    reducers:{
        setAddressShow:(state, action)=>{
            state.addressshow = action.payload
        },
        setAddressTarget:(state,action)=>{
            state.addresstarget = action.payload
        },
        setAddressId:(state, action)=>{
            state.addressid = action.payload
        },
        setAddressClose:(state, action)=>{
            state.addressshow = action.payload
        }
    }
})
export default AddressUpdateSlice.reducer
export const {setAddressShow, setAddressTarget, setAddressId, setAddressClose} = AddressUpdateSlice.actions