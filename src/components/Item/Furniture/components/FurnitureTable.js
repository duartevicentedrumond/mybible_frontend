import React, { useState } from 'react';

import { Styled } from "../../../../design/style";

export default function FurnitureTable(data) {

    //define initial variables
    const furnitures = data.furnitures;
    const onFurnitureClick = data.onFurnitureClick;
    const handleCloseModal = data.handleCloseModal;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a room
        if (onFurnitureClick !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onFurnitureClick(e);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredFurnitures = furnitures.filter(furniture => {
        if (
            String(furniture.furnitureId).includes(searchText) ||
            String(furniture.name).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(furniture.since).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(furniture.until).includes(searchText)
        ) {
            return furniture;
        }
    }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const furnituresPerPage = 8;
    const pagesVisited = pageNumber * furnituresPerPage;
    const displayFurnitures = filteredFurnitures.slice(pagesVisited, pagesVisited + furnituresPerPage);
    const pageCount = Math.ceil(filteredFurnitures.length / furnituresPerPage);
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
                    {displayFurnitures.map((furniture) => (

                        <tr key={furniture.furnitureId}>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/furniture/edit/${furniture.furnitureId}`}
                                    onClick={onRowClick}
                                    data-furnitureid={furniture.furnitureId}
                                >
                                    {furniture.furnitureId}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/furniture/edit/${furniture.furnitureId}`}
                                    onClick={onRowClick}
                                    data-furnitureid={furniture.furnitureId}
                                >
                                    {furniture.name}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/furniture/edit/${furniture.furnitureId}`}
                                    onClick={onRowClick}
                                    data-furnitureid={furniture.furnitureId}
                                >
                                    {furniture.since}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/furniture/edit/${furniture.furnitureId}`}
                                    onClick={onRowClick}
                                    data-furnitureid={furniture.furnitureId}
                                >
                                    {furniture.until}
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