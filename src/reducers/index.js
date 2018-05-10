import { combineReducers } from 'redux';
// import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from './AuthReducer';
import RecordsReducer from './RecordsReducer';
import RecordsFormReducer from './RecordsFormReducer';
import CompaniesReducer from './CompaniesReducer';

// export default combineReducers({
//   auth: AuthReducer,
//   records: RecordsReducer,
//   recordsForm: RecordsFormReducer,
//   companies: CompaniesReducer,
// });
// const config = {
//   key: 'auth',
//   storage
//  }
// export default persistCombineReducers(config, {
//   auth: AuthReducer,
//   records: RecordsReducer,
//   recordsForm: RecordsFormReducer,
//   companies: CompaniesReducer,
// });
// const authPersistConfig = {
//   key: 'auth',
//   storage
//  }
export default combineReducers({
  // auth: persistReducer(authPersistConfig, AuthReducer),
  auth: AuthReducer,
  records: RecordsReducer,
  recordsForm: RecordsFormReducer,
  companies: CompaniesReducer,
});
