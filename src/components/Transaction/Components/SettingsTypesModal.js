import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../design/style";
import InputTableForm from "../../../general_components/Forms/InputTableForm";

import { RiHashtag } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SettingsTypesModal(data) {

    //define initial given variables
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    const types = data.types;
    const [settingsTypes, setSettingsTypes] = data.state;

    const [searchText, setSearchText] = useState("");
    const filteredTypes = settingsTypes.filter(
        type => {
            if (
                String(type.typeId).includes(searchText) ||
                type.description.toLowerCase().includes(searchText.toLocaleLowerCase())) {
                return type
            }
        }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const typesPerPage = 8;
    const pagesVisited = pageNumber * typesPerPage;
    const displayTypes = filteredTypes.slice(pagesVisited, pagesVisited+typesPerPage);
    const pageCount = Math.ceil(filteredTypes.length / typesPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    //udpate type state when description input changes
    function handleDescriptionChange(e) {

        const updatedTypes = displayTypes.map( (type, i) => {
            if(i === parseFloat(e.target.id)) {
                type.description = e.target.value;
            }
            return type;
        });

        setSettingsTypes(updatedTypes);
    };

    //udpate type state when status input changes
    function handleActiveChange(e) {

        const updatedTypes = filteredTypes.map( (type, i) => {
            if(i === parseFloat(e.target.id)) {
                type.active = e.target.value;
            }
            return type;
        });

        setSettingsTypes(updatedTypes);
    };

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        <RiHashtag/> Types
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*transaction types input form*/}
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
                    <table className="table table-sm w-auto">

                        <thead>
                            <tr>
                                <Styled.TableTitleColumn 
                                    scope="col" 
                                    className="col-1 text-end px-4" 
                                    style={{'whiteSpace': 'nowrap'}}
                                >
                                    #
                                </Styled.TableTitleColumn>
                                <Styled.TableTitleColumn 
                                    scope="col" 
                                    className="col-1 text-start px-4"
                                    style={{'whiteSpace': 'nowrap'}}
                                >
                                    Status
                                </Styled.TableTitleColumn>
                                <Styled.TableTitleColumn 
                                    scope="col" 
                                    className="text-start px-4"
                                    style={{'whiteSpace': 'nowrap'}}
                                >
                                    Description
                                </Styled.TableTitleColumn>
                            </tr>
                        </thead>

                        <tbody style={{borderTop: '0px'}}>
                            {displayTypes.map( (type, index) => ( 
                                
                                <tr key={type.typeId}>
                                    <Styled.TableRow 
                                        scope="col" 
                                        className="text-end align-middle px-4"
                                    >
                                        {type.typeId}
                                    </Styled.TableRow>
                                    <Styled.TableRow
                                        scope="col" className="text-start align-middle px-4">
                                            <InputTableForm
                                                value={type.active}
                                                onChangeField={handleActiveChange}
                                                placeholder="true"
                                                id={index}
                                            />
                                    </Styled.TableRow>
                                    <Styled.TableRow
                                        scope="col" className="text-start align-middle px-4">
                                            <InputTableForm
                                                value={type.description}
                                                onChangeField={handleDescriptionChange}
                                                placeholder="type..."
                                                id={index}
                                            />
                                    </Styled.TableRow>
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
                
            </Modal.Body>
            <Modal.Footer>
                <Styled.TitleButton 
                    onClick={handleCloseModal}
                >
                    <IoCloseCircleOutline/>
                </Styled.TitleButton>
            </Modal.Footer>
        </Modal>

    )

};