/*This component is the foundation of the all of the communities listed on the app */
import _ from 'lodash';
import React, { Component } from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { 
    View, 
    Text, 
    Image, 
    KeyboardAvoidingView,
    Keyboard, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform,
    Dimensions
 } from 'react-native';
import { ImagePicker, Permissions, FileSystem } from 'expo';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { SafeAreaView } from 'react-navigation';
import { 
    postUpdate, 
    postSubmit, 
    imageUpdate, 
    showPrompt,
    addMember,
    declinePrompt 
} from '../../actions/PostActions';
import { Confirm } from '../common';
import PostList from './PostList';

class Community extends Component {
    /*Creating state variables to keep track of the current user's email and to see if they have joined 
    this specific community or not */
    state = { 
        userName: '', 
        joined: false,
        findDate: '',
        modalText: '',
        currentUserId: '',
        isMounted: false
    };

    /*Before the component renders, check to see if this current user has joined this community by searching 
    if the user has this community listed in thier communities in firebase. Other things that are accessed here
    include the userId so we have something to conenct the post to, their name, and the date so we can put a date
    to the post. Also listed in this function is the switch statement to decide what the text will be if someone
    joins a community. ***I'm worreid this function is too stuffed and might cause problems later on...*** */
    componentDidMount() {
        Keyboard.dismiss();
        const { currentUser } = firebase.auth();
        const id = `${currentUser.uid}`;

        this.setState({ isMounted: true }, () => {
            this.setState({
                currentUserId: id
            });

            firebase.database().ref(`/locations/${this.props.school}/users/${currentUser.uid}/communities`)
            .on('value', snapshot => {
                if (_.find(_.map(snapshot.val()), { community: `${this.props.communityType}` })) {
                    this.setState({
                        joined: true
                    });
                }
            });
            
            firebase.database().ref(`/locations/${this.props.school}/users/${currentUser.uid}/name`)
                .on('value', snapshot => {
                    this.setState({
                        userName: snapshot.val()
                    });
                });
    
            const getDate = new Date();
            const year = getDate.getFullYear();
            const month = getDate.getMonth() + 1;
            const day = getDate.getDate();
            this.setState({
                findDate: `${month}/${day}/${year}`
            });
    
            switch (`${this.props.communityType}`) {
                case 'Academics':
                    return (
                        this.setState({
                            modalText: 
                            'Be respectful as you share advice, vent, and talk with other folks. And of course, no cheating.'
                        })
                    );
                case 'POC + Wellness':
                case 'LGBTQ + Wellness':
                    return (
                        this.setState({
                            modalText: `By joining, you're saying you identify with and/or you care about the topics related to this space. Nothing hateful or derogatory will be tolerated.`
                        })
                    );
                case 'FLI + Wellness':
                    return (
                        this.setState({
                            modalText: `Be aware folks come from different backgrounds. Nothing hateful or derogatory will be tolerated.`
                        })
                    );
                case 'Eating + Wellness':
                    return (
                        this.setState({
                            modalText: 'Engage with respect and be mindful of the varying relationships people have with food in this community.'
                        })
                    );
                case 'Creativity':
                case 'Gratitude':
                case 'Animals + Nature':
                    return (
                        this.setState({
                            modalText: 'Be respectful to your peers and respect that you are all coming from different perspectives.'
                        })
                    );
                case 'Depression':
                case 'Anxiety':
                case 'Grief':
                case 'Relationships':
                    return (
                        this.setState({
                            modalText: 'Be supportive and sensitive to what your peers experience and share. Nothing hateful or derogatory will be tolerated.'
                        })
                    );
                default:
                    return (
                        null
                    );
            }
        });
    }

