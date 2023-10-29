import './App.css';
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar";
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';


function App() {
    return (
        <div className="App">
            <Router basename="/Portfolio"> {/* Set basename */}
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>

                <NavBar/>
                <SideBar/>
            </Router>
        </div>
    );
}

export default App;
