import { combineReducers } from 'redux';
import user from './user';
import person from './person';
import searchPerson from './searchPerson';

export default combineReducers({
  user,
  person,
  searchPerson
});
