import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profiledata : {},
    show : false,
    // target: null
}

const ProfileSlice = createSlice({
    name : 'profile',
    initialState,
    reducers:{
        setProfileData:(state,action)=>{
            state.profiledata = action.payload
        },
        setShow:(state, action)=>{
            state.show = action.payload
        },
        // setTarget:(state, action)=>{
        //     state.target = action.payload
        // },
        setClose:(state, action)=>{
            state.show = action.payload
        }

    }
})

export default ProfileSlice.reducer
export const {setProfileData,setShow,setTarget} = ProfileSlice.actions