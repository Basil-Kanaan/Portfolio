import './App.css';
import MainPage from "./pages/MainPage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Router basename="/Portfolio"> {/* Set basename */}
            <MainPage />
        </Router>

    </div>
  );
}

export default App;
