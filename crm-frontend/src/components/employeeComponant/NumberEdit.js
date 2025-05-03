import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { XLg} from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import {updateNumber} from '../../redux/slice/EmployeSlice/EmployeeDataSlice'
import API_URL from '../../utils/API_URL';
import { setNumberShow, setNumberClose } from '../../redux/slice/EmployeSlice/NumberUpdateSlice';

const NumberEdit = () => {
  const [newnumber, setNewNumber] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
   let dispatch = useDispatch();
   let data = useSelector((state)=>state.employeedata)
   let {numbershow, numbertarget, numberid} = useSelector((state)=>state.numberupdate)

   const selectedUser = data.find((user) => user._id === numberid);
   
     useEffect(() => {
       if (numbershow && selectedUser) {
        setNewNumber(selectedUser.mobile_number); // Show existing email in input field
       }
     }, [numbershow]);
   

  const handleNumberChanage = (e)=>{
    setNewNumber(e.target.value);
    console.log(newnumber)
    if (!newnumber || isNaN(newnumber)) {
      setError("Please enter a valid Number.");
      return;
    }else{
      setError("");

    }
  }

    const handleMobileClick = async (event) => {
        event.preventDefault();
        if (!newnumber.trim()) {
            setError("Please enter Your Mobile Number.");
            return;
          }
        if (!newnumber || newnumber.length > 10) {
            setError("Please enter max 10 Number");
            return;
          }
        if (!newnumber || newnumber.length < 10) {
            setError("Please enter min 10 number");
            return;
          }
      setNewNumber("");
    
        try {
          const userToUpdate = data.find((user) => user._id === numberid);
          if (!userToUpdate) {
            console.error("User not found");
            return;
          }
          const updatedUser = { ...userToUpdate, mobile_number: newnumber };
    
          const response = await axios.put(
            `${API_URL}/${numberid}`,
            updatedUser
          );
          dispatch(updateNumber({numberid,number:newnumber}))
          
          dispatch(setNumberShow(false))
        } catch (error) {
          console.error("Error updating email:", error);
        }
      };
      const handlePopoverClose = () => {
      dispatch(setNumberClose(false))
        setError(""); 
        setNewNumber("");
      };


  return (
    <>
    <Overlay show={numbershow} target={() => document.getElementById(numbertarget)}  placement="right"  containerPadding={20}>
      <Popover id="popover-contained"
      //  onMouseLeave={handlePopoverClose}
       >
      <Popover.Header as="h3">Number <XLg onClick={handlePopoverClose} style={{cursor:"pointer", float:"right"}}/></Popover.Header>
        <Popover.Body>
          <Form onSubmit={handleMobileClick}>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Update Mobile Number"
                placeholder="Update Your Mobile Number"
                value={newnumber}
                onChange={handleNumberChanage} 
              />
               <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
              <button
              id="btnupdate"
                disabled={loading} 
                type='submit'
              >
                {loading ? "Updating..." : "Submit"}
              </button>
            </InputGroup>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
          </Form>
        </Popover.Body>
      </Popover>
    </Overlay>
    </>
  )
}

export default NumberEdit