import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Bshow : false,
    Btarget : null,
    userId : '',
    handlClose: true
}
const ModalSlice = createSlice({
    name : 'modal',
    initialState,
    reducers:{
        setBShow:(state, action)=>{
            state.Bshow = action.payload;
        }, 
        setBTarget:(state, action)=>{
            state.Btarget = action.payload
        },
        setUserId: (state, action)=>{
            state.userId = action.payload
        },
        setClose: (state, action)=>{
            state.Bshow = action.payload
        }

    } 
});
export const {setBShow, setBTarget, setUserId,setClose} = ModalSlice.actions;
export default ModalSlice.reducer;
