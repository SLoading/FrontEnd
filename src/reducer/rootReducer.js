import React from 'react'
import axios  from 'axios';

  const initialState = {
    users: [],
    Timetable: " "
  }


const rootReducer = (state = initialState, action) => {
    if (action.type === 'ADD_POST'){
      return{
        ...state,
        Timetable: action.group
      }
    }
    return state;
  }


export default rootReducer
