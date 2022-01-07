/* The component displayed to somebody when they want to comment for the first time. Highlighting what good support is */
import React, { Component } from 'react';
import { 
    View,
    Text, 
    Image,
    Dimensions
} from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { Button } from '../common';

class Support extends Component {
    /*Go into firebase and change the user property of "hasCommented" to true*/
    onButtonPress() {
        const { currentUser } = firebase.auth();

        firebase.database().ref(`locations/${this.props.school}/users/${currentUser.uid}/hasCommented`)
        .set(true)

        Actions.pop();
    }

    render () {
        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never' }}>
            <View style={styles.containerStyle}>
                <Image 
                    source={require('../../../assets/images/graphics/Intro4.png')}
                    style={{ position: 'absolute', width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                />
                <Text style={styles.bannerTitleStyle}>
                    Level Up Your{"\n"}Peer Support
                </Text>

                <Text style={styles.tips}>
                    1) Listen! Ask questions and affirm what the person is feeling. Engage knowing
                    people come from different perspectives.
                </Text>

                <Text style={styles.tips}>
                    2) Give empathy and speak from your own experience. What you share can really help someone out!
                </Text>

                <Text style={styles.tips}>
                    3) Direct peers to urgent/clinical resources in a potentially dangerous situation. Don't take on
                    the role of someone's therapist.
                </Text>

                <Text style={styles.tips}>
                    4) Don't be that person who causes harm to others. If you're thinking about it, remember
                    you are not fully anonymous through Vibe.
                </Text>

                <View style={styles.buttonContainerStyle}>
                        <Button onPress={this.onButtonPress.bind(this)}>
                            Got it!
                        </Button>
                </View>
            </View>
        </SafeAreaView>
        );
    }
}

/* Stylesheet for the support component */
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    bannerTitleStyle: {
        // fontSize: 24,
        fontSize: Dimensions.get('window').width * (24/375),
        fontFamily: 'apercu-bold',
        color: 'white',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        marginBottom: 20
    },
    tips: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 15
    },
    buttonContainerStyle: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 14,
        padding: 15
    }
};

export default Support;

