import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecord } from '../actions';
import { Card, CardSection, Button } from './common';
import RecordForm from './RecordForm';

class AddRecord extends Component {
  onButtonPress() {
    const { data, date, payment, subsidy } = this.props;
    const { uid } = this.props.item;

    this.props.addRecord({ data, date, payment, subsidy, uid });
    console.log('jjj', this.props);
  }

  render() {
    return (
      <Card>
        <RecordForm  />
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
  const { data, date, payment, subsidy } = state.recordsForm;

  return { data, date, payment, subsidy };
};

export default connect(mapStateToProps, { addRecord })(AddRecord);
