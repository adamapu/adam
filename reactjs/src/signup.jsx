import {useState} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup(){

    const[name, setName] = useState()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const navigate = useNavigate();


    const handleSubmit =(e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/register', {name,email,password})
        .then(result=>{console.log(result)
            navigate ('/')
        })
        .catch(err=> console.log(err))
    } 

    const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://localhost:3001/login', { name, email, password })
        .then(result => {
        console.log(result.data);  // Debugging: see the full response
        
        if (result.data.message === "Success") {
            navigate(`/tasks/${result.data.id}`);
        } else {
            // Show error message if login failed
            alert(result.data);  // or display it nicely in UI instead of alert
        }
        })
        .catch(err => {
        console.error("Login error:", err);
        alert("An error occurred during login. Please try again.");
        });
    };
    
    return(
    <div className= "d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
            <h2>Welcome</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="name">
                        <strong>Name</strong>
                    </label>
                    <input id="name" type="text" placeholder="Enter Name" 
                    autoComplete = "on" name="name" className="form-control rounded-3" 
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input id="email" type="email" placeholder="Enter Email" autoComplete="on" 
                    name="email" className="form-control rounded-3" 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Password</strong>
                    </label>
                    <input id="password" type="password" placeholder="Enter Password" autoComplete="off" 
                    name="password" className="form-control rounded-3" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                    <button type="button" className = "btn btn-success w-100 rounded-0" onClick={handleSubmit}>Register</button>
            </form>
                    <button type="button" className = "btn btn-success w-100 rounded-0" onClick={handleLogin}>Log In</button>
        </div>
    </div>
    )
}

export default Signup;