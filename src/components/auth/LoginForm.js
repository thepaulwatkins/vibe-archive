/*Login form displayed when the app is opened if the user is not already logged in. */
import React, { Component } from 'react';
import { 
  View, 
  Text,
  TouchableOpacity, 
  TouchableWithoutFeedback,
  KeyboardAvoidingView, 
  Keyboard, 
  AsyncStorage,
  Platform,
  Image,
  Dimensions
} from 'react-native';
import { Amplitude } from 'expo';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../../actions';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class LoginForm extends Component {
  /*Before the screen shows up, check and see if the user is still logged in from previous use.
  If they are logged in, redirect them to the home page and skip the login process. This provides a
  better user experience. Go into the asynchronous storage and see if the token titled 'userId' is
  present. (This token can be seen addded in HomePage.js) If the token does not exist, you know the user
  is currently logged out and should therefore log in. If it does exist, send them to home. */
  async componentDidMount() {
    const value = await AsyncStorage.getItem('userId');
    const apiKey = '8453e5bfed94fced5e457a11aab4bb41';
    if (value !== null) {
      Actions.home();
      Amplitude.initialize(apiKey);
      Amplitude.logEvent('NEW_SESSION');
    } else {
      return;
    }
  }

  /*Event handler to receive the updated text email field */
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  /*Event handler to receive the updated text password field */
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  /*Event handler to login user with the entered credentials */
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  /*Show either the button or the spinner when loading to let the 
  user know something is happening. If the app is attempting to log the user in, show the spinner
  so they know the app is in the process of checking their credentials. */
  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  /*Display the error message on the screen if an error while logging in is found. A typical error at this
  point includes the incorrect email, incorrect password, or both. */
  renderError() {
    if (this.props.error) {
      return (
        <View style={styles.itemContainerStyle}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  /*The main render method! All of the components here are wrapped inside a ToucheablwWithoutFeedback component
  so the user can touch anywhere on the screen and dismiss the keyboard, providing a better user experience. The
  Keyboard Avoiding View is important so the keyboard does not cover the text inputs **although I'm still having this
  problem on slightly older phones like the iPhone 6. Within the render method lies the title of the app, the
  email and password fields, the log in button/spinner, and a button to go and create a new account. I've commented
  out the 'forgot password' screen for the moment and it should be return to later. */
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView 
          style={styles.containerStyle}
          behavior={(Platform.OS === 'ios') ? 'padding' : null}
          // keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
          enabled
        >
          <View style={styles.containerStyle}>
            <View style={{ position: 'absolute' }}>
                <Image 
                    source={require('../../../assets/images/graphics/Intro1.png')}
                    style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                />
            </View>
            <View style={styles.titleContainerStyle}>
              <Text style={styles.titleStyle}>
                vibe
              </Text>
              {/* <Text style={styles.subtitleStyle}>
                beta
              </Text> */}
              <Text style={styles.subtitleStyle}>
                Your mental health companion
              </Text>
            </View>

            <Card>
              <CardSection>
                <Input
                  placeholder="Email"
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                  keyboardType='email-address'
                />
              </CardSection>

              <CardSection>
                <Input
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
              </CardSection>

              {this.renderError()}

              {/* <TouchableOpacity onPress={() => Actions.password()}>
                <View style={{ marginTop: 20 }}>
                    <Text style={styles.textStyle}>
                      Forgot Password?
                    </Text>
                </View>
              </TouchableOpacity> */}

              <View style={styles.buttonContainerStyle}>
                {this.renderButton()}
              </View>
            </Card>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                onPress={() => Actions.signup()}
              >
                <Text style={styles.textStyle}>
                  Don't have an account? Sign up here!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView> 
      </TouchableWithoutFeedback>
    );
  }
}

/*Stylesheet constant for the login form design */
const styles = {
  errorTextStyle: {
    // fontSize: 16,
    fontSize: Dimensions.get('window').width * (16/375),
    fontFamily: 'apercu-font',
    color: 'white',
    textAlign: 'center'
  },
  itemContainerStyle: {
    backgroundColor: '#4AA7B3',
    marginTop: 5
  },
  containerStyle: {
    flex: 1,
    backgroundColor: '#4AA7B3',
    justifyContent: 'center'
  },
  titleStyle: {
    // fontSize: 90,
    fontSize: Dimensions.get('window').width * (90/375),
    fontFamily: 'knewave-font',
    color: 'white',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4
  },
  subtitleStyle: {
    fontFamily: 'apercu-bold',
    // fontSize: 16,
    fontSize: Dimensions.get('window').width * (18/375),
    color: 'white',
    textAlign: 'center',
  },
  titleContainerStyle: {
    marginBottom: 30,
    marginTop: 25
    // marginTop: 45
  },
  textStyle: {
    // fontSize: 16,
    fontSize: Dimensions.get('window').width * (16/375),
    fontFamily: 'apercu-bold',
    color: 'white',
    textAlign: 'center'
  },
  buttonContainerStyle: {
    backgroundColor: 'transparent',
    // backgroundColor: '#4AA7B3',
    // borderBottomWidth: 1,
    // borderColor: '#4AA7B3',
    borderRadius: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    marginTop: 14,
    padding: 15
  }
};

/*Function connecting this component with the reducers that handle the changing of the state */
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { 
  emailChanged, 
  passwordChanged,
  loginUser 
})(LoginForm);
