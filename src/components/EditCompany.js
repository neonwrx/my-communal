import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { companyUpdate, saveCompany } from '../actions';
import { Card, CardSection, Button } from './common';
import CompanyForm from './CompanyForm';

class EditCompany extends Component {
  componentWillMount() {
    _.each(this.props.item, (value, prop) => {
      this.props.companyUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, account_bill } = this.props;
    const { uid, events } = this.props.item;

    this.props.saveCompany({ name, account_bill, events, uid });
    // console.log('jjj', this.props);
    // alert('Test');
  }

  render() {
    return (
      <Card>
        <CompanyForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Сохранить
          </Button>
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { name, account_bill } = state.companies;

  return { name, account_bill };
};

export default connect(mapStateToProps, { companyUpdate, saveCompany })(EditCompany);
