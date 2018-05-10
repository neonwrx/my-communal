import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { companyUpdate } from '../actions';
import { CardSection, Input } from './common';

class CompanyForm extends Component {
  render() {
    console.log('this.props',this.props);
    return (
      <View>
        <CardSection>
          <Input
            label="Название"
            placeholder="Название компании"
            value={this.props.name}
            onChangeText={value => this.props.companyUpdate({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Счет"
            placeholder="Введите номер счета"
            value={this.props.account_bill.toString()}
            onChangeText={value => this.props.companyUpdate({ prop: 'account_bill', value })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, account_bill } = state.companies;

  // return { name, account_bill };
  return state;
};

export default connect(mapStateToProps, { companyUpdate })(CompanyForm);
