import React, { useState } from "react";
import { Button, Overlay, Popover, Form } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import API_URL from "../../utils/API_URL";
import { sendQuotation } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import {
  setQuotationClose,
  setQuotationShow,
} from "../../redux/slice/EmployeSlice/QuotationSlice";

const SendQuotation = ({ handleClose, show, target, Quotationid }) => {
  const [product, setProduct] = useState({ items: "", amount: null });
  const [checkedItems, setCheckedItems] = useState({
    email: false,
    whatsapp: false,
  });

  let data = useSelector((state) => state.employeedata);
  let { quotationshow, quotationtarget, quotationid } = useSelector(
    (state) => state.quotationsend
  );
  let dispatch = useDispatch();

  const handleChangeProduct = (e) => {
    let { name, value } = e.target;
    setProduct((products) => ({
      ...products,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checkbox) => {
    setCheckedItems((checks) => ({
      ...checks,
      [checkbox]: !checks[checkbox],
    }));
  };

  const handleEmailRedirect = (email) => {
    const subject = "Scheduled Message";
    const body = `Your Item Is ${product.items} and Your Amount is  ${product.amount}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsAppRedirect = (phoneNumber) => {
    const message = `Your Item Is ${product.items} and Your Amount is  ${product.amount}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const handleSend = async (event) => {
    event.preventDefault();

    if (!product) return;

    try {
      const userToUpdate = data.find((user) => user._id === quotationid);
      if (!userToUpdate) {
        console.error("User not found");
        return;
      }

      const updatedUser = { ...userToUpdate, quotation: product };
      const response = await axios.put(
        `${API_URL}/${quotationid}`,
        updatedUser
      );
      dispatch(sendQuotation({ quotationid, quotation: product }));
      dispatch(setQuotationShow(false));
      console.log(response.data);
      handleClear();
    } catch (error) {
      console.error("Error updating:", error);
      setProduct({ items: "", amount: 0 });
      setCheckedItems({ email: false, whatsapp: false });
    }

    data.map((item) => {
      if (item._id === quotationid) {
        if (checkedItems.whatsapp) {
          handleWhatsAppRedirect(91 + item.mobile_number);
        }
        if (checkedItems.email) {
          handleEmailRedirect(item.email);
        }
      }
    });
  };
  const handleClear = () => {
    dispatch(setQuotationClose(false));
    setCheckedItems(true);
    setProduct("");
  };

  return (
    <>
      <Overlay
        show={quotationshow}
        target={() => document.getElementById(quotationtarget)}
        placement="right"
      >
        <Popover
          id="popover-contained"
          className="overlay"
          // onMouseLeave={handleClear}
        >
          <Popover.Header as="h3">
            Quotation{" "}
            <XLg
              onClick={handleClear}
              style={{ cursor: "pointer", float: "right" }}
            />
          </Popover.Header>
          <Popover.Body>
            <form onSubmit={handleSend}>
              <div className=" m-2">
                <div className="py-2">
                  <input
                    type="text"
                    name="items"
                    id="quotationtext"
                    className="input"
                    placeholder="Product"
                    // className="form-control"
                    value={product.items}
                    onChange={handleChangeProduct}
                    autoComplete="on"
                  />
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
                  <input
                    type="checkbox"
                    checked={checkedItems.whatsapp}
                    onChange={() => handleCheckboxChange("whatsapp")}
                    className="input"
                  />{" "}
                  &nbsp; &nbsp;WhatsApp
                  {/* <label>WhatsApp</label> */}
                </div>
                <div className="py-2">
                  <input
                    type="checkbox"
                    checked={checkedItems.email}
                    onChange={() => handleCheckboxChange("email")}
                    className="input"
                  />{" "}
                  &nbsp; &nbsp; Email
                  {/* <label>Email</label> */}
                </div>
                <Button id="btn" type="submit">
                  Send
                </Button>
              </div>
            </form>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default SendQuotation;
