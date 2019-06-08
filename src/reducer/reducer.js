import React from 'react'
  const initialState = {
    Timetable: []
  }


  const todos = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_TIMETABLE':
        return [...state,
          {text:action.text}]
      default:
      return state
    }
  }



  // const todos = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'GET_TIMETEABLE':
  //       return state.concat([action.text])
  //     default:
  //     return state
  //   }
  // }

export default todos
