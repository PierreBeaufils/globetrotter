import { combineReducers } from 'redux';
import user from './user';
import travels from './travels';

export default combineReducers({
  user,
  travels,
});
