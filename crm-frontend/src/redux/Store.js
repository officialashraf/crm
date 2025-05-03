import { configureStore} from "@reduxjs/toolkit";
import EmployeeDataReducer from './slice/EmployeSlice/EmployeeDataSlice'
import ModalReducer from './slice/EmployeSlice/ModalSlice'
import ModaTableReducer from './slice/EmployeSlice/ModalTableSlice'
import EmailUpdateReducer from './slice/EmployeSlice/EmailUpdateSlice'
import NumberUpdateReducer from './slice/EmployeSlice/NumberUpdateSlice'
import AddressUpdateReducer from './slice/EmployeSlice/AddressUpdateSlice'
import QuotationReducer from './slice/EmployeSlice/QuotationSlice'
import MeetingDateReducer from './slice/EmployeSlice/MeetingDateSlice'
import AddEmployeReducer from './slice/AdminSlice/AddEmployeSlice'
import AddLeadReducer from './slice/AdminSlice/AddLeadSlice'
import ProfileReducer from './slice/EmployeSlice/ProfileSlice'

import AddEmployeeReducer from "./slice/VendorSlice/AddEmployeeSlice";
import LeadSliceReducer from './slice/VendorSlice/AddLeadSlice'


const Store = configureStore({
    reducer:{
        employeedata: EmployeeDataReducer,
        modal : ModalReducer,
        modaltable: ModaTableReducer,
        emailupdate: EmailUpdateReducer,
        addressupdate: AddressUpdateReducer,
        numberupdate: NumberUpdateReducer,
        quotationsend: QuotationReducer,
        meetingdatesend: MeetingDateReducer,
        addemployee : AddEmployeReducer,
        addlead: AddLeadReducer,
        empleeprofile : ProfileReducer,


        addEmp : AddEmployeeReducer,
        leads: LeadSliceReducer

    }
   
})

export default Store;