import axios  from 'axios';
export default function getProjectList (params) {
return function action (dispatch) {
  dispatch({ type: 'GET_TIMETABLE' })
  const request = axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName:params} })
    .then(res => {
      console.log(res)
      dispatch({
        type: 'GET_TIMETABLE',
        payload:{
          projects: res.data
        }
      })
      return request.then()
}) }}
//   const mapDispatchToProps = dispatch => ({
//     getProjectList: (params) => dispatch(getProjectList(params))
//   })
// }

// const group = InputSearch
//
//     this.props.history.push(`/Timetable/group/${group}`)
//   })
//   .catch(err=>{
//     console.log(err);
//   })
// }
