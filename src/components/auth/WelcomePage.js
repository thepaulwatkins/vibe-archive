/* This component serves to be the welcome page. The first page the user sees after they sign up */
import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from '../common';

class WelcomePage extends Component {
    /*Go to the next page... */
    onButtonPress() {
        Actions.ruleone();
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <Image 
                    source={require('../../../assets/images/graphics/Intro1.png')}
                    style={{ position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                />
                <View style={styles.progressContainerStyle}>
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
                    <Image 
                        source={require('../../../assets/images/circle.png')}
                        style={{ height: 5, width: 5, marginRight: 5 }}
                    />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Dimensions.get('window').width * (20/375) }}>
                    <Text style={styles.textStyle}>
                        Welcome to Vibe, {this.props.userName}!
                    </Text>
                    <Text style={styles.textDarkStyle}>
                        Find support when you need it from other college students who get it!
                    </Text>
                    <Image
                        source={require('../../../assets/images/vibe_transparent.png')}
                        style={{ height: Dimensions.get('window').width * (150/375), width: Dimensions.get('window').width * (150/375), marginTop: 5 }} 
                    />
                    <Text style={styles.textBottomStyle}>
                        Know that any trolling or hateful actions will get you tossed out of here. 
                    </Text>
                </View>

                <View style={styles.buttonContainerStyle}>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Next
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#6AB3BC'
        // backgroundColor: 'white'
      },
      progressContainerStyle: {
          paddingTop: 5,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
      },
      textDarkStyle: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-bold',
        // color: '#47525E',
        color: 'white',
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5,
        marginTop: 5
      },
      textBottomStyle: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-bold',
        color: 'white',
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 5
      },
      textStyle: {
        // fontSize: 18,
        fontSize: Dimensions.get('window').width * (18/375),
        fontFamily: 'apercu-bold',
        color: 'white',
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 5,
        // paddingBottom: 5
      },
      buttonContainerStyle: {
        //   borderBottomWidth: 1,
          padding: 15,
        //   backgroundColor: 'white',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        //   borderColor: 'white',
          position: 'relative',
          marginTop: 14,
          marginBottom: Dimensions.get('window').width * (50/375),
        //   marginBottom: 50,
          borderRadius: 10
      }
};

export default WelcomePage;
