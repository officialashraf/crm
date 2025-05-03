import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quotationshow : false,
    quotationtarget: null,
    quotationid: ''
}

const QuotationSendSlice = createSlice({
    name: 'numberupdate',
    initialState,
    reducers:{
        setQuotationShow:(state, action)=>{
            state.quotationshow = action.payload
        },
        setQuotationTarget:(state,action)=>{
            state.quotationtarget = action.payload
        },
        setQuotationId:(state, action)=>{
            state.quotationid = action.payload
        },
        setQuotationClose:(state, action)=>{
            state.quotationshow = action.payload
        }
    }
})
export default QuotationSendSlice.reducer
export const {setQuotationShow, setQuotationTarget, setQuotationId, setQuotationClose} = QuotationSendSlice.actions