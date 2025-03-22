import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NavProvider } from "./context/NavContext";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import EmptyPage from "./pages/EmptyPage";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <NavProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/applications" element={<EmptyPage title="Applications" />} />
              <Route path="/companies" element={<EmptyPage title="Companies" />} />
              <Route path="/qualifications" element={<EmptyPage title="Qualifications" />} />
              <Route path="/about" element={<EmptyPage title="About" />} />
              <Route path="/contact" element={<EmptyPage title="Contact" />} />
              <Route path="*" element={<EmptyPage />} />
            </Route>
          </Routes>
        </Router>
      </NavProvider>
    </DndProvider>
  );
};

export default App;
