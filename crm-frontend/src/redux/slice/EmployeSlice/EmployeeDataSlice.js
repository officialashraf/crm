import { createSlice } from "@reduxjs/toolkit";


const EmployeeDataSlice = createSlice({
    name: 'newdata',
     initialState :[],
    reducers : {
        addData : (state, action)=>{
          // console.log(action,"add data")
          return action.payload;
        },
        addComment: (state, action) => {
          const { userId, comment } = action.payload;
          const user = state.find(user => user.id === userId);
          if (user) {
            user.comments.push(comment);
          } else {
            // console.error("User not found for id:", userId);
          }
        },
        updateEmployee: (state, action) => {
          const { userId, newRow } = action.payload;
          const userIndex = state.findIndex(user => user._id === userId);
    
          if (userIndex !== -1) {
            state[userIndex] = { ...state[userIndex], ...newRow }; // Update only modified fields
          }},
        updateStage: (state, action) => {
          const { id, stage } = action.payload;
          const user = state.find(user => user.id === id);
          if (user) {
            user.stage = stage; // Update the stage field
          }
        },
        updateSource:(state,action)=>{
          const {id, source} = action.payload;
          const user = state.find(user=>user.id === id)
          if(user){
            user.source = source;
          }
        },
        updateEmail:(state,action)=>{
          const {emailid, email} = action.payload;
          const user = state.find(user=>user.id === emailid)
          if(user){
            user.email = email
          }
        },
        updateNumber:(state, action)=>{
          const {numberid, number} = action.payload;
          const user = state.find(user=>user.id === numberid);
          if(user){
            user.mobile_number = number
          }

        },
        updateAddress:(state, action)=>{
          const {addressid, address} = action.payload;
          const user = state.find(user=> user.id === addressid);
          if(user){
            user.address = address
          }
        },
        sendMeetingDate:(state, action)=>{
          const {meetingdateid, meeting_time} = action.payload;
          const user = state.find(user =>user.id === meetingdateid);
          if(user){
            user.meeting_time = meeting_time
          }
        },
        sendQuotation:(state, action)=>{
          const {quotationid, quotation } = action.payload;
          const user = state.find((user)=>user.id === quotationid);
          if(user){
            user.quotation = quotation
          }
        },
    
        
      }
      
   });
        

export const {addData,addComment,updateEmployee,updateEmail,sendQuotation,sendMeetingDate,updateAddress,updateNumber, updateSource, updateStage} = EmployeeDataSlice.actions;
export default EmployeeDataSlice.reducer;