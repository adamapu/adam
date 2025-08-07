import {useState} from "react";

function UpdateUsers (){
    return(
        <div>
            <form>
                <h2>Update User</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="Enter Name" className="form-control" />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder="Enter Email" className="form-control" />
                </div>
                <div>
                    <div className="mb-2">
                        <label htmlFor="">Age</label>
                        <input type="text" placeholder="Enter Age" className="form-control"/>
                    </div>
                </div>
                <button className= "btn btn-success"> Update</button>
            </form>
        </div >
    )
}

export  default  UpdateUsers;