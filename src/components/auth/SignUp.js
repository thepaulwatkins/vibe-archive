/* This component is the sign up page to create new accounts */
import React, { Component } from 'react';
import { 
    View, 
    Text,
    Image,
    TouchableWithoutFeedback, 
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Dimensions
 } from 'react-native';
import { Amplitude } from 'expo';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
    emailChanged, 
    passwordChanged, 
    nameChanged, 
    signupUser,
    sendVerification
} from '../../actions';
import { Card, Input, Button, Spinner } from '../common';

class SignUp extends Component {
    /* Event handler to receive the updated text email field */
    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    /* Event handler to receive the updated text password field */
    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    /* Event handler to receive the updated text name field */
    onNameChange(text) {
        this.props.nameChanged(text);
    }

    /* Event handler to signup a new person with the entered credentials. Here lies a very important
    piece of code that **needs** to be changed because as it currently exists it isn't scalable. Here 
    it is determined what school the person goes to and therefore what posts they'll be able to see.
    The signupUser action takes the person to the welcome page */

    /*Coding fast. No longer seperarting by campus. I left the school name as "Stanford" for MIT and UMich just to show that anybody from these schools
    will see posts on the Stanford campus as well. So in this case Stanford is the base school for all the others */
    onButtonPress() {
        const { email, password, name } = this.props;
        const hasCommented = false;
        const apiKey = '8453e5bfed94fced5e457a11aab4bb41';

        const domain = `${this.props.email}`.replace(/.*@/, '');
        if (domain === 'stanford.edu') {
            Amplitude.initialize(apiKey);
            Amplitude.logEvent('NEW_SIGN_UP');
            Amplitude.logEvent('NEW_SIGN_UP_STANFORD');
            const school = 'Stanford';
            this.props.signupUser({ school, email, password, name, hasCommented });
        }
        if (domain === 'mit.edu') {
            Amplitude.initialize(apiKey);
            Amplitude.logEvent('NEW_SIGN_UP');
            Amplitude.logEvent('NEW_SIGN_UP_MIT');
            const school = 'Stanford';
            this.props.signupUser({ school, email, password, name, hasCommented });
        }
        if (domain === 'umich.edu') {
            Amplitude.initialize(apiKey);
            Amplitude.logEvent('NEW_SIGN_UP');
            Amplitude.logEvent('NEW_SIGN_UP_UMICH');
            const school = 'Stanford';
            this.props.signupUser({ school, email, password, name, hasCommented });
        }
        // if (domain === 'menlo.edu') {
        //     Amplitude.initialize(apiKey);
        //     Amplitude.logEvent('NEW_SIGN_UP');
        //     Amplitude.logEvent('NEW_SIGN_UP_MENLO');
        //     const school = 'Menlo College';
        //     this.props.signupUser({ school, email, password, name, hasCommented });
        // }
        if (domain === 'sjsu.edu') {
            Amplitude.initialize(apiKey);
            // Amplitude.logEvent('NEW_SIGN_UP');
            Amplitude.logEvent('NEW_SIGN_UP_SJSU');
            const school = 'SJSU';
            this.props.signupUser({ school, email, password, name, hasCommented });
        }
    }

    /* This function serves as a very rough, surface level form of validation. If the entered email
    does not contain a '.edu' ending then an 'X' will appear at the end of the text input signifying
    that user has entered a valid email appropriate for Vibe. If their email does contain '.edu' then
    a 'checkmark' will appear showing that their input is acceptable */
    emailApproved() {
        const string = this.props.email;
        const substring = '.edu';

        if (string.includes(substring)) {
            return (
                <Image
                    source={require('../../../assets/images/valid.png')}
                    style={{ width: 25, height: 20 }} 
                />
            );
        }

        return (
            <Image
                source={require('../../../assets/images/invalid.png')}
                style={{ width: 20, height: 20 }} 
            />
        );
    }

    /* Similar to the function directly above, this is a rough form of validation that will need to
    be changed later on. An 'X' is shown for an invalid password while a 'checkmark' is shown for an
    acceptable value */
    passwordApproved() {
        const password = this.props.password;

        if (password.length > 7) {
            return (
                <Image
                    source={require('../../../assets/images/valid.png')}
                    style={{ width: 25, height: 20 }} 
                />
            );
        }

        return (
            <Image
                source={require('../../../assets/images/invalid.png')}                    
                style={{ width: 20, height: 20 }} 
            />
        );
    }

    /* Lol look at the two comments above */
    nameApproved() {
        const name = this.props.name;
        if (/^[a-zA-Z]+/.test(name) && name.length > 1) {
            return (
                <Image
                    source={require('../../../assets/images/valid.png')}
                    style={{ width: 25, height: 20 }} 
                />
            );
        }

        return (
            <Image
                source={require('../../../assets/images/invalid.png')}                    
                style={{ width: 20, height: 20 }} 
            />
        );
    }

