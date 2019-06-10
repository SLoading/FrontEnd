import { combineReducers } from 'redux';
import UserRed from '../reducer/rootReducer';



const allReducers = combineReducers({
  users: UserRed
})

export default allReducers;
