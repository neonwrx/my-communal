import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

import {
  COMPANY_UPDATE,
  COMPANY_CREATE,
  COMPANY_SAVE_SUCCESS,
  RECORDS_UPDATE,
  RECORDS_FETCH_SUCCESS,
  RECORDS_CREATE,
  RECORDS_SAVE_SUCCESS
} from './types';

export const companyUpdate = ({ prop, value }) => {
  return {
    type: COMPANY_UPDATE,
    payload: { prop, value }
  };
}

export const addCompany = ({ name, account_bill }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/records`)
    .push({ name, account_bill })
    .then(() => {
      dispatch({ type: COMPANY_CREATE });
      Actions.companiesList();
    });
  }
}

export const saveCompany = ({ name, account_bill, events, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/records/${uid}`)
      .set({ name, account_bill, events })
      .then(() => {
        dispatch({ type: COMPANY_SAVE_SUCCESS });
        // Actions.companiesList({ type: 'replace' });
        Actions.reset('main');
      });
  }
}

export const companyDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/records/${uid}`)
      .remove()
      .then(() => {
        // Actions.employeeList({ type: 'reset' });
        Actions.reset('main');
      });
  };
}

export const recordUpdate = ({ prop, value }) => {
  return {
    type: RECORDS_UPDATE,
    payload: { prop, value }
  };
}

export const recordsFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/records`)
      .on('value', snapshot => {
        dispatch({ type: RECORDS_FETCH_SUCCESS, payload: snapshot.val() });
      });
  }
}


export const addRecord = ({ data, date, payment, subsidy, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/records/${uid}/events`)
      .push({ data, date, payment, subsidy })
      .then(() => {
        dispatch({ type: RECORDS_CREATE });
        Actions.companiesList();
      });
  }
}

export const saveRecord = ({ data, date, payment, subsidy, uid, uidItem }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/records/${uid}/events/${uidItem}`)
      .set({ data, date, payment, subsidy })
      .then(() => {
        console.log(uidItem);
        dispatch({ type: RECORDS_SAVE_SUCCESS });
        // Actions.companiesList({ type: 'replace' });
        Actions.reset('main');
      });
  }
}

export const recordDelete = ({ uid, uidItem }) => {
  const { currentUser } = firebase.auth();

  return () => {
    firebase.database().ref(`/users/${currentUser.uid}/records/${uid}/events/${uidItem}`)
      .remove()
      .then(() => {
        // Actions.employeeList({ type: 'reset' });
        Actions.reset('main');
      });
  };
}
