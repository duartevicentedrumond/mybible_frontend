import React, { useState } from 'react';

import { Styled } from "../../../design/style";

export default function PersonTable(data) {

    //define initial variables
    const people = data.people;
    const onPersonClick = data.onPersonClick;
    const handleCloseModal = data.handleCloseModal;
    const index = data.index;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a person
        if (onPersonClick !== undefined && index === undefined) {
            //prevent page refresh
            e.preventDefault();
            onPersonClick(e);
            handleCloseModal();
        } else if (onPersonClick !== undefined && index !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onPersonClick(e, index);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredPeople = people.filter(
        person => {
            if (
                String(person.personId).includes(searchText) ||
                person.nickname.toLowerCase().includes(searchText.toLocaleLowerCase()) ||
                person.birthday.toLowerCase().includes(searchText.toLocaleLowerCase()) || 
                String(person.fullName).includes(searchText)) {
                return person
            }
        }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const peoplePerPage = 8;
    const pagesVisited = pageNumber * peoplePerPage;
    const displayPeople = filteredPeople.slice(pagesVisited, pagesVisited+peoplePerPage);
    const pageCount = Math.ceil(filteredPeople.length / peoplePerPage);
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
                        <Styled.TableTitleColumn
                            scope="col"
                            className="col-1 text-start px-4"
                            style={{'whiteSpace': 'nowrap'}}
                        >
                            Name
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn 
                            scope="col" 
                            className="col text-start px-4" 
                            style={{'whiteSpace': 'nowrap'}}
                        >
                            Full Name
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn 
                            scope="col" 
                            className="col-1 text-start px-4" 
                            style={{'whiteSpace': 'nowrap'}}
                        >
                            Age
                        </Styled.TableTitleColumn>
                        <Styled.TableTitleColumn 
                            scope="col" 
                            className="col-1 text-start px-4" 
                            style={{'whiteSpace': 'nowrap'}}
                        >
                            Birthday
                        </Styled.TableTitleColumn>
                    </tr>
                </thead>

                <tbody style={{borderTop: '0px'}}>
                    {displayPeople.map( (person) => {

                        if (person.personId !== 0) {
                            return (
                                <tr key={person.personId}>
                                    <th 
                                        scope="col" 
                                        className="text-start align-middle px-4"
                                    >
                                        <Styled.TableRowLink 
                                            style={{'whiteSpace': 'nowrap'}}
                                            to={`/people/edit/${person.personId}`}
                                            onClick={onRowClick}
                                            data-personid={person.personId} 
                                            data-nickname={person.nickname} 
                                        >
                                            {person.nickname}
                                        </Styled.TableRowLink>
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-start align-middle px-4"
                                    >
                                        <Styled.TableRowLink 
                                            style={{'whiteSpace': 'nowrap'}}
                                            to={`/people/edit/${person.personId}`}
                                            onClick={onRowClick}
                                            data-personid={person.personId} 
                                            data-nickname={person.nickname}
                                        >
                                            {person.fullName}
                                        </Styled.TableRowLink>
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-start px-4 align-middle"
                                    >
                                        <Styled.TableRowLink 
                                            style={{'whiteSpace': 'nowrap'}}
                                            to={`/people/edit/${person.personId}`}
                                            onClick={onRowClick}
                                            data-personid={person.personId} 
                                            data-nickname={person.nickname}
                                        > 
                                            {person.age}
                                        </Styled.TableRowLink>
                                    </th>
                                    <th
                                        scope="col"
                                        className="text-start px-4 align-middle"
                                    >
                                        <Styled.TableRowLink 
                                            style={{'whiteSpace': 'nowrap'}}
                                            to={`/people/edit/${person.personId}`}
                                            onClick={onRowClick}
                                            data-personid={person.personId} 
                                            data-nickname={person.nickname}
                                        > 
                                            {person.birthday}
                                        </Styled.TableRowLink>
                                    </th>
                                </tr>
                            );
                        };
                        
                    })}
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