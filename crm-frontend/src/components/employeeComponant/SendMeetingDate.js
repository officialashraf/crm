import React, { useEffect, useState } from "react";
import { Button, Form, Overlay, Popover } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { XLg } from "react-bootstrap-icons";
import userEvent from "@testing-library/user-event";
import { sendMeetingDate } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import axios from "axios";
import API_URL from "../../utils/API_URL";
import { ResponsiveDateTimePickers } from "./ResponsiveDateTimePickers";
import {setMeetingDateClose, setMeetingDateShow} from "../../redux/slice/EmployeSlice/MeetingDateSlice";

const SendMeetingDate = () => {
  const [dateTime, setDateTime] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    whatsapp: false,
    email: false,
  });
  let data = useSelector((state) => state.employeedata);
  let { meetingdateshow, meetingdatetarget, meetingdateid } = useSelector(
    (state) => state.meetingdatesend
  );

  let dispatch = useDispatch();
  const handledatetime = (date) => {
    setDateTime(date);
  };


  const handleCheckboxChange = (platform) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [platform]: !prevState[platform],
    }));
  };
  

  const handleEmailRedirect = (email) => {
    const subject = "Scheduled Message";
    const body = `Hello, this is a prefilled email body!${new Date(
      dateTime
    ).toLocaleString()}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleWhatsAppRedirect = (phoneNumber) => {
    const message = `Hello, this is a prefilled email body!${new Date(
      dateTime
    ).toLocaleString()}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

 
  const handleSend = async (event) => {
    event.preventDefault();

    if (!dateTime) return;

    let newDate = new Date(dateTime).toLocaleString("en-IN");
    try {
      const userToUpdate = data.find((user) => user._id === meetingdateid);
      if (!userToUpdate) {
        console.error("User not found");
        return;
      }
      const updatedUser = { ...userToUpdate, meeting_time: newDate };
      const response = await axios.put(
        `${API_URL}/${meetingdateid}`,
        updatedUser
      );
      dispatch(sendMeetingDate({ meetingdateid, meeting_time: newDate }));
      console.log("Updated user:", response.data);
      dispatch(setMeetingDateShow(false));
      handleClear()
    } catch (error) {
      console.error("Error updating Address:", error);
    }
    data.map((item) => {
      if (item._id === meetingdateid) {
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
    dispatch(setMeetingDateClose(false));
    setCheckedItems(true);
    setDateTime(null);
  };

  return (
    <Overlay
      show={meetingdateshow}
      target={() => document.getElementById(meetingdatetarget)}
       placement="right"
      id="over"
    >
      <Popover
        id="popover-contained"
        // onMouseLeave={handleClear}
        className="overlay"
      >
        <Popover.Header as="h3">
          Meeting Date & Time{" "}
          <XLg
            onClick={handleClear}
            style={{ cursor: "pointer", float: "right" }}
          />
        </Popover.Header>
        <Popover.Body>
          <Form onSubmit={handleSend}>
            <div className="col-md-10 m-4">
              <div className="py-2">
                <label>Date-Time</label>
                <ResponsiveDateTimePickers
                  onChange={handledatetime}
                  value={dateTime}
                />
              </div>
              <br />
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checkedItems.whatsapp}
                  onChange={() => handleCheckboxChange("whatsapp")}
                />
                &nbsp; <label>WhatsApp</label>
              </div>
              &nbsp;
              <div>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={checkedItems.email}
                  onChange={() => handleCheckboxChange("email")}
                />
                &nbsp; <label>Email</label>
              </div>
            </div>

            <Button id="btn" type="submit">
              Send
            </Button>
          </Form>
        </Popover.Body>
      </Popover>
    </Overlay>
  );
};

export default SendMeetingDate;
