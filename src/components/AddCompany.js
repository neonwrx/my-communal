import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCompany } from '../actions';
import { Card, CardSection, Button } from './common';
import CompanyForm from './CompanyForm';

class AddCompany extends Component {
  onButtonPress() {
    const { name, account_bill } = this.props;

    this.props.addCompany({ name, account_bill });
    // console.log('jjj', this.props);
  }

  render() {
    return (
      <Card>
        <CompanyForm {...{name: '', account_bill: ''}} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Добавить
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

export default connect(mapStateToProps, { addCompany })(AddCompany);
