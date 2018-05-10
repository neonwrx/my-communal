import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from './common';

class RecordContent extends Component {
  onRowPress(itemContent, lastData) {
    Actions.recordDetail({ itemContent, lastData, uid: this.props.item.uid });
  }

  onButtonPress() {
    Actions.addRecord({ item: this.props.item });
  }

  render() {
    const events = (this.props.item.events) ?
      _.map(this.props.item.events, (val, uidItem) => {
        return { ...val, uidItem };
      })
    : [];
    const arr = events.slice().reverse();
    let lastData = 0;

    return (
      <ScrollView>
        <Card>
          <CardSection>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Компания: </Text>
              <Text style={styles.textDataStyle}>{this.props.item.name}</Text>
            </View>
          </CardSection>
          <CardSection style={{borderBottomWidth: 2}}>
            <View style={styles.containerStyle}>
              <Text style={styles.textStyle}>Номер счета: </Text>
              <Text style={styles.textDataStyle}>{this.props.item.account_bill}</Text>
            </View>
          </CardSection>
          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Новая запись
            </Button>
          </CardSection>
          {
            events.reverse().map((itemContent, index) => {
              const { date, data } = itemContent;

              if (index !== arr.length-1) {
                lastData = arr[index+1].data;
              } else {
                lastData = data;
              }
              return (
                <CardSection key={index}>
                  <TouchableWithoutFeedback onPress={this.onRowPress.bind(this, itemContent, lastData)}>
                    <View style={styles.containerStyle}>
                      <Text style={styles.textStyle}>Дата</Text>
                      <Text style={styles.textDataStyle}>{date}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </CardSection>
              )
            })
          }
        </Card>
      </ScrollView>
    );
  }
}

const styles = {
  containerStyle: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
  },
  textStyle: {
    paddingLeft: 20,
    fontSize: 16,
    color: '#ccc',
    flex: 1
  },
  textDataStyle: {
    fontSize: 16,
    textAlign: 'center',
    flex: 2
  },
};

export default RecordContent;
