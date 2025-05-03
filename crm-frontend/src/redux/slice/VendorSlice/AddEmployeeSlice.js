import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeAdd: [],
  employeeId: "",
  employeeShow: false,
  empDel: false,
  adminshow:false,
  adminprofile:{}
};
const AddEmployeeSlice = createSlice({
  name: "addemployee",
  initialState,
  reducers: {
    setAdminshow:(state,action)=>{
      state.adminshow = action.payload;
    },
    setAdminProfile:(state, action)=>{
    state.adminprofile = action.payload
    },
    setAddEmploye: (state, action) => {
      state.employeeAdd = action.payload;
    },
    setEmployeeShow: (state, action) => {
      state.employeeShow = action.payload;
    },
    setEmployeeId: (state, action) => {
      state.employeeId = action.payload;
    },
    setDelShow: (state, action) => {
      state.empDel = action.payload;
    },
    setRemoveEmp: (state, action) => {
      state.employeeAdd = state.employeeAdd.filter(
        (employee) => employee._id !== action.payload
      );
    },
  },
});
export const { setAddEmploye,setRemoveEmp,setAdminshow,setAdminProfile, setDelShow, setEmployeeId, setEmployeeShow } =
  AddEmployeeSlice.actions;
export default AddEmployeeSlice.reducer;
