/* This component is the home page that users will see when they log into Vibe */
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback, 
    TouchableOpacity, 
    FlatList, 
    AsyncStorage,
    Dimensions 
} from 'react-native';
import firebase from 'firebase';
import { Permissions, Notifications, Amplitude } from 'expo';
import { Actions } from 'react-native-router-flux';

import Graphics from '../img/Graphics';

class HomePage extends Component {
    /* Intialize an empty array to hold the imported data containing the options shown on 
    the home page */
    state = { cards: [], school: '' };

    /* Add the data into the empty array when the home page renders to the screen */
    async componentDidMount() {
        const { currentUser } = firebase.auth();

        const value = await AsyncStorage.getItem('userId');
        if (value === null) {
            AsyncStorage.setItem('userId', `${currentUser.uid}`);
        }

        firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
                firebase.database().ref(`/users/${currentUser.uid}/school`)
                .once('value').then(snapshot => {
                    this.setState({
                        school: snapshot.val()
                    }, () => {
                        this.getYourCommunities()
                    })
                })
            } else {
                return null;
            }
        })
    }

    /* This function loads an array of the communities you have already joined to display them on the home page.
    We also log into Amplitude if this is an active session based on your school. Having this data will help us
    determine the amount of active people on Vibe broken down by school*/
    getYourCommunities() {
        firebase.auth().onAuthStateChanged((currentUser) => {
            if (currentUser) {
                firebase.database().ref(`/locations/${this.state.school}/users/${currentUser.uid}/communities`)
                .once('value').then(snapshot => {
                    const obj = Object.values(snapshot.val());
                    var yourCommunities = [];
                    for (key in obj) {
                        const item = obj[key].community;
                        if (`${item}` === 'POC + Wellness') {
                            yourCommunities.push({ title: item, imageTitle: 'POC' })
                        } else if (`${item}` === 'Animals + Nature') {
                            yourCommunities.push({ title: item, imageTitle: 'Outside' })
                        } else if (`${item}` === 'FLI + Wellness') {
                            yourCommunities.push({ title: item, imageTitle: 'FLI' })
                        } else if (`${item}` === 'LGBTQ + Wellness') {
                            yourCommunities.push({ title: item, imageTitle: 'LGBTQ' })
                        } else if (`${item}` === 'Eating + Wellness') {
                            yourCommunities.push({ title: item, imageTitle: 'Eating' })
                        } else {
                            yourCommunities.push({ title: item, imageTitle: item })
                        }
                    }
                    this.setState({ cards: yourCommunities });
                })
            }
        })

        const apiKey = '8453e5bfed94fced5e457a11aab4bb41';
        const school = `${this.state.school}`.toUpperCase();
        Amplitude.initialize(apiKey);
        Amplitude.logEvent(`${school}_SESSION`);
    }

    /* This function is called when one of the communities is pressed. It is important here to pass along
    which school the person is from in order to determine the posts to show. But I don't like calling firebase
    here and would say this should be changed in the near future */
    onButtonPress(item) {
        const { currentUser } = firebase.auth();

        const communityType = item.title.toString();
        const imageTitle = item.imageTitle.toString();

        firebase.database().ref(`/users/${currentUser.uid}/school`)
        .on('value', snapshot => {
            const school = snapshot.val();
            Actions.community({ communityType, imageTitle, school });
        });
    }

    registerForPushNotifications = async () => {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;
      
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
      
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
      
        // Get the token that uniquely identifies this device
        const token = await Notifications.getExpoPushTokenAsync();

        // Add token to firebase...
        const uid = firebase.auth().currentUser.uid;
        firebase.database().ref('users').child(uid).update({
            expoPushToken: token
        });
    }

    // getNotification() {
    //     const localNotification = {
    //         body: 'Hey you! Check out what your peers have been posting on Vibe!',
    //         ios: {
    //             sound: true
    //         },
    //         android: {
    //             sound: true,
    //             vibrate: true
    //         }
    //     };
    //     return localNotification;
    // }

    // setNotifications() {
    //     const schedulingOptions = {
    //         time: (new Date().getDay()),
    //         repeat: 'week'
    //     };
    //     Notifications.scheduleLocalNotificationAsync(this.getNotification(), schedulingOptions);
    // }

    /*This function displays the home page banner. Called within FlatList */
    renderHeader() {
        return (
            <View style={styles.bannerStyle}>
                    <Image 
                        source={require('../../assets/images/graphics/Home.png')}
                        style={styles.bannerImageStyle}
                    />
                <View style={styles.settingsImageContainer}>
                    <TouchableWithoutFeedback onPress={() => Actions.settings()}>
                        <Image
                            source={require('../../assets/images/settings_icon.png')}
                            style={styles.settingsImage}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.bannerTitleStyle}>
                    My Groups
                </Text>
            </View>
        );
    }

    /*The components are rendered onto the screen through a FlatList. The items of data
    are wrapped in a TouchableOpacity tag to make them buttons */
    render() {
        if (this.state.cards.length === 0) {
            return (
                <View style={styles.containerStyle}>
                    {this.renderHeader()}
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Image
                            source={require('../../assets/images/search.png')}
                            style={{ width: 100, height: 100 }} 
                        />
                        <Text style={{ fontFamily: 'apercu-font', fontSize: Dimensions.get('window').width * (16/375), textAlign: 'center', marginTop: 15, marginRight: 25, marginLeft: 25 }}>
                            Hey! Verify your email and then
                            click the middle icon below to find your groups!
                        </Text>
                    </View>
                </View>
            );
        }
        return (
                <View style={styles.containerStyle}>
                    <FlatList 
                        ListHeaderComponent={this.renderHeader()}
                        showsVerticalScrollIndicator={false}
                        data={this.state.cards}
                        renderItem={({ item }) =>
                            <View style={styles.cardContainerStyle}>
                                <View style={styles.cardStyle}>
                                    <TouchableOpacity onPress={this.onButtonPress.bind(this, item)}>
                                        <View>
                                            <Image 
                                                source={Graphics[item.imageTitle]}
                                                style={styles.imageStyle}
                                            />
                                        </View>
                                        <View style={styles.sectionStyle}>
                                        </View>
                                        <View style={styles.titleSectionStyle}>
                                            <Text style={styles.cardTitleStyle}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        initialNumToRender={4}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
        );
    }
}

