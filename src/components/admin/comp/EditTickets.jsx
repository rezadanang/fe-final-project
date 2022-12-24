import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Moment from 'react-moment';
import moment from 'moment'

function EditTickets() {
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

      const updateTickets = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/update/${id}`, {
            origin : origin,
            price: price,
            destination: destination
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        navigate("/id/admin");
        alert("berhasil update")
        }
        
        catch (err) {
            console.log(err.message)
        }
    };

    const deleteTicket = async (e) => {
      e.preventDefault();
      try{
        await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
      navigate("/id/admin");
      alert("berhasil delete")
      }
      catch (err) {
          console.log(err)
      }
  };
  

  

      const getTicketsById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdTickets(response.data.data.id);
        setAirplane(response.data.data.airplane_name);
        setDepartureTime(response.data.data.departure_time)
        setArrivalTime(response.data.data.arrival_time)
        setReturnTime(response.data.data.return_time)
        setArrival2Time(response.data.data.arrival2_time)
        setPrice(response.data.data.price)
        setOrigin(response.data.data.origin)
        setDestination(response.data.data.destination)
      }catch (err){
        console.log(err);
      }
        
      };
    
  return (

    <div className='container mx-auto'>
      <form onSubmit={updateTickets}>
      <div class="form-group">
        <label for="exampleInputEmail1">Id Ticket</label>
        <input type="text" class="form-control" value={idTickets} placeholder="null" onChange={(e) => setIdTickets(e.target.value)} disabled />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Airplane</label>
        <input type="text" class="form-control" value={airplane} placeholder="null" onChange={(e) => setAirplane(e.target.value)} disabled/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Departure</label>
        <input type="text" class="form-control" value={newDeparture} placeholder="null" onChange={(e) => setDepartureTime(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Arrival Time</label>
        <input type="text" class="form-control" value={newArrival} placeholder="null" onChange={(e) => setArrivalTime(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Return Time</label>
        <input type="text" class="form-control" value={newReturn} placeholder="null" onChange={(e) => setReturnTime(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Arrival Return Time</label>
        <input type="text" class="form-control" value={newArrival2} placeholder="null" onChange={(e) => setArrival2Time(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Price</label>
        <input type="text" class="form-control" value={price} placeholder="null"  onChange={(e) => setPrice(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Origin</label>
        <input type="text" class="form-control" value={origin} placeholder="null" onChange={(e) => setOrigin(e.target.value)} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Destination</label>
        <input type="text" class="form-control" value={destination} placeholder="null" onChange={(e) => setDestination(e.target.value)} />
      </div>
      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Update
            </button>
           </div>
           <div className="field">
           <button className="btn btn-danger" onClick={deleteTicket}><FontAwesomeIcon icon={faTrash} /> Delete</button>
           </div>
      </form>
    </div>

  )
}

export default EditTickets