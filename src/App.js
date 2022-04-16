import './App.css';

import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./general_components/Home";
import { TransactionContextProvider } from "./context/Wallet/Transaction/TransactionState";
import { CategoryContextProvider } from "./context/Wallet/Category/CategoryState";
import { TypeContextProvider } from "./context/Wallet/Type/TypeState";

function App() {
  return (
    <div className="App">

      <TransactionContextProvider>
      <CategoryContextProvider>
      <TypeContextProvider>
          <BrowserRouter>
            <Routes>
              
              {/* Route for home page which has subpages*/}
              <Route path="/*" element={<Home/>} />

            </Routes>
          </BrowserRouter>
      </TypeContextProvider>
      </CategoryContextProvider>
      </TransactionContextProvider>

    </div>
  );
}

export default App;