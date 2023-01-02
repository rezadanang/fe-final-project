import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from 'moment';


function DetailTickets() {
    const getToken = localStorage.getItem("token");
    const [idTickets, setIdTickets] = useState("");
    const [airplane, setAirplane] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [arrival2Time, setArrival2Time] = useState("");
    const [price, setPrice] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const newDeparture = moment(departureTime).format('HH:mm MM/DD/YYYY');
    const newArrival = moment(arrivalTime).format('HH:mm MM/DD/YYYY');
    const newReturn = moment(returnTime).format('HH:mm MM/DD/YYYY');
    const newArrival2 = moment(arrival2Time).format('HH:mm MM/DD/YYYY');

    const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})

    useEffect(() => {
        getTicketsById();
      }, []);


      const getTicketsById = async () => {
        const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdTickets(response.data.data.id);
        setAirplane(response.data.data.airplane_name);
        setDepartureTime(response.data.data.departure_time)
        setArrivalTime(response.data.data.arrival_time)
        setReturnTime(response.data.data.return_time)
        setArrival2Time(response.data.data.arrival2_time)
        setPrice(response.data.data.price)
        setOrigin(response.data.data.origin)
        setDestination(response.data.data.destination)
      };
    
  return (
      <>
      <h4 className='text-center mt-4'>Detail Ticket</h4>
       <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
        
              <label style={{color:"white"}}>Id Ticket</label>
              <input type="text" class="form-control" value={idTickets} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Airplane</label>
              <input type="text" class="form-control" value={airplane} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Departure</label>
              <input type="text" class="form-control" value={newDeparture} placeholder="null" disabled />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Arrival Time</label>
              <input type="text" class="form-control" value={newArrival} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Return Time</label>
              <input type="text" class="form-control" value={newReturn} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Arrival Return Time</label>
              <input type="text" class="form-control" value={newArrival2} placeholder="null" disabled />
            </div>
          </div>
        </div> 
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Price</label>
              <input type="text" class="form-control" value={price} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Origin</label>
              <input type="text" class="form-control" value={origin} placeholder="null" disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Destination</label>
              <input type="text" class="form-control" value={destination} placeholder="null" disabled />
            </div>
          </div>
        </div> 
    </div>
  </div>

 
</>

  )
}

export default DetailTickets