import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeeadd: [],
  employeeshow: false,
  // employeetarget: null,
  employeeuserId: "",
  empshow: false,
  isEditing:null
};
const AddEmployeSlice = createSlice({
  name: "addemployee",
  initialState,
  reducers: {
    setAddEmployee: (state, action) => {
      state.employeeadd = action.payload;
    },
    // addNewEmployee: (state, action) => {
    //   state.employeeadd = [...state.employeeadd, action.payload];
    // },
    setEmployeeShow: (state, action) => {
      state.employeeshow = action.payload;
    },
    setDelShow:(state, action)=>{
      state.empdel = action.payload
  },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEmployeeUserId: (state, action) => {
      state.employeeuserId = action.payload;
    },
    setEmployeeClose: (state, action) => {
      state.employeeshow = action.payload;
    },
    removeEmployee: (state, action) => {
      state.employeeadd = state.employeeadd.filter(
        (employee) => employee._id !== action.payload
      );
    },
  },
});
export const {
  setEmployeeShow,
  setIsEditing,
  setAddEmployee,
  setDelShow,
  setEmployeeUserId,
  setEmployeeClose,
  addNewEmployee,
  removeEmployee
} = AddEmployeSlice.actions;
export default AddEmployeSlice.reducer;
