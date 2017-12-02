import { combineReducers } from 'redux';
import user from './user';
import person from './person';
import searchData from './searchData';

export default combineReducers({
  user,
  person,
  searchData
});
