import React, { useContext, useEffect } from 'react';
import { IoAdd, IoSync, IoCloseCircleOutline, IoReturnDownForwardOutline } from "react-icons/io5";

import CategoryContext from "../../context/Wallet/Category/CategoryContext";
import PersonContext from "../../context/Person/Person/PersonContext";

import { Styled__Title, Styled__Input } from "../../design/style";

const SubtransactionsForm = (data) => {

    const object = data.object;
    const setObject = data.setObject;

    const { categories, getCategories } = useContext(CategoryContext);
    const { people, getPeople } = useContext(PersonContext);

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        //retrieve existing subtransaction categories and people
        getCategories();
        getPeople();

    }
  , []); //no dependency

    const handleChange = e => {

        const index = e.target.id;

        if(e.target.name === "category"){
            object.subtransactions[index][e.target.name]['categoryId'] = e.target.value;

        } else if(e.target.name === "person"){
            object.subtransactions[index][e.target.name]['personId'] = e.target.value;
        } else {

            if(index === ''){ //field placed directly inside transaction; it is not an field from transaction's arrays
                object[e.target.name] = e.target.value;
            } else {
                object.subtransactions[index][e.target.name] = e.target.value;
            }
        }

        setObject({...object, object});
    };

    //add new subtransaction
    const addSubtransaction = e => {
        
        //prevents page refresh on click
        e.preventDefault();

        const clonedTransaction = {...object};
        const lengthSubtransactions = clonedTransaction.subtransactions.length;

        clonedTransaction.subtransactions[lengthSubtransactions] = {
        amount: '',
        category: { categoryId: '1' },
        person: { personId: '1' }
        }

        setObject({...object, clonedTransaction});
        
    };

    //delete new subtransaction
    const deleteSubtransaction = e => {

        //prevents page refresh on click
        e.preventDefault();

        object.subtransactions.splice(e.target.id, 1)

        setObject({...object, object});  
    };

    return (

        <div>

            {/*transaction subtransactions input form*/}
            {object.subtransactions.map( (subtransaction, index) => (

                <div>

                    <hr className="my-1"/>

                    <div className="row">

                        {/* delete subtransaction button */}
                        <div className="col-auto d-flex align-items-center px-1">
                            <Styled__Title.Button onClick={deleteSubtransaction} >
                                <IoCloseCircleOutline id={index} />
                            </Styled__Title.Button>
                        </div>

                        {/* subtransaction form */}
                        <div className="col px-1">

                            {/* subtransaction's amount input' */}
                            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
                                <Styled__Input.Label>amount</Styled__Input.Label>
                                <Styled__Input.Input
                                className="flex-fill"
                                type="text"
                                name="amount"
                                placeholder="amount..."
                                id={index}
                                onChange={handleChange}
                                value={subtransaction.amount}
                                />
                            </Styled__Input.Main>

                            {/* subtransaction's category input' */}
                            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
                                <Styled__Input.Label>category</Styled__Input.Label>
                                <Styled__Input.Select
                                name="category"
                                aria-label="category"
                                id={index}
                                value={subtransaction.category.categoryId}
                                onChange={handleChange}
                                >
                                {categories.map( (category) => (
                                    <option value={category.categoryId}>
                                    {category.description}
                                    </option>
                                ))}
                                </Styled__Input.Select>
                            </Styled__Input.Main>

                            {/* subtransaction's person input' */}
                            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
                                <Styled__Input.Label>person</Styled__Input.Label>
                                <Styled__Input.Select
                                name="person"
                                aria-label="person"
                                id={index}
                                value={subtransaction.person.personId}
                                onChange={handleChange}
                                >
                                {people.map( (person) => (
                                    <option value={person.personId}>
                                    {person.nickname}
                                    </option>
                                ))}
                                </Styled__Input.Select>
                            </Styled__Input.Main>

                        </div>
                        
                    </div>

                    {/*add new subtransactions button*/}
                    <div className="row">
                    <Styled__Title.Button onClick={addSubtransaction} className='d-flex align-items-center px-1'>
                        <IoReturnDownForwardOutline/>
                    </Styled__Title.Button>
                    </div>

                </div>
            ))}

        </div>

    )

};

export default SubtransactionsForm;