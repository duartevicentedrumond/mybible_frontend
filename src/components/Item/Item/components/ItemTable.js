import React, { useState } from 'react';

import { Styled } from "../../../../design/style";

export default function ItemTable(data) {

    //define initial variables
    const items = data.items;
    const onItemClick = data.onItemClick;
    const handleCloseModal = data.handleCloseModal;
    const index = data.index;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a room
        if (onItemClick !== undefined && index === undefined) {
            //prevent page refresh
            e.preventDefault();
            onItemClick(e);
            handleCloseModal();
        } else if (onItemClick !== undefined && index !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onItemClick(e, index);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredItems = items.filter(item => {
        if (
            String(item.itemId).includes(searchText) ||
            String(item.name).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(item.since).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(item.until).includes(searchText)
        ) {
            return item;
        }
    }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const itemsPerPage = 8;
    const pagesVisited = pageNumber * itemsPerPage;
    const displayItems = filteredItems.slice(pagesVisited, pagesVisited + itemsPerPage);
    const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
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
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col-1 text-start px-4"
                            style={{ 'whiteSpace': 'nowrap' }}
                        >
                            #
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
                    {displayItems.map((item) => (

                        <tr key={item.itemId}>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/item/edit/${item.itemId}`}
                                    onClick={onRowClick}
                                    data-itemid={item.itemId}
                                >
                                    {item.itemId}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/item/edit/${item.itemId}`}
                                    onClick={onRowClick}
                                    data-itemid={item.itemId}
                                >
                                    {item.name}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/item/edit/${item.itemId}`}
                                    onClick={onRowClick}
                                    data-itemid={item.itemId}
                                >
                                    {item.since}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/item/edit/${item.itemId}`}
                                    onClick={onRowClick}
                                    data-itemid={item.itemId}
                                >
                                    {item.until}
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