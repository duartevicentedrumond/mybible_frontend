import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./general_components/Home";

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          
          {/* Route for home page which has subpages*/}
          <Route path="/*" element={<Home/>} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;