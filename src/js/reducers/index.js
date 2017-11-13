import { combineReducers } from 'redux';
import cities_district from './cities_district';
import country from './country';
import location from './location';
import signUp from './signUp';
import venue from './venue';
import login from './login';
import forgotPassword from './forgotPassword';
import myEvent from './myEvent';
import user from './user';
import order from './order';
import invoice from './invoice';
import event from './event';

export default combineReducers({
  cities_district,
  country,
  location,
  signUp,
  venue,
  login,
  forgotPassword,
  myEvent,
  user,
  order,
  invoice,
  event
});
