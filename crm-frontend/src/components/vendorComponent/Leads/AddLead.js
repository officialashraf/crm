import React, { useState } from 'react'
import { Modal,Button } from 'react-bootstrap'
import { setLeadId,setAddLeadShow,setBulkDeleteShow,setBulkLeadShow,setLeadData } from '../../../redux/slice/VendorSlice/AddLeadSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const AddLead = () => {

  let dispatch = useDispatch()
  let {addleadshow,LeadId} = useSelector((state)=>state.leads)
   let {adminshow,adminprofile} = useSelector((state)=>state.addEmp)
  let [name, setName] = useState('')
  let [mobile_number, setMobile_number] = useState('')
  let [email, setEmail] = useState('')
  // let [employeeid, setEmployeeId] = useState()

  
  let handleAsign = async(event)=>{
  event.preventDefault()

  if(!LeadId || !adminprofile._id){
    console.error("id is missing")
    return
  }
  try{
    const response = await axios.post(`http://localhost:5000/leads/asignlead`,{name,mobile_number,email, employeeid: LeadId, adminId:adminprofile._id})
    dispatch(setLeadData(response.data))
    console.log(response.data)
    dispatch(setAddLeadShow(false))
    setName("")
    setMobile_number('')
    setEmail('')
  }catch(error){
    console.error("error this data post", error)
  }
}


let handleClose = ()=>{
  dispatch(setAddLeadShow(false))
  setName("")
  setMobile_number("")
  setEmail("")
}
  return (
    <div>
    <Modal show={addleadshow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Lead</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='container-fluid'>
          <div className='row'>
            <form onSubmit={handleAsign}>
              <div className='p-3'>
                <label> Name </label>
                <input type='text' name='name' onChange={(e)=>setName(e.target.value)} value={name} className='form-control'/>
              </div>
              <div className='p-3'>
                <label> Mobile Number </label>
                <input type='text'name='mobile_number' value={mobile_number} onChange={(e)=>setMobile_number(e.target.value)} className='form-control'/>
              </div>
              <div className='p-3'>
                <label> Email</label>
                <input type='text' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control'/>
              </div>
              <button type='submit' className='btn btn-dark'> Submit</button>

            </form>
          </div>
        </div>




      </Modal.Body>
      <Modal.Footer>
     
      </Modal.Footer>
    </Modal>
  </div>
  )
}

export default AddLead