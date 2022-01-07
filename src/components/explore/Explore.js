/*This components provides the list of peer support groups */
import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
import { LinearGradient } from 'expo';
import { Actions } from 'react-native-router-flux';

import Graphics from '../../img/Graphics';

import defaultResources from '../../files/defaultResources.json';
import communitiesExperiences from '../../files/communitiesExperiences.json';
import communitiesInterests from '../../files/communitiesInterests.json';
import communitiesIdentities from '../../files/communitiesIdentities.json';

class Explore extends Component {
    /*Intialize an empty array to hold the imported data containing the options shown on the 
    page */
   state = {
       resources: [], 
       experiences: [],
       interests: [],
       identities: [] 
    };

    /* Add the data into the empty array when the resource page renders to the screen */
    componentWillMount() {
        this.setState({ 
            resources: defaultResources,
            experiences: communitiesExperiences,
            interests: communitiesInterests,
            identities: communitiesIdentities
         });
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

    /* The header component called within the FlatList */
    renderHeader() {
        return (
            <View>
                <View style={styles.bannerStyle}>
                    <Image 
                        source={require('../../../assets/images/graphics/Explore.png')}
                        style={styles.bannerImageStyle}
                    />
                    <Text style={styles.bannerTitleStyle}>
                        Explore
                    </Text>
                </View>
            </View>
        );
    }

    /* FlatList to render the groups to the screen. A gradient is added to the images here to make the text
    easier to read. These FlatLists are horizontal and are separated into categories. For this reason, this
    component is wrapped in a ScrollView instead of a regular View*/
    render() {
        return (
            <ScrollView style={styles.containerStyle} showsVerticalScrollIndicator={false}>
                {this.renderHeader()}

                    <Text style={styles.categoryText}>EXPERIENCES</Text>
                    
                    <FlatList 
                        data={this.state.experiences}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
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
                                            <LinearGradient
                                                colors={['rgba(0,0,0,0.1)', 'transparent']}
                                                style={{ position: 'absolute', width: 320, height: 150, borderRadius: 10 }}
                                            />
                                            <Text style={styles.descriptionTextStyle}>{item.script}</Text>
                                        </View>
                                        <View style={styles.titleSectionStyle}>
                                            <Text style={styles.cardTitleStyle}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <Text style={styles.categoryText}>IDENTITIES</Text>

                    <FlatList 
                        data={this.state.identities}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
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
                                            <LinearGradient
                                                colors={['rgba(0,0,0,0.1)', 'transparent']}
                                                style={{ position: 'absolute', width: 320, height: 150, borderRadius: 10 }}
                                            />
                                            <Text style={styles.descriptionTextStyle}>{item.script}</Text>
                                        </View>
                                        <View style={styles.titleSectionStyle}>
                                            <Text style={styles.cardTitleStyle}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <Text style={styles.categoryText}>INTERESTS</Text>

                    <FlatList 
                        data={this.state.interests}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
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
                                            <LinearGradient
                                                colors={['rgba(0,0,0,0.1)', 'transparent']}
                                                style={{ position: 'absolute', width: 320, height: 150, borderRadius: 10 }}
                                            />
                                            <Text style={styles.descriptionTextStyle}>{item.script}</Text>
                                        </View>
                                        <View style={styles.titleSectionStyle}>
                                            <Text style={styles.cardTitleStyle}>{item.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        initialNumToRender={2}
                        keyExtractor={(item, index) => index.toString()}
                    />
            </ScrollView>
        );
    }
}

/* Stylesheet for the explore page */
const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    bannerStyle: {
        backgroundColor: '#47525E',
        // height: 290,
        height: Dimensions.get('window').height * (290/812),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 30
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
        // paddingTop: 230
    },
    messageContainerStyle: {
        backgroundColor: '#47525E',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    messageStyle: {
        fontSize: 18,
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    cardContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
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
        marginTop: 10,
        marginBottom: 30,
        width: Dimensions.get('window').width * (320/375),
        height: Dimensions.get('window').width * (320/375) * (0.95)
        // height: 304,
        // width: 320
    },
    imageStyle: {
        // height: 304,
        // width: 320,
        width: Dimensions.get('window').width * (320/375),
        height: Dimensions.get('window').width * (320/375) * (0.95),
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
        // marginBottom: 15,
        marginBottom: Dimensions.get('window').width * (15/375),
        fontFamily: 'apercu-bold'
    },
    descriptionTextStyle: {
        color: 'white',
        fontSize: Dimensions.get('window').width * (16/375),
        // fontSize: 16,
        fontFamily: 'apercu-font',
        // paddingTop: 15,
        paddingTop: Dimensions.get('window').width * (15/375),
        paddingLeft: 15,
        paddingRight: 15,
        // paddingBottom: 150,
        paddingBottom: Dimensions.get('window').width * (150/375),
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 0.5 },
        textShadowRadius: 3
    },
    categoryText: {
        marginLeft: 15,
        fontFamily: 'apercu-font',
        fontSize: Dimensions.get('window').width * (16/375),
        // fontSize: 16,
        color: '#AAACAD'
    }
};

export default Explore;
