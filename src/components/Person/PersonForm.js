import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import PersonContext from "../../context/Person/Person/PersonContext";
import { Styled } from "../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";
import { RiParentLine, RiHashtag } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";

import InputForm from "../../general_components/Forms/InputForm";
import DateForm from "../../general_components/Forms/DateForm";

export default function PersonForm() {

  //define initial variables

    //get context for addTransaction and updateTransaction functions and persons object
    const { addPerson, people, updatePerson, deletePerson, getPeople } = useContext(PersonContext);

    //get frontend directory
    const history = useNavigate();

    //get parameters from url
    const params = useParams();

    //set state for person
    const [person, setPerson] = useState({  
      nickname: null,
      fullName: null,
      birthday: dateToString(new Date()),
      age: null,
      starred: false
    });

    //function to get string date from date object
    function dateToString(date) {

      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const dateString = year + "-" + month + "-" + day;

      return dateString;

    };

  //define handle person input changes

    //udpate person state when nickname input changes
    function handleNicknameChange(e) {
      setPerson(existingPerson => ({
        ...existingPerson,
        nickname: e.target.value
      }));
    };

    //udpate person state when full name input changes
    function handleFullNameChange(e) {
      setPerson(existingPerson => ({
        ...existingPerson,
        fullName: e.target.value
      }));
    };

    //udpate person state when birthday input changes
    function handleBirthdayChange(date) {

      const dateString = dateToString(date);

      setPerson(existingPerson => ({
        ...existingPerson,
        birthday: dateString
      }));
    };

    //udpate person state when starred input changes
    function handleStarredChange(e) {
      setPerson(existingPerson => ({
        ...existingPerson,
        starred: e.target.value
      }));
    };

  //saves transaction and redirects to people list page
  function handleSubmit(e) {

    e.preventDefault();

    //if person already exists updates it
    if(person.personId){
      updatePerson(person);
    }
    else{ //if person doesn't exist adds new
      addPerson(person);
    }

    //get people
    getPeople();

    //redirects to transactions list page
    history("/people");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(
    () => {

      //get person (if it exists) from the url id
      const personFound = people.find( (person) => person.personId === parseFloat(params.id));

      // if person exists from url id
      if(personFound) {

        //set person state to the values from url id person
        setPerson(personFound);

      }

    }
  , [params.id, people]); //page first rendering depends on params.id and persons

  return (
    <div className="d-flex flex-column text-start py-3 px-0">
      
      {/*person form title*/}
      <div className="d-inline-flex flex-row align-items-center">

        {/*If person exists sets person number to title*/}
        <Styled.Title className='d-flex pe-2'>
          {person.personId ? person.nickname : 'New person'}
        </Styled.Title>

        {/*Change upload button icon wether the it's a new person or an existing person*/}
        <Styled.TitleButton
          className='d-flex'
          onClick={handleSubmit}
        >
          {person.personId ? 
            <IoSync/> : 
            <IoAdd/>
          }
        </Styled.TitleButton>

      </div>

      <div className="row">
        <div className="d-flex flex-column text-start py-2">

          {/*person nickname input form*/}
          <InputForm
            value={person.nickname}
            onChangeField={handleNicknameChange}
            placeholder="nickname..."
            label="nickname"
          />

          {/*person full name input form*/}
          <InputForm
            value={person.fullName}
            onChangeField={handleFullNameChange}
            placeholder="full name..."
            label="full name"
          />

          {/*person age input form*/}
          <InputForm
            value={person.starred}
            onChangeField={handleStarredChange}
            placeholder="true/false..."
            label="starred"
          />

          {/*person age input form*/}
          <InputForm
            value={person.age}
            placeholder="age..."
            label="age"
            disabled
          />

          {/*person date input form*/}
          <DateForm
            value={person.birthday}
            onChangeField={handleBirthdayChange}
            placeholder="birthday..."
            label="birthday"
          />
        
          </div>

        </div>
    </div>
  )
};