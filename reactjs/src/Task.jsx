import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css"; 

function Task() {
    const { id } = useParams();
    const [tasks, setTask] = useState([]);
    const navigate = useNavigate();
    const [username, setUsername] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/getTask/${id}`) 
            .then(result => {
                console.log("Fetched tasks:", result.data);
                setTask(result.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    useEffect(() => {
        axios.get(`http://localhost:3001/getusername/${id}`)
            .then(userresult => {
                console.log("Fetched username:", userresult.data);
                setUsername(userresult.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleDelete = (task) => {
    const msg = `
    Please confirm deletion of the task:

    Name: ${task.name || "(no name)"}
    Task: ${task.task || "(no task)"}
    Date: ${task.date ? new Date(task.date).toISOString().split("T")[0] : "" || "(no date)"}
        `;

    const isConfirmed = window.confirm(msg);
    if (!isConfirmed) return;

    axios.delete(`http://localhost:3001/deleteTask/${task._id}`)
        .then(() => {
            setTask(tasks.filter(t => t._id !== task._id)); 
        })
        .catch(err => console.log(err));
    };

    return (
        
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">  
            <div className="w-50 bg-Black rounded p-3">
                {tasks.length > 0 && ( <h2 className="text-white text-center mb-3" >Welcome {username}</h2>)}
                <Link to={`/create/${id}`} className="btn btn-success">Add +</Link>
                <table className="table table-bordered text-center border-dark">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>TaskName</th>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.name}</td>
                                <td>{task.task}</td>
                                <td>{task.date ? new Date(task.date).toISOString().split("T")[0] : ""}</td>
                                <td>
                                    {task.status}
                                </td>
                                <td>
                                    <Link to={`/update/${task._id}`} className="btn btn-success">Update</Link>
                                    <button className="btn btn-danger"
                                        onClick={() => handleDelete(task)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p></p>
                 <button className = "bg-red rounded p-3" onClick={()=> {navigate (`/login`)}}>Log out</button>
                <button className = "bg-grey rounded p-3" onClick={()=> {navigate (`/editprofile/${id}`)}}>Edit Profile</button>
            </div>
        </div>
    );
}

export default Task;
