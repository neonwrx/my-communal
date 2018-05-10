import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { recordUpdate, saveRecord } from '../actions';
import { Card, CardSection, Button } from './common';
import RecordForm from './RecordForm';

class EditRecord extends Component {
  componentWillMount() {
    _.each(this.props.item, (value, prop) => {
      this.props.recordUpdate({ prop, value });
    });
    // console.log('rrr',this.props);
  }

  onButtonPress() {
    const { data, date, payment, subsidy, uid } = this.props;
    const { uidItem } = this.props.item;

    this.props.saveRecord({ data, date, payment, subsidy, uid, uidItem });
    // console.log('jjj', this.props);
  }

  render() {
    // console.log('thi', this.props.item);
    return (
      <Card>
        <RecordForm {...this.props} />
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
  const { data, date, payment, subsidy } = state.recordsForm;
  // console.log('st', state);
  return { data, date, payment, subsidy };
};

export default connect(mapStateToProps, { recordUpdate, saveRecord })(EditRecord);
