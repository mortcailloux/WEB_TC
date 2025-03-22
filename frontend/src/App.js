import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/home";
import Auth from "./pages/auth";

function App() {
  
    return (
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </Router>
      );
}

export default App;
