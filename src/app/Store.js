import { combineReducers } from 'redux';
import UserRed from '../reducer/reducer';



const allReducers = combineReducers({
  users: UserRed
})

export default allReducers;
