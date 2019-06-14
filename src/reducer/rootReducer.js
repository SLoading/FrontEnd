import React from 'react'
import axios  from 'axios';

  const initialState = {
    users: [],
    Timetable: " "
  }


const rootReducer = (state = initialState, action) => {
  console.log(action.group)
    if (action.type === 'ADD_POST'){
      return{
        ...state,
        Timetable: action.group
      }
    }
    return state;
  }


export default rootReducer
