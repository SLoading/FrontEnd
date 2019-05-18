import * as React from 'react';
import * as axios from 'axios';

export class PersonalList extends React.Component {
  state = {
  people : []
  }
  componentDidMount() {
  axios.get(`https://jsonplaceholder.typicode.com/users`)
.then(res {
const people = res.data;
this.setState({ people });
})
}
render() {
    return (
      <ul>
        { this.state.persons.map(person => <li>{person.name}</li>)}
      </ul>
    )
  }
}
