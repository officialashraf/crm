import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    emailshow : false,
    emailtarget: null,
    emailid: ''
}

const EmailUpdateSlice = createSlice({
    name: 'emailupdate',
    initialState,
    reducers:{
        setEmailShow:(state, action)=>{
            state.emailshow = action.payload
        },
        setEmailTarget:(state,action)=>{
            state.emailtarget = action.payload
        },
        setEmailId:(state, action)=>{
            state.emailid = action.payload
        },
        setEmailClose:(state, action)=>{
            state.emailshow = action.payload
        }
    }
})
export default EmailUpdateSlice.reducer
export const {setEmailShow, setEmailTarget, setEmailId, setEmailClose} = EmailUpdateSlice.actions