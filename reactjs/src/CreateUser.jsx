import {useState} from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function CreateUsers (){
    const [name, setName] = useState()
    const [task, setTask] = useState()
    const [date, setDate] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser", {name,task,date})
        .then (result => {console.log(result) 
            navigate('/')})
        .catch(err => console.log(err))
    }
    
    return(
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className ="w-50 bg-red rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange = {(e)=> setName(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">TaskName</label>
                        <input type="text" placeholder="Enter Task" className="form-control" 
                        onChange = {(e)=> setTask(e.target.value)}/>
                    </div>
                    <div>
                        <div className="mb-2">
                            <label htmlFor="">Date</label>
                            <input type="date" placeholder="Enter Date" className="form-control"
                            onChange = {(e)=> setDate(e.target.value)}/>
                        </div>
                    </div>
                    <button className= "btn btn-success"> Submit</button>
                </form>
            </div>
        </div >
    )
}

export  default  CreateUsers;