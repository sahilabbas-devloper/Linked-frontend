import Rajister from "./component/Rajister"
import Login from "./component/Login"
import Home from "./component/Home"
import AddPost from "./component/AddPost"
import Profile from "./component/profile"
import Editprofile from "./component/Editprofile"
import Notifications from "./component/notification"
import { Routes,Route ,BrowserRouter } from "react-router-dom"


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
       <Route path="/"  element={<Home/>}/>
        <Route path="/Home"  element={<Home/>}/>
        <Route path="/Rajister"  element={<Rajister/>}/>
       <Route path="/Login"  element={<Login/>}/>
         <Route path="/AddPost"  element={<AddPost/>}/>
         <Route path="/Profile"  element={<Profile/>}/>
         <Route path="/EditProfile"  element={<Editprofile/>}/>
         <Route path="/notification"  element={<Notifications/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
