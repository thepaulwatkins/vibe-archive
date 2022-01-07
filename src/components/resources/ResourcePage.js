/*This components provides the list of mental health resources available on the app */
import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { phonecall, text } from 'react-native-communications';
import { showResourcePrompt, declineResourcePrompt, getResources } from '../../actions/ResourceActions';

import Graphics from '../../img/Graphics';
import AddResource from './AddResource';
import Resource from './Resource';

import mainResources from '../../files/mainResources.json';

class ResourcePage extends Component {
    /*Intialize an empty array to hold the imported data containing the options shown on the 
    resource page */
   state = { 
       resources: [],
       school: '',
       currentUser: '',
       userName: ''
     };

    /* Add the data into the empty array when the resource page renders to the screen */
    componentDidMount() {
        this.setState({ resources: mainResources });

        const { currentUser } = firebase.auth();
        this.setState({ currentUser: currentUser.uid });

        firebase.database().ref(`/users/${currentUser.uid}/school`)
        .on('value', snapshot => {
            this.setState({
                school: snapshot.val()
            }, () => {
                this.props.getResources({ school: this.state.school });
            })
        });

        firebase.database().ref(`/users/${currentUser.uid}/name`)
        .on('value', snapshot => {
            this.setState({
                userName: snapshot.val()
            });
        });
    }

    /*For the bar under the header, determine the actions if someone presses on the following resoures: The
    Suicide or Sexual Hotline (pop out into their phone), the Crisis Text Line (pop out into their messages),
    or add a community resources (show the AddResource component)*/
    onItemPress(item) {
        switch (item.type) {
            case 'Phone':
                return (
                    phonecall(`${item.number}`, true)
                );
            case 'Text':
                return (
                    text(`${item.number}`, 'HOME')
                );
            case 'Custom':
                return (
                    this.props.showResourcePrompt()
                );
            default:
                return (
                    null
                );
        }
    }

    /*At this point the AddResource component is showing up on the screen. This is called if they exit the prompt, the modal
    goes away*/
    onDecline() {
        this.props.declineResourcePrompt();
    }

    /* The header component called within the FlatList */
    renderHeader() {
        return (
            <View>
                <View style={styles.bannerStyle}>
                <Image 
                        source={require('../../../assets/images/graphics/Resources.png')}
                        style={styles.bannerImageStyle}
                />
                    <Text style={styles.bannerTitleStyle}>
                        Resources
                    </Text>
                </View>

                {/* <View style={styles.messageContainerStyle}>
                    <Text style={styles.messageStyle}>
                        Find and discuss wellness resources near you or upload your own!
                    </Text>
                </View> */}
            </View>
        );
    }

    /* FlatList to render the resources to the screen. Process the data/item in another component specifically
    for the resource. This is so this will be easier to manage if we want to make changes to the look of the
    resources */
    render() {
        return (
            <ScrollView style={styles.containerStyle} showsVerticalScrollIndicator={false}>
                {this.renderHeader()}
                <View>
                    <Image
                        source={require('../../../assets/images/right-arrow.png')}
                        style={{ position: 'absolute', right: 5, top: 45, height: 15, width: 15 }} 
                    />
                    <FlatList 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.resources}
                        renderItem={({ item }) =>
                            <TouchableOpacity onPress={this.onItemPress.bind(this, item)}>
                                <View style={styles.itemContainerStyle}>
                                    <View style={styles.itemStyle}>
                                            <Image
                                            source={Graphics[item.imageTitle]}
                                            style={styles.itemImage} 
                                            />
                                    </View>
                                    <View style={styles.mainResourceStyle}>
                                        <Text style={styles.mainResourceFont}>{item.title}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                        initialNumToRender={4}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                <View style={styles.lineStyle} />

                <View style={{ marginTop: 15, marginBottom: 5 }}>
                    <Text style={styles.categoryText}>
                        Recommendations
                    </Text>
                </View>

                <FlatList
                    style={{ flex: 1 }}
                    data={this.props.resourceList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) =>
                        <Resource 
                            item={item}
                            school={this.state.school}
                            currentUser={this.state.currentUser}
                        />
                    }
                    initialNumToRender={4}
                    keyExtractor={(item, index) => index.toString()} 
                />

                <AddResource 
                    visible={this.props.showResourceModal}
                    onDecline={this.onDecline.bind(this)}
                    school={this.state.school}
                    currentUser={this.state.currentUser}
                    userName={this.state.userName}
                />
            </ScrollView>

        );
    }
}

/* Stylesheet for the resource page */
const styles = {
    containerStyle: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F3F3F3'
    },
    bannerStyle: {
        backgroundColor: '#4AA7B3',
        // height: 290,
        height: Dimensions.get('window').height * (290/812),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2
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
        marginBottom: 10
    },
    messageStyle: {
        fontSize: 18,
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 5
    },
    itemContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    },
    itemStyle: {
        backgroundColor: 'transparent',
        borderRadius: 100/2,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        height: Dimensions.get('window').width * (70/375),
        width: Dimensions.get('window').width * (70/375)
        // height: 70,
        // width: 70
    },
    itemImage: {
        height: Dimensions.get('window').width * (115/375),
        width: Dimensions.get('window').width * (115/375),
        // width: 115,
        // height: 115,
        borderRadius: 100/2
    },
    mainResourceStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').width * (13/375),
        width: Dimensions.get('window').width * (105/375)
        // width: 105,
        // height: 13
    },
    mainResourceFont: {
        fontFamily: 'apercu-font',
        fontSize: Dimensions.get('window').width * (10/375)
        // fontSize: 10
    },
    categoryText: {
        marginLeft: 15,
        fontFamily: 'apercu-font',
        fontSize: Dimensions.get('window').width * (16/375),
        // fontSize: 16,
        color: '#47525E'
    },
    lineStyle: {
        marginTop: 15,
        borderBottomColor: '#B6BFC8',
        borderBottomWidth: 1
    }
};

/* This function helps connect this component to the application state held in the resourceReducer */
const mapStateToProps = (state) => {
    const { showResourceModal } = state.resourceAdd;

    const resourceList = _.map(state.resourceList, (val, uid) => {
        return { ...val, uid };
    });

    return { showResourceModal, resourceList: resourceList.reverse() };
};

export default connect(mapStateToProps, { 
    showResourcePrompt, 
    declineResourcePrompt,
    getResources 
})(ResourcePage);

