import React, { useState } from 'react';

import { Styled } from "../../../../design/style";

export default function SectionTable(data) {

    //define initial variables
    const sections = data.sections;
    const onSectionClick = data.onSectionClick;
    const handleCloseModal = data.handleCloseModal;

    //execute this when a row is selected
    function onRowClick(e) {

        //if used to select a section
        if (onSectionClick !== undefined) {
            //prevent page refresh
            e.preventDefault();
            onSectionClick(e);
            handleCloseModal();
        }

    }

    const [searchText, setSearchText] = useState("");
    const filteredSections = sections.filter(section => {
        if (
            String(section.sectionId).includes(searchText) ||
            String(section.name).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(section.since).toLowerCase().includes(searchText.toLocaleLowerCase()) ||
            String(section.until).includes(searchText)
        ) {
            return section;
        }
    }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const sectionsPerPage = 8;
    const pagesVisited = pageNumber * sectionsPerPage;
    const displaySections = filteredSections.slice(pagesVisited, pagesVisited + sectionsPerPage);
    const pageCount = Math.ceil(filteredSections.length / sectionsPerPage);
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
                    {displaySections.map((section) => (

                        <tr key={section.sectionId}>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/section/edit/${section.sectionId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-sectionid={section.sectionId}
                                >
                                    {section.sectionId}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start align-middle px-4"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/section/edit/${section.sectionId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-sectionid={section.sectionId}
                                >
                                    {section.name}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/section/edit/${section.sectionId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-sectionid={section.sectionId}
                                >
                                    {section.since}
                                </Styled.TableRowLink>
                            </th>
                            <th
                                scope="col"
                                className="text-start px-4 align-middle"
                            >
                                <Styled.TableRowLink
                                    style={{ 'whiteSpace': 'nowrap' }}
                                    to={`/item/section/edit/${section.sectionId}`}
                                    onClick={(e) => onRowClick(e)}
                                    data-sectionid={section.sectionId}
                                >
                                    {section.until}
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