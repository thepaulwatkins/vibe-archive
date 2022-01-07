/*This component will render all of the posts made in the respective community */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    View, 
    Text,
    Image,
    TouchableWithoutFeedback, 
    FlatList,
    Dimensions
} from 'react-native';
import firebase from 'firebase';
// import Expo from 'expo';
import { Actions } from 'react-native-router-flux';
import { getPosts } from '../../actions/PostActions';
import Post from './Post';
import Graphics from '../../img/Graphics';

class PostList extends Component {
    /* State variable for the message displayed under the community photo */
    state = {
        headerMessage: '',
        memberCount: ''
    }

    /*The getPosts function will access all of the posts stored in firebase to display when the component renders.
    Also under this function is where the headerMessage is determined based on the community */
    componentDidMount() {
        const community = `${this.props.communityType}`;
        const school = `${this.props.school}`;
        this.props.getPosts({ community, school });

        firebase.database().ref(`/locations/${this.props.school}/members/${community}`)
        .on('value', snapshot => {
            this.setState({
                memberCount: snapshot.numChildren()
            })
        });

        switch (community) {
            case 'Academics':
                return (
                    this.setState({
                        headerMessage: 'The academic struggle bus isn\'t something you should ride solo.'
                    })
                );
            case 'POC + Wellness':
                return (
                    this.setState({
                        headerMessage: 'For the support and wellness of people of color.'
                    })
                );
            case 'Creativity':
                return (
                    this.setState({
                        headerMessage: 'Art is a reflection of the mind. This is your space to share, create, and collaborate.'
                    })
                );
            case 'Depression':
                return (
                    this.setState({
                        headerMessage: 'Ask questions and share stories on our feelings, sadness, and depression.'
                    })
                );
            case 'Gratitude':
                return (
                    this.setState({
                        headerMessage: 'Did you know expressing gratitude helps to reduce stress?'
                    })
                );
            case 'Anxiety':
                return (
                    this.setState({
                        headerMessage: 'What does anxiety look and feel like to you? Create and find your support here.'
                    })
                );
            case 'FLI + Wellness':
                return (
                    this.setState({
                        headerMessage: 'For the support and wellness of the first-gen/low-income community.'
                    })
                );
            case 'Animals + Nature':
                return (
                    this.setState({
                        headerMessage: 'Know any nice places for a hike? Have some pics of nature or animals to share?'
                    })
                );
            case 'LGBTQ + Wellness':
                return (
                    this.setState({
                        headerMessage: 'For the support and wellness of the LGBTQ+ community.'
                    })
                );
            case 'Relationships':
                return (
                    this.setState({
                        headerMessage: 'A spot to share - and vent - about the people and places in your life.'
                    })
                );
            case 'Grief':
                return (
                    this.setState({
                        headerMessage: 'Ask for advice, share stories of loved ones. Take time to heal.'
                    })
                );
            case 'Eating + Wellness':
                return (
                    this.setState({
                        headerMessage: 'For the discussion of eating habits, body image, and self-esteem.'
                    })
                );
            default:
                return (
                    null
                );
        }
    }

    /* Once clicked, direct the user to page of resources */
//    onHelpClick() {
//     const apiKey = '8453e5bfed94fced5e457a11aab4bb41';
//     Expo.Amplitude.initialize(apiKey);
//     Expo.Amplitude.logEvent('RESOURCES_PAGE_CLICKED');

//     Actions.resources();
//    }

    /* This function displays the banner. Called within FlatList */
    renderHeader() {
        return (
            <View>
                <View style={styles.bannerStyle}>
                    <Image 
                        source={Graphics[this.props.imageTitle]}
                        style={styles.graphicStyle}
                    />
                    <Text style={styles.bannerTitleStyle}>
                        {this.props.communityType}
                    </Text>
                    <Text style={styles.memberCountStyle}>
                        {this.state.memberCount} members
                    </Text>
                    {/* <TouchableWithoutFeedback onPress={this.onHelpClick.bind(this)}>
                        <View style={styles.helpContainer}>
                            <Image
                                source={require('../../../assets/images/waving-hand.png')}
                                style={styles.help}
                            />
                        </View>
                    </TouchableWithoutFeedback> */}
                </View>

                <View style={styles.messageContainerStyle}>
                    <Text style={styles.messageStyle}>
                        {this.state.headerMessage}
                    </Text>
                </View>
            </View>
        );
    }

    /* Rendering the list of respective posts to the screen. Each individual post is rendered in a separate
    component titled Post. This should help if the list of posts grows to be very large */
    render() {
        return (
            <FlatList
            style={{ flex: 1 }}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={this.renderHeader()}
            data={this.props.postList}
            renderItem={({ item }) =>
                <Post 
                    item={item} 
                    joined={this.props.joined} 
                    communityType={this.props.communityType}
                    currentUserId={this.props.currentUserId}
                    school={this.props.school} 
                    postDate={this.props.postDate}
                />
            }
            initialNumToRender={4}
            keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

/*Stylesheet for the header */
const styles = {
    bannerStyle: {
        backgroundColor: '#4AA7B3',
        height: Dimensions.get('window').height * (290/812),
        // height: 290,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2
    },
    graphicStyle: {
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
    memberCountStyle: {
        // fontSize: 14,
        fontSize: Dimensions.get('window').width * (14/375),
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'left',
        position: 'absolute',
        paddingLeft: 22,
        paddingTop: Dimensions.get('window').height * (269/812)
        // paddingTop: 265
    },
    helpContainer: {
        position: 'absolute',
        bottom: 10,
        right: 15
    },
    help: {
        height: 25,
        width: 25
    },
    messageContainerStyle: {
        backgroundColor: '#47525E',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 15
        marginBottom: Dimensions.get('window').width * (15/375)
    },
    messageStyle: {
        // fontSize: 18,
        fontSize: Dimensions.get('window').width * (18/375),
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center',
        // paddingTop: 15,
        paddingTop: Dimensions.get('window').width * (15/375),
        // paddingBottom: 15,
        paddingBottom: Dimensions.get('window').width * (15/375),
        // paddingLeft: 5,
        paddingLeft: Dimensions.get('window').width * (5/375),
        // paddingRight: 5
        paddingRight: Dimensions.get('window').width * (5/375)
    }
};

const mapStateToProps = state => {
    const postList = _.map(state.postList, (val, uid) => {
        return { ...val, uid };
    });

    return { postList: postList.reverse() };
};

export default connect(mapStateToProps, { getPosts })(PostList);
