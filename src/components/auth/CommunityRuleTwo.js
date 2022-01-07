/* This component is to display the rules of the app on sign up */
import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../common';

class CommunityRuleTwo extends Component {
    /* Next page... */
    onButtonPress() {
        Actions.rulethree();
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Image 
                    source={require('../../../assets/images/graphics/Intro4.png')}
                    style={{ position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                />
                <View style={styles.progressContainerStyle}>
                    <Image 
                        source={require('../../../assets/images/circle.png')}
                        style={{ height: 5, width: 5, marginRight: 5 }}
                    />
                    <Image 
                        source={require('../../../assets/images/circle.png')}
                        style={{ height: 5, width: 5, marginRight: 5 }}
                    />
                    <Image 
                        source={require('../../../assets/images/circle.png')}
                        style={{ height: 10, width: 10, marginRight: 5 }}
                    />
                    <Image 
                        source={require('../../../assets/images/circle.png')}
                        style={{ height: 5, width: 5, marginRight: 5 }}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                    <Text style={styles.messageTitleStyle}>
                        Be a Decent Human
                    </Text>
                    <Text style={styles.messageTextStyle}>
                        Being hateful or 
                        inappropriate will result in deletion. 
                        Click on the dots to flag posts.
                    </Text>
                    <Image
                        source={require('../../../assets/images/ruletwo_2.png')}
                        style={{ height: Dimensions.get('window').height * (275/812), width: Dimensions.get('window').width * (375/375), borderRadius: 5 }} 
                    />
                    {/* <Text style={styles.messageTitleStyle}>
                        Be a Decent Human
                    </Text> */}
                    {/* <Text style={styles.messageTextStyle}>
                        Being hateful or 
                        inappropriate will result in deletion. 
                        Click on the dots to flag posts.
                    </Text> */}
                </View>

                <View style={styles.buttonContainerStyle}>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Next
                    </Button>
                </View>

                <Text style={styles.disclaimer}>
                    Vibe is not intended to replace group therapy. We encourage you to access a 
                    licensed therapist/clinician whenever possible.
                </Text>

            </View>
        );
    }
}

const styles = {
    containerStyle: {
      flex: 1,
      backgroundColor: '#DAB4D9'
    //   backgroundColor: 'white'
    },
    progressContainerStyle: {
        paddingTop: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainerStyle: {
        // borderBottomWidth: 1,
        padding: 15,
        // backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        // borderColor: 'white',
        position: 'relative',
        marginTop: 7,
        marginBottom: 30,
        borderRadius: 10
    },
    messageTitleStyle: {
        // fontSize: 18,
        fontSize: Dimensions.get('window').width * (18/375),
        fontFamily: 'apercu-bold',
        color: 'white',
        textAlign: 'center',
        paddingTop: 20,
        marginLeft: 15,
        marginRight: 15
    },
    messageTextStyle: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-font',
        color: 'white',
        // color: '#47525E',
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 2
    },
    disclaimer: {
        // fontSize: 12,
        fontSize: Dimensions.get('window').width * (12/375),
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25
    }
};

export default CommunityRuleTwo;
