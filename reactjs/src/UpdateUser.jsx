import {useState} from "react";
import{useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useEffect} from "react";
import axios from 'axios';


function UpdateUsers (){
    const {id} = useParams();
    const [name, setName] = useState()
    const [task, setTask] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/getUser/"+id)
        .then(result => {
            console.log(result.data)
            setName(result.data.name)
            setTask(result.data.task)
            setDate(result.data.date)
        })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        const updatedUser = {
            name: name,
            task: task,
            date: date
        };
        axios.put("http://localhost:3001/updateUser/"+id, updatedUser)
        .then(result => {
            console.log(result.data);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className ="w-50 bg-red rounded p-3">
            <form onSubmit={Update}>
                <h2>Update User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control"
                    value = {name} onChange = {(e)=> setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Task</label>
                    <input type="text" placeholder="Enter Task" className="form-control"
                    value = {task} onChange = {(e)=> setTask(e.target.value)} />
                </div>
                <div>
                    <div className="mb-2">
                        <label htmlFor="">Date</label>
                        <input type="date" placeholder="Enter Date" className="form-control"
                        value = {date} onChange = {(e)=> setAge(e.target.value)} />
                    </div>
                </div>
                <button className= "btn btn-success"> Update</button>
            </form>
        </div >
        </div>
    )
}

export  default  UpdateUsers;