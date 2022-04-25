import React, { useContext, useEffect, useState } from 'react';
import { IoChevronBackOutline } from "react-icons/io5";

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import { Styled__Table, Styled__Input } from "../../design/style";

const TransactionList = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {transactions, getTransactions} = useContext(TransactionContext);
    
    const [searchText, setSearchText] = useState("");
    const filteredTransactions = transactions.filter(
        transaction => {


            if (transaction.description.toLowerCase().includes(searchText.toLocaleLowerCase()) || String(transaction.transactionId).includes(searchText) || String(transaction.amount).includes(searchText)) {
                return transaction
            }
        }
    );
    const handleInput = (e) => {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const transactionsPerPage = 8;
    const pagesVisited = pageNumber * transactionsPerPage;
    const displayTransactions = filteredTransactions.slice(pagesVisited, pagesVisited+transactionsPerPage);
    const pageCount = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getTransactions();
        }
    , []);

    return (
        <div className="d-flex flex-column table-responsive py-2">

            <Styled__Input.SearchBar
                className="d-flex flex-row align-items-baseline px-3 py-2"
                onChange={handleInput}
                type="text"
                value={searchText}
                placeholder="Search..."
            />

            {/*
                Render a table with the following features:
                    - table-hover: highlight the table's row when hovered
                    - table-sm: reduce row vertical spacing
                    - w-auto: auto columns' width

                    <th>
                        - text-end: horizontal align text to right
                        - text-start: horizontal align text to left
                        - px-4: column horizontal padding (left and right) with 4
            */}
            <table className="table table-hover table-sm">

                <thead>
                    <Styled__Table.Header>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                            #
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                            Date
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                            Amount
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="text-start px-4" style={{'whiteSpace': 'nowrap'}}>
                            Description
                        </Styled__Table.HeaderColumn>
                    </Styled__Table.Header>
                </thead>

                <Styled__Table.Body style={{borderTop: '0px'}}>
                    {displayTransactions.map( (transaction) => ( 
                        
                    <tr key={transaction.transactionId}>
                        <th scope="col" className="text-end align-middle px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{'whiteSpace': 'nowrap'}}>
                                {transaction.transactionId}
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="text-end align-middle px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{'whiteSpace': 'nowrap'}}>
                                {transaction.date}
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="text-end px-4 align-middle">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{'whiteSpace': 'nowrap'}}> 
                                {parseFloat(transaction.amount).toFixed(2)}     €
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="text-start px-4 align-middle">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{width: '100%'}}> 
                                {transaction.description}
                            </Styled__Table.RowLink>
                        </th>
                    </tr>
                        
                    ))}
                </Styled__Table.Body>

            </table>

            {pageCount === 1 ? true : <Styled__Table.ReactPaginateTable
                className="d-flex justify-content-start px-0 align-items-start"
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />}

        </div>
    )
}

export default TransactionList;