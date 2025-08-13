import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./App.css"; 

function Task() {
    const { id } = useParams(); // Logged-in user ID
    const [tasks, setTask] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getTask/${id}`)
            .then(result => setTask(result.data))
            .catch(err => console.log(err));
    }, [id]);

    const handleDelete = (taskId) => {
        axios.delete(`http://localhost:3001/deleteTask/${taskId}`)
            .then(() => {
                setTask(tasks.filter(task => task._id !== taskId)); 
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-Black rounded p-3">
                <Link to={`/create/${id}`} className="btn btn-success">Add +</Link>
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
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td>{task.name}</td>
                                <td>{task.task}</td>
                                <td>
                                {task.date
                                    ? new Date(task.date).toISOString().split("T")[0]
                                    : ""}
                                </td>                                
                                <td>
                                    <Link to={`/update/${task._id}`} className="btn btn-success">Update</Link>
                                    <button className="btn btn-danger"
                                        onClick={() => handleDelete(task._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p></p>
                 <button className = "bg-red rounded p-3" onClick={()=> {navigate (`/login`)}}>Log out</button>
            </div>
        </div>
    );
}

export default Task;
