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

function DataOrders() {

const getToken = localStorage.getItem("token");
const [loading, setLoading] = useState(false);
const [orders, setOrders] = useState([]);
const navigate = useNavigate();
const { id } = useParams();

function dateFormat(value, row, index) {
    return moment(value).format('HH:mm DD-MM-YYYY');
  }


const getOrdersData = async () => {
    try{
        const data = await axios.get("https://final-project-be-production-6de7.up.railway.app/api/v1/orders", { headers: {"Authorization" : `Bearer ${getToken}`} });
       
        setOrders(data.data.data);
        setLoading(true)
    }
    catch (err) {
        console.log(err)
    }
};



const columns = [
    {dataField: "id", text: "ID order", sort: "true", headerStyle: () =>{
        return{ width: "5%"};
    },
},
    {dataField: "userId", text: "User Id", sort: "true", headerStyle: () =>{
        return{ width: "7%"};
    },},
    {dataField: "ticketId", text: "ticket Id", sort: "true"},
    {dataField: "createdAt", formatter: dateFormat, dateFormat, text: "Created At", sort: "true"},
    {dataField: "updatedAt", formatter: dateFormat, dateFormat, text: "Updated At", sort: "true"},
    {
        dataField: "",
        text: "",
        formatter: (rowContent, row) => {
          return (
            <div>
              <Link to={"/" + row.id}>
               
              </Link>
              
    
              <Link to={"/" + row.id}>

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
    getOrdersData();
}, []);

  return (
    <div className="col main pt-5 mt-3">
    <div className="row ">
        <div className="col">
          <h5 className="mt-3 mb-3 text-secondary">
           All Orders
          </h5>
          <div className='container-fluid table-overflow'>
          {loading? (
           <>

            
        <BootstrapTable bootstrap4 style={{fontSize: "20px"}} defaultSorted={defaultSortedBy} keyField='id' data={orders} columns={columns} pagination={paginationFactory()} striped />
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

export default DataOrders