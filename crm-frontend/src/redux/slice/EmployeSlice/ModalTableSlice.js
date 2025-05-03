import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    Cshow : null,
    Ctarget :null,
    tableid: '',
    handleclose :true
}
const ModalTableSlice = createSlice({
    name: 'modaltable',
    initialState,
    reducers:{
        setCShow:(state, action)=>{
            state.Cshow = action.payload
        },
        setCTarget:(state, action)=>{
            state.Ctarget = action.payload
        },
        setTableId:(state, action)=>{
            state.tableid = action.payload
        },
        setHandleClose:(state, action)=>{
            state.Cshow = action.payload
        }

    }

})
export default ModalTableSlice.reducer
export const {setCShow,setCTarget,setHandleClose,setTableId} = ModalTableSlice.actions