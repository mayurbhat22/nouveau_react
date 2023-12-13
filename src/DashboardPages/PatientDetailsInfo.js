import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../css/PatientDetailsInfo.css";
import Dashboard from "../components/Dashboard";
function PatientDetailsInfo(props) {
  // let BASE_URL = "http://localhost:8080";
  let BASE_URL = "https://nouveau-app.azurewebsites.net";
  const [patientDataInfo, setPatientDataInfo] = useState([]);
  const doctorID = Number(sessionStorage.getItem("userid"));
  const role = sessionStorage.getItem("role");
  const { patientID, patientName } = useParams();
  console.log("Patient ID:", patientID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/doctor/patientdetails/patientdetailsInfo/${patientID}/${doctorID}`,
          {
            doctorID: doctorID,
            patientID: patientID,
            patientName: patientName,
          }
        );
        setPatientDataInfo(response.data[0]);
        console.log(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [doctorID, patientID, patientName]);

  return (
    <>
      <Dashboard role={role} />
      <div className="infoParent">
        <div className="patientName">
          <strong>
            You are now viewing patient's appointment history details
          </strong>
        </div>
        <div className="infoPatientBox">
          {patientDataInfo ? (
            patientDataInfo.map((patientDetails, index) => (
              <div className="infoPatient" key={index}>
                <div>Appointment Booking Date: {patientDetails.date}</div>
                <div>Appointment Booked For: {patientDetails.symptoms}</div>
                <div>
                  Did the patient take a Covid test? :{" "}
                  {patientDetails.covidtest ? "Yes" : "No"}
                </div>
              </div>
            ))
          ) : (
            <div>Loading patient information...</div>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientDetailsInfo;
