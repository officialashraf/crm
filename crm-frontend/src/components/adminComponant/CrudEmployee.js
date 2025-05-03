import React from 'react'
// eslint-disable-next-line no-unused-vars
import CrudEmployeecss from '../../assets/style/admincss/CrudEmployee.css'
import { setEmployeeShow,setEmployeeTarget } from '../../redux/slice/AdminSlice/AddEmployeSlice'
import { useDispatch } from 'react-redux'
import AddEmploye from './AddEmploye'
import { PlusLg, PlusSquareFill } from 'react-bootstrap-icons'



const CrudEmployee = () => {
    
    let dispatch = useDispatch()

    const handleEmployee = (event)=>{
        dispatch(setEmployeeShow(true))
        // dispatch(setEmployeeTarget(event.target))
    }
  return (
    <>  
   
            <div>
                <PlusSquareFill onClick={handleEmployee} size={60}/>
            </div>
         


    
    <AddEmploye/>
    
    </>
  )
}

export default CrudEmployee