import{BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateTask from './CreateTask'
import UpdateTasks from './UpdateTask'
import Task from './Task'
import Login from './login'
import Signup from './signup'
import EditProfile from './editprofile'


function App() {

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<Login/>}> </Route>
            <Route path='/signup' element={<Signup/>}> </Route>
            <Route path='/tasks/:id' element={<Task/>}> </Route>
            <Route path='/create/:id' element={<CreateTask/>}> </Route>
            <Route path='/update/:id' element={<UpdateTasks/>}> </Route>
            <Route path='/editprofile/:id' element={<EditProfile/>}> </Route> 

          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
