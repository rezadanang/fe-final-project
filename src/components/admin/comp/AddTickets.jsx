import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddTickets() {
    const getToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM"
    const navigate = useNavigate();
    const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})
    const [validated, setValidated] = useState(false);
    const [values, setValues] = useState({
        airplane_name: "",
        departureTime: "",
        arrivalTime: "",
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
                departure_time: values.departureTime,
                arrival_time: values.arrivalTime,
                return_time: values.returnTime,
                arrival2_time: values.arrival2Time,
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
          navigate("/admin");
          alert("berhasil menambahkan tiket")
          }
          
          catch (err) {
              console.log(err)
          }
    }
  return (
    <>
      <div className='container'>
      <form onSubmit={handleSubmitTicket}>
      <div class="form-group">
        <label for="exampleInputEmail1">Airplane Name</label>
        <input type="text" class="form-control" id='airplane_name' placeholder="Airline" onChange={(e)=>setValues({...values,airplane_name:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Departure</label>
        <input type="text" class="form-control" id='departure_time' placeholder="mm-dd-yyyy" onChange={(e)=>setValues({...values,departureTime:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Arrival Time</label>
        <input type="text" class="form-control" id='arrival_time' placeholder="Arrival Time" onChange={(e)=>setValues({...values,arrivalTime:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Return Time</label>
        <input type="text" class="form-control" id='return_time' placeholder="Return Time" onChange={(e)=>setValues({...values,returnTime:e.target.value})} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Arrival Return Time</label>
        <input type="text" class="form-control" id='arrival2_time' placeholder="Arrival Return Time" onChange={(e)=>setValues({...values,arrival2Time:e.target.value})} />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Price</label>
        <input type="text" class="form-control" id='price' placeholder="Rp." onChange={(e)=>setValues({...values,price:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Category</label>
        <select name="category" id="category" onChange={(e)=>setValues({...values,category:e.target.value})} required>
          <option selected value="">select category</option>
          <option value="one_way">One Way</option>
          <option value="round_trip">Round Trip</option>
        </select>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Origin</label>
        <input type="text" class="form-control" id='origin' placeholder="Origin" onChange={(e)=>setValues({...values,origin:e.target.value})} required />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Destination</label>
        <input type="text" class="form-control" id='destination' placeholder="Destination" onChange={(e)=>setValues({...values,destination:e.target.value})} required />
      </div>
      <div className="field">
             <button type="submit" className="btn btn-primary" >
              Add Ticket
            </button>
           </div>
      </form>
    </div>
    </>
  )
}

export default AddTickets