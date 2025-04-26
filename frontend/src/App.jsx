import './App.css'
import HomePage from "./pages/homePage/HomePage.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Context from "./Context.jsx";
import {useState} from "react";
import ScheduleMeet from "./pages/scheduleMeet/ScheduleMeet.jsx";
import VideoCall from "./components/videoCall/Videocall.jsx";
import Home from "./components/home/Home.jsx";

function App() {
    const [email, setEmail] = useState("");
    console.log(email);
  return (
      <Context.Provider value={{
          name,
          email,
          setEmail
      }}>
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"/login"} element={<Login email={email} setEmail={setEmail} />} />
        <Route path={"/register"} element={<Register />} />
          <Route path="/dashboard" element={<Dashboard userEmail={email} />} />
          <Route path="/ScheduleMeet" element={<ScheduleMeet/>} />
          <Route path="/join/:channelName" element={<VideoCall />} />
          <Route path="/videoCall" element={<Home />} />
      </Routes>
      </Context.Provider>
  )
}

export default App
