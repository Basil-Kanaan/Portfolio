import './App.css';
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import React from 'react';
import {BrowserRouter as Router,  Route, Routes} from 'react-router-dom';
import Projects from "./pages/Projects";


function App() {
    return (
        <div className="App">
            <Router basename="/Portfolio"> {/* Set basename */}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/projects" element={<Projects/>}/>
                </Routes>
                {/* Transparent NavBar and SideBar*/}
                <NavBar />
                <SideBar />
            </Router>
        </div>
    );
}

export default App;