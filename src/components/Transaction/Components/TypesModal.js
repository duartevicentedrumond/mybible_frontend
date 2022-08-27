import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../design/style";
import CheckForm from "../../../general_components/Forms/CheckForm";

import { RiHashtag } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function TypesModal(data) {

    //define initial given variables
    const [transaction, setTransaction] = data.transactionState;
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    const types = data.types;

    //udpate transaction state when types input changes
    function handleTypesChange(e) {

        //add new type to transaction if checked
        if (e.target.checked) {

          setTransaction(existingTransaction => ({
            ...existingTransaction,
            types: [
              ...existingTransaction.types,
              { typeId: parseFloat(e.target.value) }
            ]
          }));

        } else { //remove type from transaction if unchecked

          setTransaction(existingTransaction => ({
            ...existingTransaction,
            types: existingTransaction.types.filter(type => type.typeId !== parseFloat(e.target.value))
          }));
          
        }
    };

    //set code to run on transaction list' rows click
    function onRowClick(e){
        
        //prevent page refresh
        e.preventDefault();

        handleCloseModal();

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
                {types.map(
                    (type, i) => (

                        <CheckForm
                            value={type.typeId}
                            onChangeField={handleTypesChange}
                            fieldChecked={
                            transaction.types.find( transactionType => transactionType.typeId === type.typeId)
                            }
                            id={i}
                            description={type.description}
                        />

                    )
                )}
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