    /* Unmount all of the components mounted in the previous function */
    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
    }

    /*When the user submits a post, this function also takes in their username and stores it in firebase 
    and displays it along with their post. Also included with the post are their school (to show where to store the
    post), the post date to list on the post, and the userId to tie the post to a user */
    onSubmitButtonPress() {
        const name = this.state.userName;
        const postDate = this.state.findDate;
        const { post, photo } = this.props;
        const community = `${this.props.communityType}`;
        const userId = this.state.currentUserId;
        const school = `${this.props.school}`;
        // const numComments = 'Add to this discussion!';
        const numComments = `Add to ${name}'s post!`

        if (`${post}`.length === 0 && `${photo}`.length === 0) {
            Keyboard.dismiss();
            return null;
        }

        this.props.postSubmit({ post, name, photo: photo || 'none', postDate, userId, community, school, numComments });
        Keyboard.dismiss();
    }

    /*This function gives Vibe access to the camera roll and assists the user in selecting an image to upload. 
    Video upload not currently available :( */
    onImageButtonPress = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                // quality: 1.0,
                mediaTypes: 'Images',
                aspect: [4, 3]
            });

            if (!result.cancelled) {
                const img = result.base64;

                this.props.imageUpdate({ 
                    prop: 'photo',
                    value: `data:image/jpeg;base64,${img}`
                });
            }
        }
    }

    /* If the user chooses to accept the terms of joining this community, they become a member! */
    onAccept() {
        const userId = `${this.state.currentUserId}`;
        const community = `${this.props.communityType}`;
        const school = `${this.props.school}`;
        const userName = `${this.state.userName}`;

        // const post = '25 more people have joined this community. Welcome them!';
        // const postDate = this.state.findDate;
        // const name = '';
        // const photo = '';
        // const numComments = 'Add to this discussion!';

        this.props.addMember({ userId, community, school, userName });

        // firebase.database().ref(`/locations/${this.props.school}/members/${community}`)
        // .on('value', snapshot => {
        //     const remainder = snapshot.numChildren() % 25;
        //     if (remainder === 0) {
        //         this.props.postSubmit({ post, name, photo, postDate, userId, community, school, numComments });
        //     }
        // });
    }

    /* If the user clicks the "x", this action closes the prompt by hiding the modal */
    onDecline() {
        this.props.declinePrompt();
    }

    /* When the button to the join the community is clicked, the joinPrompt action will display a 
    modal the user must interact with before they're able to engage with the posts */
    joinCommunity() {
        this.props.showPrompt();
    }

    /* This function will delete the image and reset the pohoto value */
    deleteImage() {
        this.props.imageUpdate({
            prop: 'photo',
            value: ''
        });
    }

    /* Allow the user to post a comment if they have entered something for the post */
    renderSubmitButton() {
        return (
            <TouchableOpacity onPress={this.onSubmitButtonPress.bind(this)}>
                <Image
                    style={styles.footerIcon}  
                    source={require('../../../assets/images/submit.png')}
                />
            </TouchableOpacity>
        );
    }

    /* Depending on if a photo has been selected to upload or not, either the phone photo gallery image appears, 
    or the selected photo. Clicking the image gallery alllows the user to select a photo, while clicking an image 
    that's already selected will result in its deletion */
    renderImageButton() {
        const { photo } = this.props;
        if (`${photo}`.length === 0) {
            return (
                <View style={{ marginRight: 10 }}>
                    <TouchableWithoutFeedback onPress={this.onImageButtonPress.bind(this)}>
                        <Image
                            style={styles.footerIcon}  
                            source={require('../../../assets/images/image_gallery.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
            );
        }
        return (
        <View style={{ marginRight: 10 }}>
            <TouchableWithoutFeedback onPress={this.deleteImage.bind(this)}>
                <Image
                    style={styles.footerIcon}  
                    source={{ uri: this.props.photo }}
                />
            </TouchableWithoutFeedback>
        </View>
        );
    }

    /* Function determining which footer is displayed. If the user has joined this community, allow them to submit 
    posts. If they have not joined, then this function is taken away and replace with a button prompting them to 
    join if they want to engage */
    renderFooter() {
        const user = firebase.auth().currentUser;
        // if (!this.state.joined && user.emailVerified === false) {
        //     return (
        //         <View style={styles.footerContainerStyle}>
        //             <Text style={styles.footerText}>Check your email for a verification link before you join the space</Text>
        //         </View>
        //     );
        // }
        if (this.state.joined) {
            return (
                <View style={styles.inputContainerStyle}>
                    {this.renderImageButton()}
                    <AutoGrowingTextInput
                        placeholder="Share your thoughts here!"
                        value={this.props.post}
                        onChangeText={value => this.props.postUpdate({ 
                            prop: 'post', 
                            value 
                        })}
                        style={styles.inputStyle}
                        underlineColorAndroid='transparent'
                    />
                    {this.renderSubmitButton()}
                </View>
            );
        }
        // if (!this.state.joined && user.emailVerified === true) {
        //     return (
        //         <TouchableWithoutFeedback onPress={this.joinCommunity.bind(this)}>
        //             <View style={styles.footerContainerStyle}>
        //                 <Text style={styles.footerText}>Click here to engage with folks!</Text>
        //             </View>
        //         </TouchableWithoutFeedback>
        //     );
        // }
        if (!this.state.joined) {
            return (
                <TouchableWithoutFeedback onPress={this.joinCommunity.bind(this)}>
                    <View style={styles.footerContainerStyle}>
                        <Text style={styles.footerText}>Click here to engage with folks!</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    /*Inside of the return function is the GratitudeList component which is where the posts for this community 
    are stored */
    render() {
        return (
                <KeyboardAvoidingView 
                    style={styles.containerStyle}
                    behavior={(Platform.OS === 'ios') ? 'padding' : null}
                    keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })} 
                    enabled
                >
                    <SafeAreaView style={{ flex: 1 }} forceInset={{ top: 'never' }}>
                        <View style={styles.containerStyle}>
                            <PostList 
                                joined={this.state.joined} 
                                communityType={this.props.communityType}
                                imageTitle={this.props.imageTitle} 
                                currentUserId={this.state.currentUserId}
                                school={this.props.school}
                                postDate={this.state.findDate}
                            />
                                {this.renderFooter()}
                            <Confirm
                                visible={this.props.showModal}
                                onAccept={this.onAccept.bind(this)}
                                onDecline={this.onDecline.bind(this)}
                            >
                                {this.state.modalText}
                            </Confirm>
                        </View>
                    </SafeAreaView>
                </KeyboardAvoidingView>
        );
    }
}

/* Stylesheet for the community component */
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    inputContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#F4F7F8',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 10,
        padding: 10,
        bottom: 1
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        lineHeight: Dimensions.get('window').width * (20/375),
        // lineHeight: 20,
        flex: 2
      },
    footerContainerStyle: {
        backgroundColor: '#4AA7B3',
        borderWidth: 1,
        borderColor: '#4AA7B3',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 14,
        bottom: 0,
        padding: 10
    },
    footerText: {
        // fontSize: 18,
        fontSize: Dimensions.get('window').width * (18/375),
        fontFamily: 'apercu-font',
        color: 'white',
        textAlign: 'center'
    },
    footerIcon: {
        // width: 30,
        // height: 30
        width: Dimensions.get('window').width * (30/375),
        height: Dimensions.get('window').width * (30/375)
    }
};

/* This function helps connect this component to the application state held in the postReducer */
const mapStateToProps = (state) => {
    const { post, photo, showModal } = state.postReducer;

    return { post, photo, showModal };
};

export default connect(mapStateToProps, { 
    postUpdate, 
    postSubmit, 
    imageUpdate,
    showPrompt,
    addMember,
    declinePrompt 
})(Community);
