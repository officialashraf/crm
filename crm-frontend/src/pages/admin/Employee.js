import React from 'react'
import CrudEmployee from '../../components/adminComponant/CrudEmployee'
import SearchEmployee from '../../components/adminComponant/SearchEmployee'
import '../../assets/style/admincss/Employe.css'
import Navbar from '../../components/adminComponant/Navbar'
import { PlusLg } from 'react-bootstrap-icons';


const Employee = () => {





  return (
    <>
<div className='container-fluid' id='container-fluid' >
  <div className='employecrud'>
  <Navbar/>

  </div>
  <div className='containerFluid'>
  <SearchEmployee/>
  </div>
  <div className='crudEmp' >
  <CrudEmployee />
  </div>

</div>
    </>
  )
}

export default Employee