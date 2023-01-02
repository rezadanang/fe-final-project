import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

function AddTickets() {
    const getToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})
    const [validated, setValidated] = useState(false);
    const [departureDate, setDepartureDate] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [arrivalReturnDate, setArrivalReturnDate] = useState("");
    // const timeDeparture = new Date().toISOString(departureDate);

    const [values, setValues] = useState({
        airplane_name: "",
        price: "",
        category: "",
        origin: "",
        destination: ""
    })

    const handleSubmitTicket = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://final-project-be-production-6de7.up.railway.app/api/v1/tickets/add', {
                airplane_name: values.airplane_name,
                departure_time: departureDate,
                arrival_time: arrivalDate,
                return_time: returnDate,
                arrival2_time: arrivalReturnDate,
                price: values.price,
                category: values.category,
                origin: values.origin,
                destination: values.destination
            },
            {
            headers: {
              Authorization: 'Bearer ' + getToken
            }
          })
          toast.success('Success added ticket', {
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
    }
  return (
    <>
    <h4 className='text-center mt-4'>Add Ticket</h4>  
     <div className='container' style={{backgroundColor:"#4600FF", borderRadius:"20px"}}>
      <div className='container p-5'>
      <form onSubmit={handleSubmitTicket}>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Airplane Name</label>
              <input type="text" class="form-control" id='airplane_name' placeholder="Airline" onChange={(e)=>setValues({...values,airplane_name:e.target.value})} required />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Departure</label>
              <input type="date" class="form-control" id='departure_time' placeholder="mm-dd-yyyy" onChange={(e) => setDepartureDate(e.target.value)} required />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Arrival Time</label>
              <input type="date" class="form-control" id='arrival_time' placeholder="Arrival Time" onChange={(e) => setArrivalDate(e.target.value)} required />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Return Time</label>
              <input type="date" class="form-control" id='return_time' placeholder="Return Time" onChange={(e) => setReturnDate(e.target.value)} />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Arrival Return Time</label>
              <input type="date" class="form-control" id='arrival2_time' placeholder="Arrival Return Time" onChange={(e) => setArrivalReturnDate(e.target.value)} />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Price</label>
              <input type="text" class="form-control" id='price' placeholder="Rp." onChange={(e)=>setValues({...values,price:e.target.value})} required />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Category</label>
              <select class="form-select" name="category" id="category" onChange={(e)=>setValues({...values,category:e.target.value})} required>
                <option selected value="">select category</option>
                <option value="one_way">One Way</option>
                <option value="round_trip">Round Trip</option>
              </select>
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Origin</label>
              <input type="text" class="form-control" id='origin' placeholder="Origin" onChange={(e)=>setValues({...values,origin:e.target.value})} required />
            </div>
          </div>
          <div className='col lg-4 md-4 xs-12'>
            <div class="form-group">
              <label style={{color:"white"}}>Destination</label>
              <input type="text" class="form-control" id='destination' placeholder="Destination" onChange={(e)=>setValues({...values,destination:e.target.value})} required />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col lg-4 md-4 xs-12'>
            
          </div>
          <div className='col lg-4 md-4 xs-12'>
            
          </div>
          <div className='col lg-4 md-4 xs-12'>
          <div className="field mt-2">
             <button type="submit" className="btn btn-warning" ><FontAwesomeIcon icon={faCirclePlus} /> Add Ticket
            </button>
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

export default AddTickets