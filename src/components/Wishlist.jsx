import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment'

function Wishlist() {
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

    useEffect(() => {
        getTicketsById();
      }, []);

      const wishListTicket = async (e) => {
        e.preventDefault();
        try{
          await axios.post(`https://final-project-be-production-6de7.up.railway.app/api/v1/wishlists/${id}`, {
            idTickets: id
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        navigate("/");
        alert("berhasil menambahkan wishlist")
        }
        
        catch (err) {
            console.log(err.message)
        }
    };

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
    <div>Order</div>

    <div className='container'>
    <form>
    <div class="form-group">
      <label for="exampleInputEmail1">Id Ticket</label>
      <input type="text" class="form-control" value={idTickets} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Airplane</label>
      <input type="text" class="form-control" value={airplane} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Departure</label>
      <input type="text" class="form-control" value={newDeparture} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Arrival Time</label>
      <input type="text" class="form-control" value={newArrival} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Return Time</label>
      <input type="text" class="form-control" value={newReturn} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Arrival Return Time</label>
      <input type="text" class="form-control" value={newArrival2} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Price</label>
      <input type="text" class="form-control" value={price} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Origin</label>
      <input type="text" class="form-control" value={origin} placeholder="null" disabled />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Destination</label>
      <input type="text" class="form-control" value={destination} placeholder="null" disabled />
    </div>
    <div className="field">
           <button className="btn btn-primary" onClick={wishListTicket}> Add Wishlist</button>
    </div>
    </form>
  </div>


</>
  )
}

export default Wishlist