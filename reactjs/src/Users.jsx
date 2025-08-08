import {useState} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useEffect } from "react";


function Users (){
    const[users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001")
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete("http://localhost:3001/deleteUser/"+id)
        .then(res => {
            console.log(res.data);
           window.location.reload();
        })
        .catch(err => console.log(err))
    }


    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className ="w-50 bg-red rounded p-3">
                <Link to ="/create" className = "btn btn-success">Add +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>TaskName</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                        <tbody>
                        {
                            users.map((user, index) => {
                            return (
                                <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.task}</td>                
                                <td>{user.date}</td>
                                <td>
                                    <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                    <button className="btn btn-danger" 
                                    onClick={(e) => handleDelete(user._id)}>Delete</button>
                                </td>
                                </tr>
                            );
                            })
                        }
                        </tbody>
                </table>
            </div>
        </div >
    )
}

export  default  Users;
