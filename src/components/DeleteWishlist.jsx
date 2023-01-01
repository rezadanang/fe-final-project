import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment'
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonDeleteWishlist = styled.button`
    background-color: red;
    color: white;
    font-size: 1em;
    font-weight: bold;
    padding: 0.25em 1em;
    border: 2px solid red;
    border-radius: 30px;
    margin-right: 10px;
    display: block;
`;

function DeleteWishlist() {
    const getToken = localStorage.getItem("token");
    const [idWishlist, setIdWishlist] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [returnTime, setReturnTime] = useState("");
    const [arrival2Time, setArrival2Time] = useState("");
    const [price, setPrice] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    
    const navigate = useNavigate();
    const { id } = useParams();

    const newDeparture = moment(departureTime).format('HH:mm MM/DD/YYYY');
    const newArrival = moment(arrivalTime).format('HH:mm MM/DD/YYYY');
    const newReturn = moment(returnTime).format('HH:mm MM/DD/YYYY');
    const newArrival2 = moment(arrival2Time).format('HH:mm MM/DD/YYYY');
    const newCreatedAt = moment(createdAt).format('HH:mm MM/DD/YYYY');
    const newUpdatedAt = moment(updatedAt).format('HH:mm MM/DD/YYYY');
    

    useEffect(() => {
        getTicketsById();
      }, []);

      const deleteWishlistTicket = async (e) => {
        e.preventDefault();
        try{
          await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/wishlists/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
          toast.success('Success deleted wishlist', {
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
            console.log(err)
        }
    };

      const getTicketsById = async () => {
        const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/wishlists/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdWishlist(response.data.data.id);
        // setAirplane(response.data.data.airplane_name);
        setDepartureTime(response.data.data.departure_time)
        setArrivalTime(response.data.data.arrival_time)
        setReturnTime(response.data.data.return_time)
        setArrival2Time(response.data.data.arrival2_time)
        setPrice(response.data.data.price)
        setOrigin(response.data.data.origin)
        setDestination(response.data.data.destination)
        setCreatedAt(response.data.data.createdAt)
        setUpdatedAt(response.data.data.updatedAt)
      };
  return (
    <>
  <h4 className='text-center mt-4'>Delete Wishlist</h4>  
    <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
    <div className='container p-5'>
    <form>
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
            <label style={{color:"white"}}>Return</label>
            <input type="text" class="form-control" value={newReturn} placeholder="null" disabled />
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Arrival Return</label>
            <input type="text" class="form-control" value={newArrival2} placeholder="null" disabled />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Created At</label>
            <input type="text" class="form-control" value={newCreatedAt} placeholder="null" disabled />
          </div>
        </div>
        <div className='col lg-6'>
          <div class="form-group">
            <label style={{color:"white"}}>Updated At</label>
            <input type="text" class="form-control" value={newUpdatedAt} placeholder="null" disabled />
          </div>
        </div>
      </div>
      
      <div className='row'>
        <div className='col lg-6'>
          
        </div>
        <div className='col lg-6'>
          <div className="field mt-3">
           <ButtonDeleteWishlist onClick={deleteWishlistTicket}> Delete Wishlist</ButtonDeleteWishlist>
          </div>
        </div>
      </div>
    </form>
    </div>
  </div>
  <ToastContainer />

</>
  )
}

export default DeleteWishlist