import React from 'react'
import axios  from 'axios';

  const initialState = {
    users: [],
    Timetable: " "
  }
let done = []
function test (action){
     axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName: action.group} })
       .then(res => {
           done = res.data
           console.log(done)
       })
}

const rootReducer = (state = initialState, action) => {
    if (action.type === 'ADD_POST'){
      test(action)
      return{
        ...state,
        Timetable: done
      }
    }
    return state;
  }


export default rootReducer
