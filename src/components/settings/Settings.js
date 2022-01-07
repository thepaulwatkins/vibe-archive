/* This is the main component for the settings page of Vibe */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, AsyncStorage, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { SafeAreaView } from 'react-navigation';
import { text } from 'react-native-communications';
import { logoutUser } from '../../actions';
import { Spinner, Confirm } from '../common';
import settingsList from '../../files/settingsList.json';

class Settings extends Component {
    /* Intialize an empty array to hold the imported data containing the options shown 
    on the home page */
    state = { 
        categories: [],
        showModal: false
     };

    /* Add the data into the empty array when the home page renders to the screen */
    componentDidMount() {
        this.setState({ categories: settingsList });
    }

    /* If the person clicks the Log Out button, prompt them and ask if they're sure they want to
    log out */
    onLogoutButtonPress() {
        this.setState({
            showModal: true
        });
    }

    /* If they actually do want to log out, do three things. Make the modal disappear, remove the userId
    token from async storage so they'll have to log in next time, and then log them out in firebase */
    onAccept() {
        this.setState({
            showModal: false
        });
        AsyncStorage.removeItem('userId');
        this.props.logoutUser();
    }

    /* If they don't wish to log out, then just make the modal disappear */
    onDecline() {
        this.setState({
            showModal: false
        });
    }

    /* Depending on which item they press, direct them to that page. This page is currently only for policies
    right now, but will expand to cover other options in time */
    onSettingsItemPress(item) {
        if (`${item.title}`.includes('Feedback') || `${item.title}`.includes('Groups')) {
            return (
                text('9292564814')
            );
        }
        if (`${item.title}`.includes('Verification')) {
            firebase.auth().currentUser.sendEmailVerification();
        }
        if (`${item.title}`.includes('Mission')) {
            return (
                Actions.mission()
            );
        }

        const policy = item;
        Actions.policy({ policy });
    }

    /* If the log out button was pressed, show a spinner to let the person know that the app is processing
    their request */
    renderLogoutButton() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }
      
        return (
            <TouchableOpacity onPress={this.onLogoutButtonPress.bind(this)}>
                <View style={styles.logout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never' }}>
                <View style={styles.containerStyle}>
                    <FlatList 
                        data={this.state.categories}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={this.onSettingsItemPress.bind(this, item)}>
                                <View style={styles.itemStyle}>
                                    <Text style={styles.titleStyle}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                    }
                    keyExtractor={(item, index) => index.toString()}
                    />
                    {this.renderLogoutButton()}
                    <Confirm
                        visible={this.state.showModal}
                        onAccept={this.onAccept.bind(this)}
                        onDecline={this.onDecline.bind(this)}
                    >
                        Are you sure you want to log out?
                    </Confirm>
                </View>
            </SafeAreaView>
        );
    }
}

/* Stylesheet for the settings page */
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    itemStyle: {
        // paddingTop: 40,
        // paddingBottom: 40,
        paddingTop: Dimensions.get('window').width * (40/375),
        paddingBottom: Dimensions.get('window').width * (40/375),
        borderBottomWidth: 1,
        borderBottomColor: '#B6BFC8',
        backgroundColor: 'white'
    },
    logout: {
        // padding: 15,
        padding: Dimensions.get('window').width * (15/375),
        backgroundColor: '#4AA7B3',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        // marginTop: 14,
        bottom: 0
    },
    titleStyle: {
        // fontSize: 20,
        fontSize: Dimensions.get('window').width * (20/375),
        fontFamily: 'apercu-font',
        color: '#000000',
        // color: '#47525E',
        marginLeft: 20
    },
    logoutText: {
        // fontSize: 20,
        fontSize: Dimensions.get('window').width * (20/375),
        color: 'white',
        textAlign: 'center',
        fontFamily: 'apercu-font'
    }
};

const mapStateToProps = state => {
    return {
      loading: state.sett.loading
    };
  };

export default connect(mapStateToProps, { logoutUser })(Settings);
