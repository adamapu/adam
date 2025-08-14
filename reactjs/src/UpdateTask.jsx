import {useState} from "react";
import{useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import axios from 'axios';


function UpdateTasks (){
    const {id} = useParams();
    const [name, setName] = useState()
    const [task, setTask] = useState()
    const [date, setDate] = useState()
    const [status, setStatus] = useState()
    const [userid, setUserid] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/updateTask/"+id)
        .then(result => {
            console.log(result.data)
            setName(result.data.name)
            setTask(result.data.task)
            setStatus(result.data.status)
            setDate(result.data.date ? result.data.date.split("T")[0] : "");
            setUserid(result.data.userid)
        })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        const updatedTask = {
            name: name,
            task: task,
            date: date,
            status: status,
            userid: userid
        };

        const message = `
            Please confirm the task details:

            Name: ${name}
            Task: ${task}
            Date: ${date}
            Status: ${status}
                `;

        const isConfirmed = window.confirm(message);
            if (!isConfirmed) {
                return; // Stop if user cancels
            }
        axios.put("http://localhost:3001/updateTask/"+id, updatedTask)
        .then(result => {
            console.log(result.data);
            navigate(`/tasks/` + userid);
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className ="w-50 bg-red rounded p-3">
            <form onSubmit={Update}>
                <h2>Update Task</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" className="form-control" required
                    value = {name||""} onChange = {(e)=> setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Task</label>
                    <input type="text" className="form-control" required
                    value = {task||""} onChange = {(e)=> setTask(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2">
                        <label htmlFor="">Date</label>
                        <input type="date"  className="form-control" aria-required = "true" required
                        value = {date||""} onChange = {(e)=> setDate(e.target.value)} />
                    </div>
                </div>
                <div>
                    <div className="mb-2">
                    <label htmlFor="status">Status</label><br />
                        <select id="status" classname="form-control rounded-3" 
                        required value={status} 
                        onChange={(e) => setStatus(e.target.value)}>
                            <option value="">Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Complete</option>
                            </select>
                    </div>
                </div>
                <button className= "btn btn-success"> Update</button>
                <p></p>
            </form>
             <button className = "bg-grey rounded p-3" onClick={()=> {navigate (`/tasks/${userid}`)}}>Back</button>
        </div >
        </div>
    )
}

export  default  UpdateTasks;