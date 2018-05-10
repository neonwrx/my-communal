import React, { Component } from 'react';
import { View, Image, Animated, Dimensions, ImageBackground } from 'react-native';
import { Form, Item, Input, Button, Text, Icon, Thumbnail, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
// import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonWidth: new Animated.Value(Dimensions.get('window').width-20),
    }
  }
  componentWillMount() {
    console.log('user', this.props);

    if (this.props.user) {
      const { email } = this.props.user;
      const { savedp } = this.props;
      console.log('savedp', savedp)
      // const email = 'Test@test.com';
      // const password = '123456';
      this.props.loginUser({ email, password: savedp });
      // Actions.main();
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    Animated.timing(this.state.buttonWidth, {toValue: 45}).start();
    this.props.loginUser({ email, password });
  }

  renderButtonText() {
    if (this.props.loading) {
      return <Spinner color='white' size='small' />;
    }
    return (
      <Text>Войти</Text>
    );
  }

  render() {
    return (
      <ImageBackground source={require('../img/bg.jpg')} style={{flex:1}}>
        <Form style={styles.containerStyle}>
          <View style={styles.logoStyle}>
            <Image
            source={require('../img/main-logo.png')}
            style={{width: 100, height: 100, marginBottom: 15, shadowOpacity: 0, elevation: 0}}
            />
          </View>
          <Item rounded style={styles.itemStyle}>
            <Icon active name='md-mail' style={{flex:1, fontSize: 20}} />
            <Input
              placeholder="Email"
              style={{flex:8}}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </Item>
          <Item last rounded style={styles.itemStyle}>
            <Icon active name='md-unlock' style={{flex:1}} />
            <Input
              placeholder="Password"
              style={{flex:8}}
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              secureTextEntry
            />
          </Item>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
          <Animated.View style={{width: this.state.buttonWidth, height: 50, marginTop: 10}}>
            <Button block rounded success onPress={this.onButtonPress.bind(this)}>
              {this.renderButtonText()}
            </Button>
          </Animated.View>
        </Form>
      </ImageBackground>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -90,
  },
  itemStyle: {
    marginBottom: 10,
    paddingLeft: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    color: '#fff'
  },
  logoStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    marginBottom: 50,
    borderWidth: 1,
    borderRadius: 75,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, user, savedp } = auth;

  return { email, password, error, loading, user, savedp };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm);
