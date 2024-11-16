import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [credential, setCredential] = useState({email:"", password:""});
    const Handlesubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('http://localhost:3001/api/auth/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: credential.email, password: credential.password}),
      });
      
      const json = await response.json();
      console.log("Response JSON:", json);
      
      if(json.success){
          // Token should be set here
          localStorage.setItem('token', json.authToken);
          console.log("Token saved:", json.authToken);
          navigate("/");
      } else {
          alert("Invalid Credentials");
      }
  };
  
    // const Handlesubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch('http://localhost:3001/api/auth/login', {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({email: credential.email, password: credential.password}),
    //       });
    //       const json = await response.json();
    //       console.log(json);
    //       if(json.success){
    //         //redirect
    //         localStorage.setItem('token', json.authtoken);
    //         navigate("/");
    //       }
    //       else{
    //         alert("Invalid Credentials");
    //       }
    // };
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };
  return (
    <div className='container my-5'>
        <h3> LOGIN FORM</h3>
    <Form onSubmit={Handlesubmit}>
      <Form.Group className="mb-3" controlId="Email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={credential.email}  name='email' onChange={onChange} placeholder="Enter email" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={credential.password}  name='password' onChange={onChange} placeholder="Enter Password" minLength={5} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </div>
  )
}

export default Login
