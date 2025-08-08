import { useState } from 'react'
import './App.css'
import{BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUsers from './CreateUser'
import UpdateUsers from './UpdateUser'
import Users from './Users'
import Signup from './signup'
import LogIn from './login'



function App() {
  const [count, setCount] = useState(0)

  return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Signup/>}> </Route>
            <Route path='/login' element={<LogIn/>}> </Route>
            <Route path='/users' element={<Users/>}> </Route>
            <Route path='/create' element={<CreateUsers/>}> </Route>
            <Route path='/update/:id' element={<UpdateUsers/>}> </Route> 
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App
