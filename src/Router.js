import React from 'react';
import { Stack, Scene, Router, Actions } from 'react-native-router-flux';
import { Icon } from 'native-base';
import LoginForm from './components/LoginForm';
import CompaniesList from './components/CompaniesList';
import AddCompany from './components/AddCompany';
import EditCompany from './components/EditCompany';
import RecordContent from './components/RecordContent';
import RecordDetail from './components/RecordDetail';
import AddRecord from './components/AddRecord';
import EditRecord from './components/EditRecord';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root" hideNavBar={true} type="replace">
        <Scene key="auth" >
          <Scene key="login" component={LoginForm} title="Авторизация" />
        </Scene>

        <Scene key="main">
          <Scene
            onLeft={() => Actions.addCompany()}
            leftButtonImage={require('./img/add.png')}
            leftButtonIconStyle={{width: 25, height: 25, marginRight: 1}}
            key="companiesList"
            component={CompaniesList}
            title="Компании"
            initial
          />
          <Scene key="addCompany" component={AddCompany} title="Добавить компанию" back="false" />
          <Scene key="editCompany" component={EditCompany} title="Редактировать компанию" back="false" />
          <Scene key="recordContent" component={RecordContent} title="Записи" back="false" />
          <Scene key="recordDetail" component={RecordDetail} title="Запись" back="false" />
          <Scene key="addRecord" component={AddRecord} title="Добавить запись"back="false" />
          <Scene key="editRecord" component={EditRecord} title="Редактировать запись" back="false" hideBackImage />
        </Scene>
      </Stack>
    </Router>
  );
};

export default RouterComponent;