/*Stylesheet for the homgepage */
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: 'white'
    },
    bannerStyle: {
        // height: 290,
        height: Dimensions.get('window').height * (290/812),
        backgroundColor: '#4AA7B3',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 20
    },
    bannerImageStyle: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * (290/812)
    },
    bannerTitleStyle: {
        // fontSize: 35,
        fontSize: Dimensions.get('window').width * (35/375),
        fontFamily: 'apercu-bold',
        color: 'white',
        textAlign: 'left',
        textShadowColor: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: Dimensions.get('window').height * (230/812),
        // paddingTop: 230,
        position: 'absolute'
    },
    cardContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardStyle: {
        backgroundColor: '#47525E',
        borderRadius: 10,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 20,
        marginBottom: 20,
        // height: 304,
        width: Dimensions.get('window').width * (320/375),
        height: Dimensions.get('window').width * (320/375) * (0.95)
        // width: 320
    },
    imageStyle: {
        // height: 304,
        width: Dimensions.get('window').width * (320/375),
        height: Dimensions.get('window').width * (320/375) * (0.95),
        // width: 320,
        position: 'absolute',
        borderRadius: 10
    },
    sectionStyle: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 10
    },
    titleSectionStyle: {
        // padding: 15,
        padding: Dimensions.get('window').width * (15/375),
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 10             
    },
    cardTitleStyle: {
        fontSize: Dimensions.get('window').width * (35/375),
        // fontSize: 35,
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.15)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
        paddingLeft: 0,
        marginTop: Dimensions.get('window').width * (320/375) * (0.95) * (225/304),
        // marginTop: 225,
        fontFamily: 'apercu-bold'
    },
    settingsImageContainer: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        marginTop: Dimensions.get('window').height * (45/812),
        // marginTop: 45, 
        marginRight: Dimensions.get('window').width * (15/375)
        // marginRight: 15
    },
    settingsImage: {
        width: Dimensions.get('window').width * (25/375),
        height: Dimensions.get('window').width * (25/375)
        // width: 25,
        // height: 25
    }
};

export default HomePage;
