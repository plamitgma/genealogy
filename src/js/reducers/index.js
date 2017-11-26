import { combineReducers } from 'redux';
import user from './user';
import person from './person';

export default combineReducers({
  user,
  person
});
