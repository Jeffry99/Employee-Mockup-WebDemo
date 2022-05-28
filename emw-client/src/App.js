import Axios from "axios";
import { useState } from "react";
import './components/Button.css';
import Table from './components/Table';
import './components/Table.css'
import Card from "./components/Card";
import UserForm from "./components/UserForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "bootstrap";
import DeleteModal from "./components/DeleteModal";

function App(props) {
  const {employeesSelected} = props
  var employee
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const deleteSelected = () => {
    console.log(employeesSelected)
  }
  return (

    <div>
      <div style = {{ marginTop: '5%'}} id="tableDiv">
        <div id="headerDiv">
          <div className="tableUpDiv">
            <h1>Manage Employees</h1>
          </div>
          <button 
            id='addBtn'
            className="button" 
            onClick={() => {
              handleShow()
            }}
          >
            Add Employee
          </button>
          <button 
            id='deleteSelectedBtn'
            className="button" 
            onClick={() => {
              deleteSelected()
              handleShowDelete()
            }}
          >
            Delete
          </button>

        </div>
        <Table></Table>
        
        
      </div>
      <div>
        <UserForm formName={'Add Employee'} show={show} setShow={setShow}/>
        <DeleteModal mode={'deleteEmployees'} employee={employee} employees={employeesSelected} showDelete={showDelete} setShowDelete={setShowDelete}/>
      </div>
        
    </div>
  );
}

export default App;