    /* The 'next' button only renders once the user fills in the information correctly */
    renderButton() {
        const string = this.props.email;
        const substring = '.edu';

        if (this.props.loading) {
            return <Spinner size="large" />;
        }
        //hard coded text input validation...needs to be improved
        if (string.includes(substring) 
            && this.props.password.length > 7 &&
            this.props.name.length > 1 &&
            /^[a-zA-Z]+/.test(this.props.name)) {
                return (
                    <View style={styles.buttonContainerStyle}>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Sign Up
                        </Button>
                    </View>
                );
        }

        return (
            <View style={styles.itemContainerStyle}>
                <Text style={styles.errorTextStyle}>
                    You may discuss sensitive topics. Make sure your username aligns with your desired level of anonymity.
                </Text>

                <TouchableWithoutFeedback onPress={() => Actions.agree()}>
                    <View style={styles.policy}>
                        <Text style={styles.policyText}>
                            By signing up, you agree to our ToS and Privacy Policy.
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
    /* All of the components here are wrapped inside a ToucheablwWithoutFeedback component
    so the user can touch anywhere on the screen and dismiss the keyboard, providing a better user experience. The
    Keyboard Avoiding View is important so the keyboard does not cover the text inputs **although I'm still having this
    problem on slightly older phones like the iPhone 6. Within the render method lies the title of the page, the
    email, password, and name fields, the sign up button/spinner, and a button to go and read the policies */
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView 
                    style={styles.containerStyle}
                    behavior={(Platform.OS === 'ios') ? 'padding' : null}
                    // keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })} 
                    enabled
                >
                    <View style={styles.containerStyle}>
                        <View style={{ position: 'absolute' }}>
                            <Image 
                                source={require('../../../assets/images/graphics/Intro6.png')}
                                style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
                            />
                        </View>
                        <View style={styles.titleContainerStyle}>
                            <Text style={styles.titleStyle}>
                                Sign Up
                            </Text>
                        </View>

                        <Card>
                            <View style={styles.inputContainerStyle}>
                                    <Input 
                                        placeholder="Email--must be .edu"
                                        onChangeText={this.onEmailChange.bind(this)}
                                        value={this.props.email}
                                        keyboardType='email-address'
                                    />
                                    {this.emailApproved()}
                            </View>
                        </Card>

                        <Card>
                            <View style={styles.inputContainerStyle}>
                                    <Input 
                                        secureTextEntry
                                        placeholder="Password--at least 8 characters"
                                        onChangeText={this.onPasswordChange.bind(this)}
                                        value={this.props.password}
                                    />
                                    {this.passwordApproved()}
                            </View>
                        </Card>

                        <Card>
                            <View style={styles.inputContainerStyle}>
                                    <Input 
                                        placeholder="Username--e.g., mlopez4, biscuit15"
                                        onChangeText={this.onNameChange.bind(this)}
                                        value={this.props.name}
                                        maxLength={30}
                                        // auto
                                    />
                                    {this.nameApproved()}
                            </View>
                        </Card>

                        {this.renderButton()}

                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        );
    }
}

/* Stylesheet for the signup form design */
const styles = {
    containerStyle: {
      flex: 1,
      backgroundColor: '#6AB3BC'
    //   backgroundColor: '#4AA7B3',
    },
    titleContainerStyle: {
        paddingTop: 20,
        marginBottom: 20
        // marginBottom: 40
    },
    titleStyle: {
        // fontSize: 45,
        fontSize: Dimensions.get('window').width * (45/375),
        fontFamily: 'apercu-bold',
        color: 'white',
        textAlign: 'left',
        paddingLeft: 20,
    },
    inputContainerStyle: {
        backgroundColor: '#F4F7F8',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#47525E',
        borderRadius: 10,
        position: 'relative',
        marginBottom: 25,
        padding: 15,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    itemContainerStyle: {
        backgroundColor: 'transparent'
        // backgroundColor: '#4AA7B3',
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
    },
    errorTextStyle: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    policy: {
        backgroundColor: 'transparent',
        // backgroundColor: '#4AA7B3',
        marginTop: 40
    },
    policyText: {
        fontFamily: 'apercu-bold',
        fontSize: Dimensions.get('window').width * (16/375),
        // fontSize: 16,
        color: 'white',
        textAlign: 'center'
    }
};

const mapStateToProps = state => {
    return {
        email: state.auth.email,
        password: state.auth.password,
        name: state.auth.name,
        loading: state.auth.loading
        //error: state.auth.error
    };
};

export default connect(mapStateToProps, { 
    emailChanged, 
    passwordChanged, 
    nameChanged,
    signupUser,
    sendVerification
})(SignUp);
