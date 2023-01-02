import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap';
import { Button } from 'bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faEdit, faTrash, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from "moment";

function DataTickets() {

const getToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywibmFtZSI6IkFkbWluIiwiZW1haWwiOiJhZG1pbkBiaW5hci5jby5pZCIsInJvbGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJpYXQiOjE2NzE3MTc1MjF9.80QsMAPTPAuD7eyVawX_1VhD1tU-XJSNIkiN2wObOaM";
const [loading, setLoading] = useState(false);
const [tickets, setTickets] = useState([]);
const navigate = useNavigate();
const { id } = useParams();

const getRole = localStorage.getItem("role");

useEffect(() => {
  if (getRole === "CUSTOMER"){
    navigate("/")
  }
})

const getTicketData = async () => {
    try{
        const data = await axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/tickets", { headers: {"Authorization" : `Bearer ${getToken}`} });
        console.log(data.data.data);
        setTickets(data.data.data);
        setLoading(true)
    }
    catch (err) {
        console.log(err)
    }
};

function dateFormat(value, row, index) {
    return moment(value).format('HH:mm DD-MM-YYYY');
 }



const columns = [
    {dataField: "id", text: "ID Ticket", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },
},
    {dataField: "airplane_name", text: "Airplane", sort: "true", headerStyle: () =>{
        return{ width: "7%"};
    },},
    {dataField: "departure_time",formatter: dateFormat, dateFormat, text: "Departure", sort: "true"},
    // {dataField: "return_time", text: "Return"},
    {dataField: "price", text: "Price", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },},
    {dataField: "category", text: "Category", sort: "true", headerStyle: () =>{
        return{ width: "7%"};
    },},
    {dataField: "origin", text: "Origin", sort: "true", headerStyle: () =>{
        return{ width: "10%"};
    },},
    {dataField: "destination", text: "Destination", sort: "true", headerStyle: () =>{
        return{ width: "10%"};
    },},
    // {dataField: "createdBy", text: "Created By", sort: "true", headerStyle: () =>{
    //     return{ width: "5%"};
    // },},
    // {dataField: "updatedBy", text: "Updated By", sort: "true"},
    // {dataField: "deletedAt", text: "Deleted At", sort: "true"},
    {dataField: "createdAt",formatter: dateFormat, dateFormat, text: "Created At", sort: "true"},
    {dataField: "updatedAt",formatter: dateFormat, dateFormat, text: "Updated At", sort: "true"},
    {
        dataField: "",
        text: "Action",
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={"/admin/detail-ticket/" + row.id}>
               <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faInfo} /> Detail</button>
              </Link>
              
    
              <Link to={"/admin/edit-ticket/" + row.id}>
                  <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faEdit} /> Edit</button>
              </Link>    
             
             
            </div>
          );
        },
      },
];

const defaultSortedBy = [{
    dataField: "id",
    order: "asc" 
}];

useEffect(() => {
    getTicketData();
}, []);

  return (
    <div className="col main pt-5 mt-3">
    <div className="row ">
        <div className="col">
          <h5 className="mt-3 mb-3 text-secondary">
           All Tickets
          </h5>
          <div className='container-fluid table-overflow'>
          {loading? (
           <>
           <Link to={"/admin/add-ticket"}>
           <button className="btn btn-dark mb-1"><FontAwesomeIcon icon={faPlusCircle} /> Tambah</button>
            </Link>   
            
        <BootstrapTable bootstrap4 style={{fontSize: "20px"}} defaultSorted={defaultSortedBy} keyField='id' data={tickets} columns={columns} pagination={paginationFactory()} striped />
        </> 
    ) : (
        <ReactBootstrap.Spinner animation='border' />
    )}
            </div>      
          
        </div>
        
    </div>
    
    
    

</div>
  )
}

export default DataTickets