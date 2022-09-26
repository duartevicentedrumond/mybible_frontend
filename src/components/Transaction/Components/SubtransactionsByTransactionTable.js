import React, { useState } from 'react';

import { Styled } from "../../../design/style";

export default function SubtransactionsByTransactionTable(data) {

    //define initial variables
    const subtransactionsByTransaction = data.Transactions;
    const onSubtransactionClick = data.OnSubtransactionClick;
    const handleCloseModal = data.handleCloseModal;
    const index = data.index;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a transaction
        if (onSubtransactionClick !== undefined && index === undefined) {
            //prevent page refresh
            e.preventDefault();
            onSubtransactionClick(e);
            handleCloseModal();
        } else if (onSubtransactionClick !== undefined && index !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onSubtransactionClick(e, index);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredSubtransactions = subtransactionsByTransaction.filter(
        subtransaction => {
            if (
                String(subtransaction.subtransactionId).includes(searchText) || 
                String(subtransaction.customId).includes(searchText) ||
                String(subtransaction.description).includes(searchText) ||
                subtransaction.date.toLowerCase().includes(searchText.toLocaleLowerCase()) || 
                String(subtransaction.amount).includes(searchText)) {
                return subtransaction;
            }
        }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const subtransactionsPerPage = 8;
    const pagesVisited = pageNumber * subtransactionsPerPage;
    const displaySubtransactions = filteredSubtransactions.slice(pagesVisited, pagesVisited+subtransactionsPerPage);
    const pageCount = Math.ceil(filteredSubtransactions.length / subtransactionsPerPage);
    const changePage = ({selected}) => {
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
                        <Styled.TableTitleColumn scope="col" className="col-1 text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                            #
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn scope="col" className="col-1 text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                            Date
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn scope="col" className="col-1 text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                            Amount
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn scope="col" className="text-start px-4" style={{'whiteSpace': 'nowrap'}}>
                            Description
                        </Styled.TableTitleColumn>
                    </tr>
                </thead>

                <tbody style={{borderTop: '0px'}}>
                    {displaySubtransactions.map( (subtransaction) => ( 
                        
                    <tr key={subtransaction.subtransactionId}>
                        <th scope="col" className="text-end align-middle px-4">
                            <Styled.TableRowLink 
                                style={{'whiteSpace': 'nowrap'}}
                                to={`/subtransaction/edit/${subtransaction.subtransactionId}`}
                                onClick={onRowClick}
                                data-subtransactionid={subtransaction.subtransactionId}
                                data-customid={subtransaction.customId
                                }
                            >
                                {subtransaction.customId}
                            </Styled.TableRowLink>
                        </th>
                        <th scope="col" className="text-end align-middle px-4">
                            <Styled.TableRowLink 
                                style={{'whiteSpace': 'nowrap'}}
                                to={`/subtransaction/edit/${subtransaction.subtransactionId}`}
                                onClick={onRowClick}
                                data-subtransactionid={subtransaction.subtransactionId}
                                data-customid={subtransaction.customId
                                }
                            >
                                {subtransaction.date}
                            </Styled.TableRowLink>
                        </th>
                        <th scope="col" className="text-end px-4 align-middle">
                            <Styled.TableRowLink 
                                style={{'whiteSpace': 'nowrap'}}
                                to={`/subtransaction/edit/${subtransaction.subtransactionId}`}
                                onClick={onRowClick}
                                data-subtransactionid={subtransaction.subtransactionId}
                                data-customid={subtransaction.customId
                                }
                            > 
                                {(subtransaction.amount).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits: 2 })} €
                            </Styled.TableRowLink>
                        </th>
                        <th scope="col" className="text-start px-4 align-middle">
                            <Styled.TableRowLink 
                                style={{'whiteSpace': 'nowrap'}}
                                to={`/subtransaction/edit/${subtransaction.subtransactionId}`}
                                onClick={onRowClick}
                                data-subtransactionid={subtransaction.subtransactionId}
                                data-customid={subtransaction.customId
                                }
                            > 
                                {
                                    subtransaction.description.length > 70 ? 
                                    subtransaction.description.substring(0,70) + "..." :
                                    subtransaction.description
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