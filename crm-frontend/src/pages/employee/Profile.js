import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Popover, Overlay, Button } from "react-bootstrap";
import { XLg } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../assets/style/employecss/Profile.css";
import {
  setProfileData,
  setShow,
} from "../../redux/slice/EmployeSlice/ProfileSlice";
import { addData } from "../../redux/slice/EmployeSlice/EmployeeDataSlice";
import LogoutPage from "./LogoutPage";
const Profile = ({target}) => {
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem('employee'));
  // const employeefullname = profile?.fullname;
  
  
  const { show,profiledata } = useSelector((state) => state.empleeprofile);
  const [refreshInterval, setRefreshInterval] = useState(1000); // Refresh every 5 seconds

  useEffect(() => {
    const loadProfileData = async () => {
      const token = localStorage.getItem('access-token');

      if (token) {
        try {
          const response = await axios.get(`http://localhost:5000/login/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          localStorage.setItem('employee', JSON.stringify(response.data.user));
          dispatch(setProfileData(response.data.user));
        } catch (error) {
          // console.error("Error fetching profile data:", error);
        }
      }
    };

    loadProfileData();
    const intervalId = setInterval(loadProfileData, refreshInterval);

    return () => clearInterval(intervalId);
  }, [ refreshInterval]);


  const handleClear = () => {
    dispatch(setShow(false));
  };

  return (
    <>
      <Overlay
        show={show}
        target={target}
        placement="bottom"
        containerPadding={20}
      >
        <Popover id="popoverId" className="overlay" onMouseLeave={handleClear}>
          <Popover.Header as="h3">
            Profile <XLg onClick={handleClear} id="XlgId" />
          </Popover.Header>
          <Popover.Body>
            <div className="profile-container" id="profileCard">
              <div className="card">
                <div className="card-header">
                  <img
                    src={profiledata.photo}
                    className="profile-pic"
                    alt="Employee"
                  />
                </div>
                <div className="card-body">
                  <h6>
                    <strong>Name:</strong> {profiledata.fullname}
                  </h6>
                  
                  <h6>
                    <strong>Phone Number:</strong> {profiledata.number}
                  </h6>
                
                  <h6>
                    <strong>Designation:</strong> {profiledata.designation}
                  </h6>
                
                </div>
                <div className="card-footer">
                  <LogoutPage /> Logout
                </div>
              </div>
            </div>
          </Popover.Body>
        </Popover>
      </Overlay>
    </>
  );
};

export default Profile;
