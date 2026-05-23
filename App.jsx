import React , {useState} from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import { FitnessProvider } from './components/FitnessContext';
import Goals from "./components/Goals";
import Workout from "./components/Workout";
import Diet from "./components/Diet";
import Progress from "./components/Progress";
import Social from "./components/Social";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";

function MainAppLayout() {
 const location = useLocation();

 const hideNavbarPaths = ["/","/register"];
 const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname);



  return (
    <>
    <FitnessProvider>
      {/* Navbar renders conditionally based on URL matching rules */}
      { shouldShowNavbar && <Navbar />}
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/dash" element={<Dashboard/>} />
        <Route path="/home" element={<Home/>} />
       
        <Route path="/goals" element={<Goals/>} />
        <Route path="/workout" element={<Workout/>} />
        <Route path="/diet" element={<Diet/>} />
        <Route path="/progress" element={<Progress/>} />
        <Route path="/social" element={<Social/>} />
        <Route path="/profile" element={<Profile/>} />
         <Route path="/admin" element={<AdminDashboard/>} />
        
        
      </Routes>
      </FitnessProvider>
    </>
  );
}

function App() {

  return (
    (
     <Router>
      <MainAppLayout />
    </Router>
   )
  );
}

export default App;
