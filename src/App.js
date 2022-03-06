import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import TransactionForm from "./transaction_components/TransactionForm";
import TransactionList from "./transaction_components/TransactionList";
import NavBar from "./general_components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar/>

      <BrowserRouter>
        <Routes>
          <Route path="/transaction" element={<TransactionList/>} />
          <Route path="/transaction/add" element={<TransactionForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;