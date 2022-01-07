/* This component is to display the rules of the app on sign up */
import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../common';

class CommunityRuleOne extends Component {
    /*Go to the next page... */
    onButtonPress() {
        Actions.ruletwo();
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Image 
                    source={require('../../../assets/images/graphics/Intro2.png')}
                    style={{ position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                />
                <View style={styles.progressContainerStyle}>
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
                    <Image 
                        source={require('../../../assets/images/circle.png')}
                        style={{ height: 5, width: 5, marginRight: 5 }}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Dimensions.get('window').width * (5/375) }}>
                    <Text style={styles.messageTitleStyle}>
                        There's Power in Your Experiences
                    </Text>
                    <Text style={styles.messageTextStyle}>
                        Join groups to share advice, questions, stories, and more!
                    </Text>
                    <Image
                        source={require('../../../assets/images/ruleone_2.png')}
                        style={{ height: Dimensions.get('window').height * (250/812), width: Dimensions.get('window').width * (240/375) }} 
                    />
                    {/* <Text style={styles.messageTitleStyle}>
                        There's Power in Your Experiences
                    </Text>
                    <Text style={styles.messageTextStyle}>
                        Join groups to share advice, questions, stories, and more!
                    </Text> */}
                    {/* <Text style={styles.messageTextStyle}>
                        Engage with the understanding that
                        folks come from different 
                        perspectives. Join the community in order
                        to post.
                    </Text> */}
                </View>

                <View style={styles.buttonContainerStyle}>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Next
                    </Button>
                </View>

                <Text style={styles.disclaimer}>
                    Vibe is neither proven to nor intended to diagnose, treat, or 
                    cure any mental illness.
                </Text>

            </View>
        );
    }
}

const styles = {
    containerStyle: {
      flex: 1,
      backgroundColor: '#F09EA0'
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
    },
    disclaimer: {
        // fontSize: 12,
        fontSize: Dimensions.get('window').width * (12/375),
        fontFamily: 'apercu-font',
        color: 'white',
        // color: '#47525E',
        textAlign: 'center',
        marginBottom: 10,
        marginLeft: 25,
        marginRight: 25
    }
};

export default CommunityRuleOne;
