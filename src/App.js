import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import NavBar from "./general_components/NavBar";
import Transaction from "./transaction_components/Transaction";

function App() {
  return (
    <div className="App">
      <NavBar/>

      <BrowserRouter>
        <Routes>
          <Route path="transaction/*" element={<Transaction/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;