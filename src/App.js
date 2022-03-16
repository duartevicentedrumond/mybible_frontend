import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./general_components/Home";
import { ContextProvider } from "./context/GlobalContext";

function App() {
  return (
    <div className="App">

      <ContextProvider>
        <BrowserRouter>
          <Routes>
            
            {/* Route for home page which has subpages*/}
            <Route path="/*" element={<Home/>} />

          </Routes>
        </BrowserRouter>
      </ContextProvider>

    </div>
  );
}

export default App;