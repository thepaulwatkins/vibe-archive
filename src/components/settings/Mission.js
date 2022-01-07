/* This component's purpose to give a little information about Vibe and Ayce labs*/
import React, { Component } from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { web } from 'react-native-communications';

class Mission extends Component {
    render() {
        return (
            <ScrollView style={styles.containerStyle}>

                <View style={styles.imageContainer}>
                    <Image 
                        source={require('../../../assets/images/vibe_mission.png')}
                        style={styles.image}
                    />
                </View>

                <Text style={styles.missionDescription}>
                    Hey! Vibe is developed by Ayce Labs, Inc: a startup focused on providing more accessible mental health
                    support. When support is too expensive, too stigmatized, or too inaccessible, we aim to fill that
                    gap in care.
                </Text>

                <Text style={styles.missionDescription}>
                    Mental health care and communication needs to be a seamless part of our culture. Vibe is a major
                    step to get there. If you want to join us on this journey, check out our website and 
                    social media pages to stay informed :)
                </Text>

                <TouchableOpacity onPress={() => web('https://www.aycelabs.com')}>
                    <Text style={styles.website}>
                        Click here to check out our site
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        );
    }
}

/* Stylesheet for the mission component */
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10
    },
    title: {
        fontFamily: 'apercu-bold',
        // fontSize: 20,
        fontSize: Dimensions.get('window').width * (20/375),
        color: '#000000',
        textAlign: 'center',
        paddingBottom: 10
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        // width: 250,
        // height: 250
        width: Dimensions.get('window').width * (250/375),
        height: Dimensions.get('window').width * (250/375)
    },
    missionDescription: {
        fontFamily: 'apercu-font',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        textAlign: 'center',
        marginTop: 5,
        color: '#000000',
        paddingBottom: 10
    },
    website: {
        fontFamily: 'apercu-bold',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        textAlign: 'center',
        marginTop: 5,
        color: '#4AA7B3',
        paddingBottom: 10
    }
};

export default Mission;
