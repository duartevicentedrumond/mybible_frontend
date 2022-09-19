import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../design/style";
import InputTableForm from "../../../general_components/Forms/InputTableForm";

import { RiHashtag } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SettingsCategoriesModal(data) {

    //define initial given variables
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    const categories = data.categories;
    const [settingsCategories, setSettingsCategories] = data.state;

    const [searchText, setSearchText] = useState("");
    const filteredCategories = settingsCategories.filter(
        category => {
            if (
                String(category.categoryId).includes(searchText) ||
                category.description.toLowerCase().includes(searchText.toLocaleLowerCase())) {
                return category
            }
        }
    );

    function handleInput(e) {
        const text = e.target.value;
        setSearchText(text);
        setPageNumber(0);
    };

    const [pageNumber, setPageNumber] = useState(0);
    const CategoriesPerPage = 8;
    const pagesVisited = pageNumber * CategoriesPerPage;
    const displayCategories = filteredCategories.slice(pagesVisited, pagesVisited+CategoriesPerPage);
    const pageCount = Math.ceil(filteredCategories.length / CategoriesPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected);
    };

    //udpate category state when description input changes
    function handleDescriptionChange(e) {

        const updatedTypes = displayCategories.map( (category, i) => {
            if(i === parseFloat(e.target.id)) {
                category.description = e.target.value;
            }
            return category;
        });

        setSettingsCategories(updatedTypes);
    };

    //udpate category state when status input changes
    function handleActiveChange(e) {

        const updatedTypes = filteredCategories.map( (category, i) => {
            if(i === parseFloat(e.target.id)) {
                category.active = e.target.value;
            }
            return category;
        });

        setSettingsCategories(updatedTypes);
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
                {/*transaction categories input form*/}
                <div className="d-flex flex-column table-responsive py-2">

                    <Styled.FormSearchBar
                        className="d-flex flex-row align-items-baseline px-3 py-2"
                        onChange={handleInput}
                        category="text"
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
                                <Styled.TableTitleColumn scope="col" className="text-end px-4" style={{'whiteSpace': 'nowrap'}}>
                                    #
                                </Styled.TableTitleColumn>
                                <Styled.TableTitleColumn scope="col" className="text-start px-4" style={{'whiteSpace': 'nowrap'}}>
                                    Status
                                </Styled.TableTitleColumn>
                                <Styled.TableTitleColumn scope="col" className="text-start px-4" style={{'whiteSpace': 'nowrap'}}>
                                    Description
                                </Styled.TableTitleColumn>
                            </tr>
                        </thead>

                        <tbody style={{borderTop: '0px'}}>
                            {displayCategories.map( (category, index) => ( 
                                
                                <tr key={category.categoryId}>
                                    <Styled.TableRow scope="col" className="text-end align-middle px-4">
                                        {category.categoryId}
                                    </Styled.TableRow>
                                    <Styled.TableRow
                                        scope="col" className="text-start align-middle px-4">
                                            <InputTableForm
                                                value={category.active}
                                                onChangeField={handleActiveChange}
                                                placeholder="true"
                                                id={index}
                                            />
                                    </Styled.TableRow>
                                    <Styled.TableRow
                                        scope="col" className="text-start align-middle px-4">
                                            <InputTableForm
                                                value={category.description}
                                                onChangeField={handleDescriptionChange}
                                                placeholder="category..."
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