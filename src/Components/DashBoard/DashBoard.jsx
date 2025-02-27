import { Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'
import axios from 'axios';
import { useEffect, useState } from 'react';
import './DashBoard.css';
import { useNavigate  } from 'react-router-dom';
import { get } from '../../Services/AppServices';

function DashBoard() {
  //const navigate = useNavigate();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const headers = {
    headers: { 'Content-Type': 'application/json' },
  }
  const FetchEvents = async () => {
    try {
      debugger
      const url = 'Employee/GetInactiveEmployeesList';
      const response = await get(url)
      debugger
      console.log('Status : ', response.data.Status);
      console.log('data : ', response.data.data.Table1);
      setData(response.data.data.Table1)
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    debugger
    FetchEvents();

  }, []);
  const openFullDetails = (employeeid) => {
    debugger
    console.log('Onclick Event Triggered')
    console.log('Employeeid : ', employeeid)
    navigate('/dashboard')
  }
  const availabilityCkeck = () => {
    debugger
    console.log("Availability Check : ",window.location.hash );
    console.log("Availability Check Clicked : ",window.location.pathname);
    console.log("Availability Check href : ",window.location.href);
    navigate('/availabilityCheck')
  }
  const bookNewEventClicked = () => {
    debugger
    console.log("Entered Into New Event Booking Form")
    navigate('/addEvent')
  }
  return (
    <div className="Main-Container1 Container">
      <div className="row w-100 justify-content-center Card-Container1">

        <div className='col-12 col-md-12 col-lg-6'>
          <div className='mb-3 d-flex justify-content-center'>
            <h4 style={{ text: 'start', color: 'red' }}>BOOKINGS</h4>
            <AddIcon style={{ marginLeft: '20px', marginTop: '4px', color: 'red' }}
              onClick={() => { console.log("onClick handler assigned correctly"); bookNewEventClicked() }}
            />
          </div>
          <div className="container mt-4">
            <h5 onClick={() => { console.log("onClick handler assigned correctly"); availabilityCkeck() }}
              className="text-left mb-4" style={{ color: 'blue' }}>Availability Check</h5>
            <div className="">
              {data.length > 0 ? (
                data.map((employee) => (<div onClick={() => { console.log("onClick handler assigned correctly"); openFullDetails(employee.employeeid) }}
                  key={employee.employeeid}
                  className="list-group-item d-flex flex-column align-items-start mb-2 p-3"
                  style={{ backgroundColor: 'lightgrey', borderRadius: '5px' }}
                >
                  {/* Name on the first line */}
                  <h5 className="mb-1">{employee.name}</h5>
                  {/* Department | Status on the second line */}
                  <small className="text-muted mb-2">
                    {employee.departmentname} | {employee.inactivedate}
                  </small>
                </div>
                ))
              ) : (
                <div className="text-center">No inactive employees found.</div>
              )}
            </div>
          </div>



        </div>

      </div>

    </div>

  );

}
export default DashBoard