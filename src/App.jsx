import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./components/Home";
import CreationLab from "./components/CreationLab";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creation-lab" element={<CreationLab />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
