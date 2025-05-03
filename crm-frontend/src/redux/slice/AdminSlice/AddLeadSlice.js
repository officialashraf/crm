import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    leaddata: [],
    leadshow : false,
    leadtarget: null,
    leadid: "",
    employeelist:[],
    leaddel: false,
    reasign: false
};

const AddEmployeSlice = createSlice({
    name : 'addlead',
    initialState,
    reducers:{
        setLeadData:(state, action)=>{
            state.leaddata = action.payload
        },
        // addNewLeads: (state, action) => {
        //     state.leaddata = [...state.leaddata, action.payload];
        //   },
        setLeadShow:(state, action)=>{
            state.leadshow = action.payload
        },
        setDelShow:(state, action)=>{
            state.leaddel = action.payload
        },
        setAsignShow:(state, action)=>{
            state.reasign = action.payload
        },
        // setLeadTarget:(state, action)=>{
        //     // state.leadtarget = state.leaddata.find(lead => lead._id === action.payload) || null;
        //     state.leadtarget = action.payload
        // },
        setLeadId:(state, action)=>{
            state.leadid = action.payload
        },
        setLeadClose:(state, action)=>{
            state.leadshow = action.payload
        },
        setEmployeeList:(state, action)=>{
            state.employeelist = action.payload
        },
        removeLeads: (state, action) => {
            state.leaddata = state.leaddata.filter(
              (lead) => lead._id !== action.payload
            );
          },
          updateAsign: (state, action) => {
            const { leadid, asign } = action.payload;
            const lead = state.employeelist.find(lead => lead._id === leadid);
            if (lead) {
                lead.asign = asign; // Correctly update the "asign" field
            }
    }}
})
export const {setLeadShow,setLeadClose,reasignupdate,updateAsign,setAsignShow,setDelShow,setLeadId,removeLeads ,setEmployeeList, setLeadTarget,setLeadData} = AddEmployeSlice.actions
export default AddEmployeSlice.reducer;