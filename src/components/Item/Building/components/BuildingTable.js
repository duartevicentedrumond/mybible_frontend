import React, { useState } from 'react';

import { Styled } from "../../../../design/style";

export default function BuildingTable(data) {

    //define initial variables
    const buildings = data.buildings;
    const onBuildingClick = data.onBuildingClick;
    const handleCloseModal = data.handleCloseModal;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a building
        if (onBuildingClick !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onBuildingClick(e);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredBuildings = buildings.filter(building => {
        if (
            String(building.buildingId).includes(searchText) ||
            String(building.name).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(building.since).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(building.until).includes(searchText)
        ) {
            return building;
        }
    }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const buildingsPerPage = 8;
    const pagesVisited = pageNumber * buildingsPerPage;
    const displayBuildings = filteredBuildings.slice(pagesVisited, pagesVisited + buildingsPerPage);
    const pageCount = Math.ceil(filteredBuildings.length / buildingsPerPage);
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
                    {displayBuildings.map((building) => (

                        <tr key={building.buildingId}>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/building/edit/${building.buildingId}`}
                                    onClick={onRowClick}
                                    data-buildingid={building.buildingId}
                                >
                                    {building.buildingId}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/building/edit/${building.buildingId}`}
                                    onClick={onRowClick}
                                    data-buildingid={building.buildingId}
                                >
                                    {building.name}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/building/edit/${building.buildingId}`}
                                    onClick={onRowClick}
                                    data-buildingid={building.buildingId}
                                >
                                    {building.since}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/building/edit/${building.buildingId}`}
                                    onClick={onRowClick}
                                    data-buildingid={building.buildingId}
                                >
                                    {building.until}
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