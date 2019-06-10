import axios  from 'axios';
export default function getProjectList (params) {
  let W
  console.log("123 " +params)
 const action = ()=> {
      console.log("Hi")
    const request = axios.get(`http://127.0.0.1:3030/api/getTimetable`,{ params: {groupName:params} })
      .then(res => {
          W = res
      })
    }
    return W
}
