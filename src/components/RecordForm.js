import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { recordUpdate } from '../actions';
import { CardSection, Input } from './common';
import TextInputMask from 'react-native-text-input-mask';

class RecordForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>Дата</Text>
            <TextInputMask
              style={styles.inputStyle}
              placeholder="2018-01-01"
              value={this.props.date}
              onChangeText={value => this.props.recordUpdate({ prop: 'date', value })}
              mask={"[0000]-[00]-[00]"}
              keyboardType={'numeric'}
              keyboardShouldPersistTaps
            />
          </View>
        </CardSection>

        <CardSection>
          <Input
            label="Показания"
            placeholder="555"
            value={this.props.data}
            onChangeText={value => this.props.recordUpdate({ prop: 'data', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Субсидия"
            placeholder="10.00"
            value={this.props.subsidy}
            onChangeText={value => this.props.recordUpdate({ prop: 'subsidy', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Оплата"
            placeholder="100.00"
            value={this.props.payment}
            onChangeText={value => this.props.recordUpdate({ prop: 'payment', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 18,
    flex: 2
  },
  labelStyle: {
    color: '#ccc',
    fontSize: 16,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { recordUpdate })(RecordForm);
