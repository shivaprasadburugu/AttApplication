import { TextField, InputAdornment } from "@mui/material"
import CalendarIcon from '@mui/icons-material/CalendarMonth'
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
import { get } from '../../Services/AppServices';
import "./DashBoard.css";

const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [errorphone, setErrorphone] = useState("");
  const [errorname, setErrorname] = useState("");
  const [errorevent, setErrorevent] = useState("");
  const [errordate, setErrordate] = useState("");
  const [erroramount, setErroramount] = useState("");
  const [errortotal,setErrortotal] = useState("");
  const [dueamount,setDueamount]=useState("");
  // Function to toggle popup visibility
  const togglePopup = () => {
    debugger
    setIsOpen(!isOpen);

  };
  const togglePopup1 = () => {
    debugger
    setIsOpen1(!isOpen1);
    //setDueamount("");

  };

  const [eventDate1, setEventDate1] = useState();
  const [eventDetails, setEventDetails] = useState({
    customer_name: '',
    phone_number: '',
    event_name: '',
    event_date: '',
    advance_amount: '',
    total_amount:'',
  })
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value
    });

  };
  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const BookNowClicked = async () => {
    debugger
    if (!eventDetails.phone_number.trim()) {
      setErrorphone("Phone number is required.");
      //return;
    } else {
      setErrorphone("");
    }

    //setErrorphone(""); // Clear any existing errors
    if (!eventDetails.customer_name.trim()) {
      setErrorname("customer_name is required.");
      //return;
    } else {
      setErrorname("");
    }

    //setErrorname(""); // Clear any existing errors
    if (!eventDetails.event_name.trim()) {
      setErrorevent("event_name is required.");
      //return;
    } else {
      setErrorevent("");
    }

    //setErrorevent(""); // Clear any existing errors
    if (eventDate1 == "") {
      debugger
      setErrordate("event_date is required.");
      //return;
    } else {
      setErrordate("");
    }

    //setErrordate(""); // Clear any existing errors
    if (!eventDetails.advance_amount.trim()) {
      setErroramount("advance_amount is required.");
      //return;
    } else {
      setErroramount("");
    }
    if (!eventDetails.total_amount.trim()) {
      setErrortotal("total_amount is required.");
      //return;
    } else {
      setErrortotal("");
    }
    if (eventDetails.advance_amount == "" || eventDetails.customer_name == "" || eventDetails.phone_number == "" || eventDetails.event_name == "" || eventDate1 == "" || eventDetails.total_amount == "") {
      return
    }
    
    console.log("Form submitted successfully:", eventDetails);
    debugger
    console.log("Function Hall Booked For Your Event")
    console.log('eventDetails : ', eventDetails)
    const formattedDate = convertDate(eventDate1);
    console.log("FormattedDate : ", formattedDate);
    eventDetails.event_date = formattedDate;
    console.log('Final Data : ', eventDetails);
    const url = 'Employee/GetInactiveEmployeesList';
    const response = await get(url);
    const events = response.data.data.Table1;
    let count = 0;
    events.map(event => {
      console.log("event : ", event)
      console.log('evneti :', event.inactivedate);

      if (event.inactivedate == formattedDate) {
        debugger
        count += 1;
        console.log('Event{i} : ', event.inactivedate)
        togglePopup()
        //setAvailability(true)
      }

    })
    if (count == 0) {
      togglePopup1();
    }
    const due = parseInt(eventDetails.total_amount) - parseInt(eventDetails.advance_amount)
    setDueamount(due.toString());
    console.log("DueAmount : ",dueamount)
  }

  return (
    <div className="container d-flex justify-content-center">
      <div className="row w-100 justify-content-center">
        <div className="col-lg-5 col-12">
          <div className="Addevent">
            <h4 style={{ marginBottom: '20px', marginTop: '30px', textAlign: 'center' }}>New Booking</h4>
            <h5>Customer Information</h5>
          
            <div className="d-flex flex-row">
              <div >
                <TextField
                  id="customer name"
                  name="customer_name"
                  label="Customer_Name"
                  variant="standard"
                  required
                  value={eventDetails.customer_name}
                  onChange={handleInputChange}
                  style={{ flex: 1, marginBottom: '16px', marginRight: '15px' }}

                />
                {errorname && <p style={{ color: "red", fontSize: '10px' }}>{errorname}</p>}
              </div>

              <div>

                <TextField
                  id="phone number"
                  name="phone_number"
                  label="Phone_Number"
                  variant="standard"
                  value={eventDetails.phone_number}
                  onChange={handleInputChange}
                  required
                  style={{ flex: 1, marginBottom: '16px' }}
                />
                {errorphone && <p style={{ color: "red", fontSize: '10px' }}>{errorphone}</p>}

              </div>
              </div>

            
            <div className="d-flex flex-row">
              <div>
                <TextField
                  id="event name"
                  name="event_name"
                  label="Event_Name"
                  variant="standard"
                  required
                  value={eventDetails.event_name}
                  onChange={handleInputChange}
                  style={{ flex: 1, marginBottom: '16px', marginRight: '15px' }}
                />
                {errorevent && <p style={{ color: "red", fontSize: '10px' }}>{errorevent}</p>}

              </div>

              <div>
                <div className="" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1, marginBottom: '16px', marginBottom: '15px' }}>
                  <DatePicker
                    selected={eventDate1}
                    onChange={(date) => setEventDate1(date)}
                    dateFormat="dd-MM-yyyy"
                    customInput={
                      <TextField
                        variant="outlined"
                        size="small"
                        name='event_date'
                        label="Event_Date"
                        required
                        InputProps={{
                          readOnly: true, style: { height: '55px' }, endAdornment: (
                            <InputAdornment position="end">
                              <CalendarIcon />
                            </InputAdornment>
                          ),
                        }}

                      />
                    }
                  />

                </div>
                {errordate && <p style={{ color: "red", fontSize: '10px' }}>{errordate}</p>}
              </div>

            </div>
            <div className="d-flex flex-row">
              <div>
                <TextField
                  id="advance amount"
                  name="advance_amount"
                  label="Advance_Amount"
                  variant="standard"
                  required
                  value={eventDetails.advance_amount}
                  onChange={handleInputChange}
                  style={{ flex: 1, marginBottom: '16px', marginRight: '15px' }}
                />
                {erroramount && <p style={{ color: "red", fontSize: '10px' }}>{erroramount}</p>}
              </div>
              <div>

                <TextField
                  id="Total amount"
                  name="total_amount"
                  label="Total_Amount"
                  variant="standard"
                  required
                  value={eventDetails.total_amount}
                  onChange={handleInputChange}
                  style={{ flex: 1, marginBottom: '16px' }}
                />
                {errortotal && <p style={{ color: "red", fontSize: '10px' }}>{errortotal}</p>}

              </div>
            </div>


            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button type="submit" onClick={() => BookNowClicked()} style={{
                flex: 1, marginBottom: '16px', textAlign: 'center', width: '200px', // Set the button's width
                height: '40px', // Set the button's height
                fontSize: '18px', // Increase the font size
                marginBottom: '16px',
                borderRadius: '5px',
                color: 'grey',
                borderColor: 'grey'

              }}>
                Book Now
              </button>
            </div>
          </div>
          {isOpen && (
            <div className="popup-overlay">
              <div className="popup-box">
                <h4 style={{ color: 'red' }}>UNAVAILABLE</h4>
                <p>Aleary An Event Is Booked On Selected Date {eventDate1.toLocaleDateString("en-GB")} Please Choose Another Date </p>
                <button onClick={togglePopup}>Close</button>
              </div>
            </div>
          )}
          {isOpen1 && (
            <div className="popup-overlay">
              <div className="popup-box">
                <h4 style={{ color: 'green' }}>ThankYou</h4>
                <p> Event SuccessFully Booked On Selected Date {eventDate1.toLocaleDateString("en-GB")} Please Pay The Due Amount ASAP {dueamount}</p>
                <button onClick={togglePopup1}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

}
export default AddEvent