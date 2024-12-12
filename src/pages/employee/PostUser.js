import Form from "react-bootstrap/Form";
import "./PostUser.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PostUser = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        department: ""
    });

    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        })
        
    }
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(formData);

        try{
            const response = await fetch("http://localhost:8080/api/employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
        
            });
            const data = await response.json();
            console.log("Employee Created:" ,data);
            navigate("/");

    }
        catch(error){
            console.log("Error creating employee:", error.message);
        }

    }
    return (
        <>
            <div className="center-form">
                <h1>Post New Employee</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicname">
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicname">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicname">
                        <Form.Control
                            type="phone"
                            name="phone"
                            placeholder="Enter phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicname">
                        <Form.Control
                            type="department"
                            name="department"
                            placeholder="Enter department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />

                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                           Post Employee 
                        </Button>
                </Form>
            </div>
        </>
    );
};

export default PostUser;