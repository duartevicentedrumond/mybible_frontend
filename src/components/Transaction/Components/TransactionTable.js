import React, { useState } from 'react';

import { Styled } from "./../../../design/style";

export default function TransactionTable(data) {

    //define initial variables
    const transactions = data.Transactions;
    const onTransactionClick = data.onTransactionClick;
    const handleCloseModal = data.handleCloseModal;
    const index = data.index;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a transaction
        if (onTransactionClick !== undefined && index === undefined) {
            //prevent page refresh
            e.preventDefault();
            onTransactionClick(e);
            handleCloseModal();
        } else if (onTransactionClick !== undefined && index !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onTransactionClick(e, index);
            handleCloseModal();
        }

    };

    const [searchText, setSearchText] = useState("");
    const filteredTransactions = transactions.filter((transaction) => {
        if (String(transaction.transactionId).toLocaleLowerCase().includes(searchText) ||
            String(transaction.customId).toLocaleLowerCase().includes(searchText) ||
            String(transaction.description).toLocaleLowerCase().includes(searchText) ||
            String(transaction.date).toLocaleLowerCase().includes(searchText) ||
            (transaction.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).toLocaleLowerCase().includes(searchText)) {
            return transaction;
        }
    });

    function handleInput(e) {
        const text = e.target.value.toLocaleLowerCase();
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const transactionsPerPage = 8;
    const pagesVisited = pageNumber * transactionsPerPage;
    const displayTransactions = filteredTransactions.slice(pagesVisited, pagesVisited + transactionsPerPage);
    const pageCount = Math.ceil(filteredTransactions.length / transactionsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (

        <div className="d-flex flex-column table-responsive py-2">

            <Styled.FormSearchBar
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
                    <tr>
                        <Styled.TableTitleColumn scope="col" className="col-1 text-end px-4" style={{ 'whiteSpace': 'nowrap' }}>
                            #
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn scope="col" className="col-1 text-end px-4" style={{ 'whiteSpace': 'nowrap' }}>
                            Date
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn scope="col" className="col-1 text-end px-4" style={{ 'whiteSpace': 'nowrap' }}>
                            Amount
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn scope="col" className="text-start px-4" style={{ 'whiteSpace': 'nowrap' }}>
                            Description
                        </Styled.TableTitleColumn>
                    </tr>
                </thead>

                <tbody style={{ borderTop: '0px' }}>
                    {displayTransactions.map((transaction) => (

                        <tr key={transaction.transactionId}>
                            <th scope="col" className="text-end align-middle px-4">
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/transaction/edit/${transaction.transactionId}`}
                                    onClick={onRowClick}
                                    data-transactionid={transaction.transactionId}
                                    data-customid={transaction.customId
                                    }
                                >
                                    {transaction.customId}
                                </Styled.TableRowLink>
                            </th>
                            <th scope="col" className="text-end align-middle px-4">
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/transaction/edit/${transaction.transactionId}`}
                                    onClick={onRowClick}
                                    data-transactionid={transaction.transactionId}
                                    data-customid={transaction.customId
                                    }
                                >
                                    {transaction.date}
                                </Styled.TableRowLink>
                            </th>
                            <th scope="col" className="text-end px-4 align-middle">
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/transaction/edit/${transaction.transactionId}`}
                                    onClick={onRowClick}
                                    data-transactionid={transaction.transactionId}
                                    data-customid={transaction.customId
                                    }
                                >
                                    {(transaction.totalAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                                </Styled.TableRowLink>
                            </th>
                            <th scope="col" className="text-start px-4 align-middle">
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/transaction/edit/${transaction.transactionId}`}
                                    onClick={onRowClick}
                                    data-transactionid={transaction.transactionId}
                                    data-customid={transaction.customId
                                    }
                                >
                                    {
                                        transaction.description.length > 70 ?
                                            transaction.description.substring(0, 70) + "..." :
                                            transaction.description
                                    }
                                </Styled.TableRowLink>
                            </th>
                        </tr>

                    ))}
                </tbody>

            </table>

            {pageCount <= 1 ? true : <Styled.TablePaginate
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

};