import {
  RECORDS_UPDATE,
  RECORDS_CREATE,
  RECORDS_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  data: '',
  date: '',
  payment: '',
  subsidy: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RECORDS_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case RECORDS_CREATE:
      return INITIAL_STATE;
    case RECORDS_SAVE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
