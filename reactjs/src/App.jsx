import { useState } from 'react'
import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateTask from './CreateTask'
import UpdateTasks from './UpdateTask'
import Task from './Task'
import Signup from './signup'



function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/register" />} />
            <Route path='/register' element={<Signup/>}> </Route>
            <Route path='/tasks/:id' element={<Task/>}> </Route>
            <Route path='/create/:id' element={<CreateTask/>}> </Route>
            <Route path='/update/:id' element={<UpdateTasks/>}> </Route> 
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
