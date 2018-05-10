import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Confirm } from './common';
import { Actions } from 'react-native-router-flux';
import { recordDelete } from '../actions';


class RecordDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditButtons: false,
      showModal: false
    }
  }

  onRowPress() {
    this.setState({showEditButtons: !this.state.showEditButtons});
  }

  onEditPress() {
    Actions.editRecord({ item: this.props.itemContent, uid: this.props.uid});
  }

  onAccept() {
    const { uid } = this.props;
    const { uidItem } = this.props.itemContent;

    this.props.recordDelete({ uid, uidItem });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  showEditButtons() {
    if (this.state.showEditButtons) {
      return (
        <View style={styles.actionContainerStyle}>
          <TouchableOpacity
            style={styles.editButtonStyle}
            onPress={this.onEditPress.bind(this)}
          >
            <Image style={styles.iconEditStyle} source={require('../img/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButtonStyle}
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            <Image style={styles.iconDelStyle} source={require('../img/delete.png')} />
          </TouchableOpacity>
          <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
          >
            Удалить запись?
          </Confirm>
        </View>
      )
    }
  }

  render() {
    const { date, data, payment, subsidy } = this.props.itemContent;
    const { lastData } = this.props;
    return (
      <CardSection>
        <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
          <View style={styles.rootContainerStyle}>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Дата</Text>
              <Text style={styles.textDataStyle}>{date}</Text>
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Показания</Text>
              <Text style={styles.textDataStyle}>{data}</Text>
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Субсидия</Text>
              <Text style={styles.textDataStyle}>{subsidy} грн</Text>
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Оплата</Text>
              <Text style={styles.textDataStyle}>{payment} грн</Text>
            </View>
            <View style={{paddingBottom: 10}}></View>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Пред. показания</Text>
              <Text style={styles.textDataStyle}>{lastData}</Text>
            </View>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Разница</Text>
              <Text style={styles.textDataStyle}>{data - lastData}</Text>
            </View>
            {this.showEditButtons()}
          </View>
        </TouchableWithoutFeedback>
      </CardSection>
    )
  }
}

const styles = {
  rootContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    height: 250,
  },
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  textStyle: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#ccc',
    flex: 1
  },
  textDataStyle: {
    fontSize: 16,
    // textAlign: 'center',
    flex: 1
  },
  actionContainerStyle: {
    position: 'absolute',
    top: 80,
    right: 10,
    width: 40,
    height: 96,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editButtonStyle: {
    width: 40,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d6d7da',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDelStyle: {
    width: 30,
    height: 30,
  },
  iconEditStyle: {
    width: 25,
    height: 25,
  }
};

const mapStateToProps = (state) => {
  // const { data, date, payment, subsidy } = state.recordsForm;

  return state;
};

export default connect(mapStateToProps, { recordDelete })(RecordDetail);
