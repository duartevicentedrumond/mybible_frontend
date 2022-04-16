import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./general_components/Home";
import { TransactionContextProvider } from "./context/Wallet/Transaction/TransactionState";
import { CategoryContextProvider } from "./context/Wallet/Category/CategoryState";

function App() {
  return (
    <div className="App">

      <TransactionContextProvider>
        <CategoryContextProvider>
          <BrowserRouter>
            <Routes>
              
              {/* Route for home page which has subpages*/}
              <Route path="/*" element={<Home/>} />

            </Routes>
          </BrowserRouter>
        </CategoryContextProvider>
      </TransactionContextProvider>

    </div>
  );
}

export default App;