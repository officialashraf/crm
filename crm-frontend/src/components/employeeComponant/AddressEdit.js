import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { XLg } from "react-bootstrap-icons";
import { updateAddress } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../utils/API_URL";
import { setAddressShow,setAddressClose } from "../../redux/slice/EmployeSlice/AddressUpdateSlice";

const AddressEdit = () => {
  const dispatch = useDispatch();
  let data = useSelector((state) => state.employeedata);
  let {addressshow, addresstarget, addressid} = useSelector((state)=>state.addressupdate)

  const [newaddress, setNewaddress] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


const selectedUser = data.find((user) => user._id === addressid);

  // Set email when popover opens
  useEffect(() => {
    if (addressshow && selectedUser) {
      setNewaddress(selectedUser.address); // Show existing email in input field
    }
  }, [addressshow]);




  const handleAddressClick = async (event) => {
    event.preventDefault();
    if (!newaddress || !newaddress.trim()) {
      setError("Please enter Your Address.")
      return;
    }
    setNewaddress("");
    setError("");
    try {
      const userToUpdate = data.find((user) => user._id === addressid);
      if (!userToUpdate) {
        console.error("User not found");
        return;
      }
      const updatedUser = { ...userToUpdate, address: newaddress };
      const response = await axios.put(`${API_URL}/${addressid}`, updatedUser);
      dispatch(updateAddress({ addressid, address: newaddress }));
      console.log("Updated user:", response.data);
      dispatch(setAddressShow(false))
    } catch (error) {
      console.error("Error updating Address:", error);
    }
  };
  const handlePopoverClose = () => {
    dispatch(setAddressClose(false));
    setError("");
    setNewaddress("");
    setLoading(false)
  };
  return (
    <Overlay
      show={addressshow}
      target={() => document.getElementById(addresstarget)}
      placement="right"
      containerPadding={20}
    >
      {/* onMouseLeave={handlePopoverClose} */}
      <Popover id="popover-contained">
        <Popover.Header as="h3">
          Address{" "}
          <XLg
            onClick={handlePopoverClose}
            style={{ cursor: "pointer", float: "right" }}
          />
        </Popover.Header>
        <Popover.Body>
          <Form onSubmit={handleAddressClick}>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Update Address"
                placeholder="Update Your Address"
                value={newaddress}
                onChange={(e) => setNewaddress(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {error}
              </Form.Control.Feedback>
              <button
                id="btnupdate"
                disabled={loading}
                type="submit"
                // onClick={handleClose}
              >
                {loading ? "Updating..." : "Submit"}
              </button>
            </InputGroup>
            {error && <div style={{ color: "red" }}>{error}</div>}{" "}
            {/* Display error message */}
          </Form>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
};

export default AddressEdit;
