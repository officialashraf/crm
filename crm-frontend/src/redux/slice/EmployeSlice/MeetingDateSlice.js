import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    meetingdateshow : false,
    meetingdatetarget: null,
    meetingdateid: ''
}

const MeetingDateSlice = createSlice({
    name: 'numberupdate',
    initialState,
    reducers:{
        setMeetingDateShow:(state, action)=>{
            state.meetingdateshow = action.payload
        },
        setMeetingDateTarget:(state,action)=>{
            state.meetingdatetarget = action.payload
        },
        setMeetingDateId:(state, action)=>{
            state.meetingdateid = action.payload
        },
        setMeetingDateClose:(state, action)=>{
            state.meetingdateshow = action.payload
        }
    }
})
export default MeetingDateSlice.reducer
export const {setMeetingDateShow, setMeetingDateTarget, setMeetingDateId, setMeetingDateClose} = MeetingDateSlice.actions