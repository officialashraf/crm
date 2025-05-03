import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numbershow : false,
    numbertarget: "",
    numberid: ''
}

const NumberUpdateSlice = createSlice({
    name: 'numberupdate',
    initialState,
    reducers:{
        setNumberShow:(state, action)=>{
            state.numbershow = action.payload
        },
        setNumberTarget:(state,action)=>{
            state.numbertarget = action.payload
        },
        setNumberId:(state, action)=>{
            state.numberid = action.payload
        },
        setNumberClose:(state, action)=>{
            state.numbershow = action.payload
        }
    }
})
export default NumberUpdateSlice.reducer
export const {setNumberShow, setNumberTarget, setNumberId, setNumberClose} = NumberUpdateSlice.actions