import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class Company extends Component {

  onRowPress() {
    Actions.recordContent({ item: this.props.item });
  }

  render() {
    const {name} = this.props.item;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    paddingTop: 5,
    paddingBottom: 5
  },
};

export default Company;
