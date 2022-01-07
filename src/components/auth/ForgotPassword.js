import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ForgotPassword extends Component {
    render() {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.titleContainerStyle}>
                    <Text style={styles.titleStyle}>Forgot Password</Text>
                </View>
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#4AA7B3'
    },
    titleContainerStyle: {
        paddingTop: 30
    },
    titleStyle: {
        fontSize: 35,
        color: 'white',
        textAlign: 'left',
        paddingLeft: 20,
        fontFamily: 'apercu-bold'
    }
};

export default ForgotPassword;
