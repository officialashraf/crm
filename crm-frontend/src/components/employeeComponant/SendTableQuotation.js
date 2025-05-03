import React, { useState } from "react";
import {Button,Overlay,Popover,Form} from "react-bootstrap";
import { Modal, Box, TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { XLg} from 'react-bootstrap-icons';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_URL from "../../utils/API_URL";
import { sendQuotation } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import { setQuotationClose, setQuotationShow } from "../../redux/slice/EmployeSlice/QuotationSlice";


const SendTableQuotation = () => {
    const [product, setProduct] = useState({ items: '', amount: null } );
    const [checkedItems, setCheckedItems] =useState({email: false, whatsapp: false})
    
  let data = useSelector((state)=>state.employeedata)
  let {quotationshow,quotationtarget,quotationid} = useSelector((state)=>state.quotationsend)
  let dispatch = useDispatch();
  
    const handleChangeProduct = (e)=>{
    let {name, value} = e.target
      setProduct((products)=>({
        ...products,
        [name]:value,
      }))
    };
  
    const handleCheckboxChange = (checkbox)=>{
      setCheckedItems((checks)=>({
        ...checks,
        [checkbox]:!checks[checkbox],
      }));
    }
  
    const handleEmailRedirect = (email)=>{
      const subject = "Scheduled Message";
      const body = `Your Item Is ${product.items} and Your Amount is  ${product.amount}`;
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;
    }
  
  const handleWhatsAppRedirect = (phoneNumber)=>{
    const message = `Your Item Is ${product.items} and Your Amount is  ${product.amount}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  }
  
  const handleSend = async(event)=>{
    event.preventDefault(); 
  
    if(!product) return;
    
    try {
      const userToUpdate = data.find(user => user._id === quotationid);
      if (!userToUpdate) {
        console.error("User not found");
        return;
      }
  
      const updatedUser = { ...userToUpdate, quotation: product};
      const response = await axios.put(`${API_URL}/${quotationid}`, updatedUser);
      dispatch(sendQuotation({quotationid, quotation:product}))
      dispatch(setQuotationShow(false))
      console.log(response.data);
      handleClear()
    } catch (error) {
      console.error("Error updating:", error);
      setProduct({ items: '', amount: 0 });
      setCheckedItems({ email: false, whatsapp: false });
  
    }
  
        data.map((item)=>{
      if(item._id === quotationid){
        if(checkedItems.whatsapp){
          handleWhatsAppRedirect(91+ item.mobile_number)
        }
        if(checkedItems.email){
          handleEmailRedirect(item.email)
        }
      }
  
    })
  
  }
  const handleClear = ()=>{
    dispatch(setQuotationClose(false))
    setCheckedItems(true);
    setProduct("");
  }
  
  return (
    <Modal open={quotationshow} onClose={handleClear}>
      <Box sx={{ width: 400, bgcolor: "white", p: 3, m: "auto", mt: 5, borderRadius: 2 }}>
                <form onSubmit={handleSend}>
                  <div className=" m-2">
                    <div className="py-2">
                      <input type="text" className="form-control" autoComplete="on" name="items" value={product.items} onChange={handleChangeProduct}/>
                        {/* <Form.Select id="formselect" name="items" value={product.items}   
                        // onChange={(e) =>
                        //  setProduct({ ...product, items: e.target.value })}
                        //  onChange={handleSelectChange} 
                         >
                          <option value=''>Select Product</option>
                      {
                        data.map((item)=>(
                            <option key={item._id} value={item.quotation.items}>
                        {item.quotation.items}</option>
                      ))
                    }
                        </Form.Select> */}
                    </div>
                    <hr />
                    <div className="py-2">
                      <input
                        type="text"
                        name="amount"
                        className="input"
                        id="quotationtext"
                        placeholder="Amount"
                        value={product.amount}
                        onChange={handleChangeProduct}
                        autoComplete="off"
                        />
                      &nbsp;
                      <hr />
                    </div>
                    <div className="py-2">
                      <input type="checkbox" checked={checkedItems.whatsapp} onChange={()=>handleCheckboxChange("whatsapp")} className="input" />  &nbsp;  &nbsp;WhatsApp
                      {/* <label>WhatsApp</label> */}
                    </div>
                    <div className="py-2">
                       <input type="checkbox" checked={checkedItems.email} onChange={()=>handleCheckboxChange("email")} className="input" /> &nbsp;  &nbsp; Email
                      
                      {/* <label>Email</label> */}
                    </div>
                    <Button id="btn" type="submit">
                      Send
                    </Button>
                  </div>
                        </form>
                        </Box>
                        </Modal>
    
  )
}

export default SendTableQuotation