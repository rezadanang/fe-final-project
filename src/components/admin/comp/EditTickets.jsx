import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../../Login';

function EditTickets() {
    const getToken = localStorage.getItem("token");

    const [idTickets, setIdTickets] = useState("");
    const [airplane, setAirplane] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [arrivalReturnDate, setArrivalReturnDate] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})

    useEffect(() => {
        getTicketsById();
      }, []);

      const updateTickets = async (e) => {
        e.preventDefault();
        try{
          await axios.put(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/update/${id}`, {
            departure_time: departureDate,
            arrival_time: arrivalDate,
            return_time: returnDate,
            arrival2_time: arrivalReturnDate,
            origin : origin,
            price: price,
            category: category,
            destination: destination
          },
          {
          headers: {
            Authorization: 'Bearer ' + getToken
          }
        })
        toast.success('Success edited ticket', {
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
          navigate("/admin")
        }, 3000);
        }
        
        catch (err) {
            console.log(err.message)
        }
    };

    const deleteTicket = async (e) => {
      e.preventDefault();
      try{
        await axios.delete(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/delete/${id}`,{ headers: {"Authorization" : `Bearer ${getToken}`} });
        toast.success('Success deleted ticket', {
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
          navigate("/admin")
        }, 3000);
        }
      catch (err) {
          console.log(err)
      }
  };
  

  

      const getTicketsById = async () => {
        try{const response = await axios.get(`https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/${id}`, { headers: {"Authorization" : `Bearer ${getToken}`} });
        setIdTickets(response.data.data.id);
        setAirplane(response.data.data.airplane_name);
        setDepartureDate(response.data.data.departure_time)
        setArrivalDate(response.data.data.arrival_time)
        setReturnDate(response.data.data.return_time)
        setArrivalReturnDate(response.data.data.arrival2_time)
        setPrice(response.data.data.price)
        setCategory(response.data.data.category)
        setOrigin(response.data.data.origin)
        setDestination(response.data.data.destination)
      }catch (err){
        console.log(err);
      }
        
      };
    
      if (getToken) {
        return (
    <>
      <h4 className='text-center mt-4'>Edit Ticket</h4>
      <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <form onSubmit={updateTickets}>
      <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Id Ticket</label>
              <input type="text" class="form-control" value={idTickets} placeholder="null" onChange={(e) => setIdTickets(e.target.value)} disabled />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Airplane</label>
              <input type="text" class="form-control" value={airplane} placeholder="null" onChange={(e) => setAirplane(e.target.value)} disabled/>
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Departure</label>
              <input type="date" class="form-control" placeholder="null" onChange={(e) => setDepartureDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Arrival Time</label>
              <input type="date" class="form-control" placeholder="null" onChange={(e) => setArrivalDate(e.target.value)} />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Return Time</label>
              <input type="date" class="form-control" placeholder="null" onChange={(e) => setReturnDate(e.target.value)} />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Arrival Return Time</label>
              <input type="date" class="form-control" placeholder="null" onChange={(e) => setArrivalReturnDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Price</label>
              <input type="text" class="form-control" value={price} placeholder="null"  onChange={(e) => setPrice(e.target.value)}/>
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Category</label>
              <input type="text" class="form-control" value={category} placeholder="null"  onChange={(e) => setCategory(e.target.value)}/>
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Origin</label>
              <input type="text" class="form-control" value={origin} placeholder="null" onChange={(e) => setOrigin(e.target.value)} />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Destination</label>
              <input type="text" class="form-control" value={destination} placeholder="null" onChange={(e) => setDestination(e.target.value)} />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div className="field mt-4">
              <button type="submit" className="btn btn-warning" ><FontAwesomeIcon icon={faEdit} />
              Update
              </button>
           </div> 
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div className="field mt-4">
              <button className="btn btn-danger" onClick={deleteTicket}><FontAwesomeIcon icon={faTrash} /> Delete</button>
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
else { 
  return (
    <Login />
  )
}
}

export default EditTickets