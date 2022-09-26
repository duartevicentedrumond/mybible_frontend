import React, { useContext, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionInfo from "./TransactionInfo";
import TransactionChart from "./TransactionChart";
import TransactionSettings from "./TransactionSettings";
import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import { Styled } from "../../design/style";

function Transaction() {

  const { transactions, getTransactions } = useContext(TransactionContext);

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    getTransactions();

  }, []); //page first rendering dependency

  return (
    <div className="container-fluid">

      <div className='row'>

        <div className="col-10 text-start py-3">

          <ul className="nav nav-tabs">
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/transaction'}>
                Transactions
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/transaction/add'}>
                New
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/transaction/chart'}>
                Charts
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/transaction/settings'}>
                Settings
              </Styled.SecondaryNavBarLink>
            </li>
          </ul>

          <Routes>
            <Route
              path="/"
              element={
                <TransactionList
                  Transactions={transactions}
                />
              }
            />
            <Route path="add" element={<TransactionForm/>} />
            <Route path="edit/:id" element={<TransactionForm/>} />
            <Route path="chart" element={<TransactionChart/>} />
            <Route path="settings" element={<TransactionSettings/>} />
          </Routes> 
        </div>
          
        <div className="col text-start py-3">
          <Routes>
            <Route path="/" element={<TransactionInfo/>} />
            <Route path="/add" element={<TransactionInfo/>} />
            <Route path="/edit/:id" element={<TransactionInfo/>} />
            <Route path="/chart" element={<TransactionInfo/>} />
            <Route path="/settings" element={<TransactionInfo/>} />
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default Transaction