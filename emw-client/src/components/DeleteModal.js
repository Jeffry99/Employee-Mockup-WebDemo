import { Modal } from 'react-bootstrap';
import axios from 'axios';
import Button from './Button';


const DeleteModal = ({mode, employee, employees, showDelete, setShowDelete, getEmployees}) => {

    const deleteEmployee = () => {
        // axios.delete(`http://localhost:3000/deleteEmployee/${employee.emp_id}`)
        // .then((() => {
        //     console.log('success')
        //     getEmployees()
        //     setShowDelete(false)
        // }))
        
        console.log(employees)
    }

    const deleteEmployees = () => {
        // axios.delete(`http://localhost:3000/deleteEmployees`, employees)
        // .then((() => {
        //     console.log('success')
        // }))
        // setShowDelete(false)
    }

    const handleClose = () => setShowDelete(false)
    return(
        <>
        <Modal
            show={showDelete}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title><h1>Delete Employee</h1></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure?
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={mode==='deleteEmployee' ? deleteEmployee: deleteEmployees}>Submit</Button>
            <Button id="cancelBtn" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeleteModal