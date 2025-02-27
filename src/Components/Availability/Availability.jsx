import {TextField,InputAdornment }  from '@mui/material';
import React, { useState } from 'react';
import {get } from '../../Services/AppServices'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DatePicker from 'react-datepicker';
import '../DashBoard/DashBoard.css';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@mui/icons-material/CalendarMonth';
const AvailabilityCheck =  () =>{
    const [holidaydate, setHolidayDate] = useState(new Date());
    const [availability,setAvailability] = useState();
    
    const getStatusClicked = async (holidaydate) =>{
      setAvailability(false)
        debugger
        console.log("getStatusClicked")
        console.log(holidaydate);
        const originalDate =holidaydate;
      const formattedDate = convertDate(originalDate);
      console.log("FormatedDate : ",formattedDate);
      const url = 'Employee/GetInactiveEmployeesList';
      const response =  await get(url)
      const eventDate = response.data.data.Table1;
      eventDate.map(event =>{
        debugger
        console.log("event : ",event)
        console.log('evneti :',event.inactivedate);
        if(event.inactivedate == formattedDate){
          debugger
          console.log('Event{i} : ',event.inactivedate)
          setAvailability(true)
        }
       })
      

    }
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
      
      
    return(
        <div className='d-flex flex-column align-items-center mt-5'>
            <div className='mb-4'>
            <h5>AVAILABILITY CHECK</h5>
            </div>
            
            <div className="" style={{ display: 'flex',flexDirection:'row', alignItems: 'center', flex: 1, marginBottom: '16px',marginBottom:'15px' }}>
                                    <DatePicker
                                        selected={holidaydate}
                                        onChange={(date) => setHolidayDate(date)}
                                        dateFormat="dd-MM-yyyy"
                                        customInput={
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                label="Event Date"
                                                InputProps={{ readOnly: true, style: { height: '55px' }, endAdornment: (
                                                    <InputAdornment position="end">
                                                      <CalendarIcon />
                                                    </InputAdornment>
                                                  ), }}
                                                
                                            />
                                        }
                                    />
                                    
                                </div>
            <div>
            <button style={{size:'40px',borderRadius:'7px'}} onClick={()=>getStatusClicked(holidaydate)}>
                Get Status
            </button>
                
            </div>  
            <div className='mt-5'>
      {availability == true ? (
        <div>
          <h4 style={{color:'red'}}>UNAVAILABLE</h4>
        </div>
      ) : availability == false ? (
        <div>
          <h5 style={{textAlign:'center',color:'grey'}}>STATUS</h5>
          <h4 style={{color:'green'}}>AVAILABLE</h4>
          </div>
      ) : (
        <div></div>
      )}
    </div>
           
        </div>
    )

}
export default AvailabilityCheck