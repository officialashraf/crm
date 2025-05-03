import React, { useState ,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { XLg } from "react-bootstrap-icons";
import { updateEmail } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../utils/API_URL";
import { setEmailClose,setEmailShow } from "../../redux/slice/EmployeSlice/EmailUpdateSlice";

const EmailEdit = () => {
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(""); // For error feedback
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  
  let data = useSelector((state) => state.employeedata);
  let {emailshow, emailtarget, emailid} = useSelector((state)=>state.emailupdate)
  

  const selectedUser = data.find((user) => user._id === emailid);

  // Set email when popover opens
  useEffect(() => {
    if (emailshow && selectedUser) {
      setNewEmail(selectedUser.email); // Show existing email in input field
    }
  }, [emailshow]);


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setNewEmail(email)
    if (!email.trim()) {
      setError("");
    } else if (emailRegex.test(email)) {
      setError("")
    }
  };

  const handleEmailClick = async (event) => {
    event.preventDefault();

    if (!newEmail.trim()) {
      setError("Please enter a valid email.");
      return;
    }

    if (!emailRegex.test(newEmail)) {
      setError("Please enter a valid email format.");
      return;
    }

    setNewEmail("");
    setError("");
    setLoading(true);

    try {
      const userToUpdate = data.find((user) => user._id === emailid);
      if (!userToUpdate) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      const updatedUser = { ...userToUpdate, email: newEmail };
      
      const response = await axios.put(`${API_URL}/${emailid}`, updatedUser);
      dispatch(updateEmail({ emailid, email: newEmail }));
      console.log("Updated user:", response.data);

      dispatch(setEmailShow(false));
    } catch (error) {
      console.error("Error updating email:", error);
      setError("Failed to update email. Please try again.");
    } finally {
      setError("");
      setLoading(false);
    }
  };
  const handlePopoverClose = () => {
    dispatch(setEmailClose(false));
    setError("");
    setNewEmail("");
    setValidated(false);
  };

  return (
    <Overlay
      show={emailshow}
      target={() => document.getElementById(emailtarget)}
      placement="right"
      containerPadding={50}
      
    >
      <Popover id="popover-contained"
      //  onMouseLeave={handlePopoverClose}
       >
        <Popover.Header as="h3">
          Email
          <XLg
            onClick={handlePopoverClose}
            style={{ cursor: "pointer", float: "right" }}
          />
        </Popover.Header>
        <Popover.Body>
          <Form onSubmit={handleEmailClick} noValidate validated={validated}>
            <InputGroup className="mb-3">
              <Form.Control
                aria-label="Update Email"
                placeholder="Update Your Email"
                value={newEmail}
                onChange={handleEmailChange}
                isInvalid={!!error}
              />

              <button id="btnupdate" disabled={loading} type="submit">
                {loading ? "Updating..." : "update"}
              </button>
            </InputGroup>
            {error && <div style={{ color: "red" }}>{error}</div>}
          </Form>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
};

export default EmailEdit;
