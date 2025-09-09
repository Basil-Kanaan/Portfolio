// App.js
import './App.css';
import Home from "./pages/Home";
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function computeBasename() {
    // explicit override (optional)
    if (process.env.REACT_APP_BASENAME) return process.env.REACT_APP_BASENAME;

    // auto-detect GH Pages repo path: https://<user>.github.io/<repo>/
    if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
        const seg = window.location.pathname.split('/')[1] || '';
        return seg ? `/${seg}` : '/';
    }
    // default for Vercel/local
    return '/';
}

const BASENAME = computeBasename();

function App() {
    return (
        <div className="App">
            <Router basename={BASENAME}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
                <NavBar />
                <SideBar />
            </Router>
        </div>
    );
}

export default App;
