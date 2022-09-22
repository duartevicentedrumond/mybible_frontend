import React, { useState } from 'react';

import { Styled } from "../../../../design/style";

export default function RoomTable(data) {

    //define initial variables
    const rooms = data.rooms;
    const onRoomClick = data.onRoomClick;
    const handleCloseModal = data.handleCloseModal;
    const index = data.index;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a room
        if (onRoomClick !== undefined && index === undefined) {
            //prevent page refresh
            e.preventDefault();
            onRoomClick(e);
            handleCloseModal();
        } else if (onRoomClick !== undefined && index !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onRoomClick(e, index);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredRooms = rooms.filter(room => {
        if (
            String(room.roomId).includes(searchText) ||
            String(room.name).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(room.since).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(room.until).includes(searchText)
        ) {
            return room;
        }
    }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const roomsPerPage = 8;
    const pagesVisited = pageNumber * roomsPerPage;
    const displayRooms = filteredRooms.slice(pagesVisited, pagesVisited + roomsPerPage);
    const pageCount = Math.ceil(filteredRooms.length / roomsPerPage);
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
                    {displayRooms.map((room) => (

                        <tr key={room.roomId}>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/room/edit/${room.roomId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-roomid={room.roomId}
                                >
                                    {room.roomId}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/room/edit/${room.roomId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-roomid={room.roomId}
                                >
                                    {room.name}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/room/edit/${room.roomId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-roomid={room.roomId}
                                >
                                    {room.since}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/room/edit/${room.roomId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-roomid={room.roomId}
                                >
                                    {room.until}
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