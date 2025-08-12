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
    const [userid, setUserid] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/updateTask/"+id)
        .then(result => {
            console.log(result.data)
            setName(result.data.name)
            setTask(result.data.task)
            setDate(result.data.date)
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
            userid: userid
        };
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
                        <input type="date"  className="form-control" aria-required
                        value = {date||""} onChange = {(e)=> setDate(e.target.value)} />
                    </div>
                </div>
                <button className= "btn btn-success"> Update</button>
            </form>
        </div >
        </div>
    )
}

export  default  UpdateTasks;