import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import { List, ListItem, Button, Icon, Text, Left, Body } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { recordsFetch, logoutUser, companyDelete } from '../actions';
import { Confirm } from './common';

class CompaniesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedUid: '',
    }
  }

  componentWillMount() {
    this.props.recordsFetch();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {

    this.createDataSource(nextProps);
  }

  createDataSource({ items }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(items);
  }

  onDeletePress(item) {
    this.setState({ showModal: !this.state.showModal, selectedUid: item.uid });
  }

  onAccept() {
    const { selectedUid } = this.state;

    this.props.companyDelete({ uid: selectedUid });
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  onLogoutPress() {
    this.props.logoutUser();
    Actions.auth();
  }

  render() {
    return (
      <View style={styles.containerStyle}>
        <List
          style={{width: '100%'}}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={item =>
              <ListItem  onPress={() => Actions.recordContent({ item })}>
                <Body>
                  <Text style={styles.titleStyle}> {item.name} </Text>
                </Body>
                <Icon name="ios-arrow-forward" />
              </ListItem>}
          renderLeftHiddenRow={item =>
            <Button full success onPress={() => Actions.editCompany({ item })}>
              <Icon active name="md-create" />
            </Button>}
          renderRightHiddenRow={(item) =>
            <Button full danger onPress={() => this.onDeletePress(item)}>
              <Icon active name="md-trash" />
            </Button>}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
        <Button
          rounded
          outline
          onPress={this.onLogoutPress.bind(this)}
          style={styles.logoutButtonStyle}
        >
          <Icon active name="md-exit" style={{color: '#fff', fontSize: 20}} />
        </Button>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Удалить компанию?
        </Confirm>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  logoutButtonStyle: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#3f5270',
    width: 48,
    height: 48,

  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
}

const mapStateToProps = (state) => {
  const items = _.map(state.records, (val, uid) => {
    return { ...val, uid };
  });
  return { items };
}

export default connect(mapStateToProps, { recordsFetch, logoutUser, companyDelete })(CompaniesList);
