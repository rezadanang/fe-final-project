import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';


const ContainerWrapperForm = styled.div`
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: #4600FF;
    color: white;
    border-radius: 10px;
    padding: 50px 250px
`;

const ButtonWishlist = styled.button`
    background-color: #FFE15D;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid #FFE15D;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;

const ButtonCancel = styled.button`
    background-color: white;
    color: #4600FF;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid white;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;
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

      const cancel = () => {
        navigate('/')
      }

      const wishListTicket = async (e) => {
        e.preventDefault();
        try{
          await axios.post(`https://final-project-be-production-6de7.up.railway.app/api/v1/wishlists/add/${id}`, {
            idTickets: id
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        toast.success('Success added wishlist', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        setTimeout(() => {
          navigate("/")
        }, 3000);
        
       
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
  if (getToken) {
  return (
    <>
   
    <h4 className='text-center mt-4'>Add Wishlist</h4>
    
    <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
    <div className='container p-5'>
    <form>
      <div className='row'>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Price</label>
            <input type="text" class="form-control" value={price} placeholder="null" disabled />
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Airplane</label>
            <input type="text" class="form-control" value={airplane} placeholder="null" disabled />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Departure</label>
            <input type="text" class="form-control" value={newDeparture} placeholder="null" disabled />
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Arrival Time</label>
            <input type="text" class="form-control" value={newArrival} placeholder="null" disabled />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Return Time</label>
            <input type="text" class="form-control" value={newReturn} placeholder="null" disabled />
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Arrival Return Time</label>
            <input type="text" class="form-control" value={newArrival2} placeholder="null" disabled />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
        <div class="form-group">
            <label style={{color:"white"}}>Destination</label>
            <input type="text" class="form-control" value={destination} placeholder="null" disabled />
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Origin</label>
            <input type="text" class="form-control" value={origin} placeholder="null" disabled />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          <div className="field mt-3">
          <ButtonCancel className='mx-auto' onClick={cancel}>Cancel</ButtonCancel>
          </div>
        </div>
        <div className='col lg-6'>
          <div className="field mt-3">
            <ButtonWishlist className='mx-auto' onClick={wishListTicket}>Add</ButtonWishlist>
          </div>
        </div>
      </div>
    </form>
    </div>
  </div> 
  <ToastContainer />
  
    


</>
  )
} else { 
  return (
      <Login />
  )}
}

export default Wishlist