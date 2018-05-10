import { REHYDRATE } from 'redux-persist';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  savedp: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case REHYDRATE:
    //   return {
    //     ...state,
    //     saveduser: action.payload
    //   };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload.user, savedp: action.payload.password };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case LOGOUT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};
