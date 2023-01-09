import './App.css';
import Home from './pages/Home';
import Admin from './pages/Admin';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
