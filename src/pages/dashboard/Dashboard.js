import { useState,useEffect } from "react";
import  Container  from "react-bootstrap/Container";
import  Row  from "react-bootstrap/Row";
import  Col  from "react-bootstrap/Col";
import  Table  from "react-bootstrap/Table";
import  Button  from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [employees, setEmployees] = useState([]);

    const nagigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error.message);
            }

        }

        fetchEmployees();
    }, []);

    const handleDelete = async (employeeId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {
                method: "DELETE"
            })

            if (response.ok) {
               setEmployees(employees.filter((employee) => employee.id !== employeeId));
            }
            console.log(`Employee with ID ${employeeId} deleted successfully`);
        }catch(error){
            console.error("Error deleting employee:", error.message);
        }

    }

    const handleUpdate = (employeeId) => {
        nagigate(`/employee/${employeeId}`);
    }

    return (
       <>
       <Container className="mt-5">
        <Row>
            <Col>
                <h1 className="text-center">Employees</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <Button variant="outline-primary" onClick={() => handleUpdate(employee.id)}>Update</Button>
                                <Button variant="outline-danger" onClick={() => handleDelete(employee.id)}>Delete</Button>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
       </Container>
       </>
    );
};

export default Dashboard;