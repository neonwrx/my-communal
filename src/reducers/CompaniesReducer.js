import {
  COMPANY_CREATE,
  COMPANY_UPDATE,
  COMPANY_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  account_bill: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COMPANY_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case COMPANY_CREATE:
      return INITIAL_STATE;
    case COMPANY_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
