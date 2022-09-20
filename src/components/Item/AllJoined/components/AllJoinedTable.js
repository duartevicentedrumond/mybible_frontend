import React, { useState } from 'react';

import { Styled } from "../../../../design/style";

export default function AllJoinedTable(data) {

    //define initial variables
    const allJoined = data.allJoined;
    const onRowClick = data.onRowClick;

    const [searchText, setSearchText] = useState("");
    const filteredAllJoined = allJoined.filter( element => {
            if (
                String(element.id).includes(searchText) ||
                String(element.name).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
                String(element.since).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
                String(element.until).includes(searchText) ||
                String(element.type).includes(searchText)
            ) {
                return element;
            }
        }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const allJoinedPerPage = 8;
    const pagesVisited = pageNumber * allJoinedPerPage;
    const displayAllJoined = filteredAllJoined.slice(pagesVisited, pagesVisited + allJoinedPerPage);
    const pageCount = Math.ceil(filteredAllJoined.length / allJoinedPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (

        <div className="d-flex flex-column table-responsive py-2">

            <Styled.FormSearchBar
                className="d-flex flex-row align-allJoined-baseline px-3 py-2"
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
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col-1 text-start px-4"
                            style={{ 'whiteSpace': 'nowrap' }}
                        >
                            #
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col-1 text-start px-4"
                            style={{ 'whiteSpace': 'nowrap' }}
                        >
                            Type
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col text-start px-4"
                            style={{ 'whiteSpace': 'nowrap' }}
                        >
                            Name
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col-1 text-start px-4"
                            style={{ 'whiteSpace': 'nowrap' }}
                        >
                            Since
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col-1 text-start px-4"
                            style={{ 'whiteSpace': 'nowrap' }}
                        >
                            Until
                        </Styled.TableTitleColumn>
                    </tr>
                </thead>

                <tbody style={{ borderTop: '0px' }}>
                    {displayAllJoined.map((element) => (

                        <tr key={element.id}>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/${element.type}/edit/${element.id}`}
                                    onClick={onRowClick}
                                    data-itemid={element.id}
                                >
                                    {element.id}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/${element.type}/edit/${element.id}`}
                                    onClick={onRowClick}
                                    data-itemid={element.id}
                                >
                                    {element.type}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/${element.type}/edit/${element.id}`}
                                    onClick={onRowClick}
                                    data-itemid={element.id}
                                >
                                    {element.name}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/${element.type}/edit/${element.id}`}
                                    onClick={onRowClick}
                                    data-itemid={element.id}
                                >
                                    {element.since}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/${element.type}/edit/${element.id}`}
                                    onClick={onRowClick}
                                    data-itemid={element.id}
                                >
                                    {element.until}
                                </Styled.TableRowLink>
                            </th>
                        </tr>
                    ))}
                </tbody>

            </table>

            {pageCount <= 1 ? true : <Styled.TablePaginate
                className="d-flex justify-content-start px-0 align-allJoined-start"
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