import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addleadshow: false,
    bulkleadShow: false,
    bulkDeleteShow:false,
    LeadId:"",
    leaddata:[],

}


const LeadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers:{
        setLeadData:(state,action)=>{
            state.leaddata = action.payload

        },
        setAddLeadShow:(state, action)=>{
            state.addleadshow = action.payload
        },
        setBulkLeadShow:(state, action)=>{
            state.bulkleadShow = action.payload
        },
        setBulkDeleteShow:(state, action)=>{
            state.bulkDeleteShow = action.payload
        },
        setLeadId:(state, action)=>{
            state.LeadId = action.payload
        }

    }
})
export const {setAddLeadShow, setBulkDeleteShow,setLeadData, setBulkLeadShow,setLeadId} = LeadSlice.actions;
export default LeadSlice.reducer