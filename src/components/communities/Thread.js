/* The component displayed when somebody clicks on an individual post */
import React, { Component } from 'react';
import { 
    View,
    Text, 
    Image, 
    KeyboardAvoidingView, 
    Keyboard, 
    TouchableOpacity, 
    TouchableWithoutFeedback,
    Platform,
    Dimensions 
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { ImagePicker, Permissions } from 'expo';
import { Actions } from 'react-native-router-flux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { SafeAreaView } from 'react-navigation';
import { 
    commentUpdate, 
    commentImageUpdate, 
    submitComment,
} from '../../actions';
import CommentList from './CommentList';

class Thread extends Component {
    /* Stores info from firebase detailing if the signed in user has commented before or not */
    state = {
        hasCommented: false
    }

    componentDidMount() {
        const { currentUser } = firebase.auth();

        firebase.database().ref(`locations/${this.props.school}/posts/${this.props.communityType}/${this.props.post.uid}/comments`)
            .on('value', snapshot => {
                const numComments = snapshot.numChildren();
                if (numComments === 1) {
                    firebase.database().ref(`locations/${this.props.school}/posts/${this.props.communityType}/${this.props.post.uid}/numComments`)
                    .set(`${numComments} comment`)
                }
                if (numComments > 1) {
                    firebase.database().ref(`locations/${this.props.school}/posts/${this.props.communityType}/${this.props.post.uid}/numComments`)
                    .set(`${numComments} comments`)
                }
            });

        firebase.database().ref(`locations/${this.props.school}/users/${currentUser.uid}/hasCommented`)
            .on('value', snapshot => {
                this.setState({
                    hasCommented: snapshot.val()
                });
            });
    }

    /* Similar to the function in the Community component, this function is access the
    person's camera roll */
    onImageButtonPress = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === 'granted') {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                base64: true,
                mediaTypes: 'Images',
                aspect: [4, 3]
            });

            if (!result.cancelled) {
                const commentImg = result.base64;
                this.props.commentImageUpdate({ 
                    prop: 'commentPhoto',
                    value: `data:image/jpeg;base64,${commentImg}`
                });
            }
        }
    }

    /* This function allows someone to post a response to an existing post. The action creator is passed the 
    new comment, the uid of the post, and the username of the current user */
    postComment() {
        const { comment, commentPhoto } = this.props;
        const uid = `${this.props.post.uid}`;
        const community = `${this.props.communityType}`;
        const school = `${this.props.school}`;
        const { currentUser } = firebase.auth();
        const commentUserId = currentUser.uid;
        
        if (`${comment}`.length === 0 && `${commentPhoto}`.length === 0) {
            Keyboard.dismiss();
            return null;
        }

        if (`${this.props.post.userId}` === `${commentUserId}`) {
            firebase.database().ref(`/locations/${school}/users/${commentUserId}/name`)
                .on('value', snapshot => {
                    const name = snapshot.val();
                    this.props.submitComment({ comment, commentPhoto: commentPhoto || 'none', name, commentUserId, isOriginalPoster: true, uid, community, school });
                    Keyboard.dismiss();
                });
        } else {
            firebase.database().ref(`/locations/${school}/users/${commentUserId}/name`)
                .on('value', snapshot => {
                    const name = snapshot.val();
                    this.props.submitComment({ comment, commentPhoto: commentPhoto || 'none', name, commentUserId, isOriginalPoster: false, uid, community, school });
                    Keyboard.dismiss();
                });
        }
    }

    /* This prompt appears for the first time someone comments. It's purpose is to explain how to properly give
    peer support and iterates once again what is acceptable */
    joinThread() {
        Actions.support({ school: this.props.school });
    }

    /* If the image button is pressed again, get rid of the photo */
    deleteImage() {
        this.props.commentImageUpdate({
            prop: 'commentPhoto',
            value: ''
        });
    }

    /* The submit button is rendered */
    renderSubmitButton() {
        return (
            <TouchableOpacity onPress={this.postComment.bind(this, this.props.post)}>
                <Image
                    style={styles.footerIcon}  
                    source={require('../../../assets/images/submit.png')}
                />
            </TouchableOpacity>
        );
    }

    /* The image gallery button is rendered */
    renderImageButton() {
        const { commentPhoto } = this.props;
        if (`${commentPhoto}`.length === 0) {
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
                    source={{ uri: this.props.commentPhoto }}
                />
            </TouchableWithoutFeedback>
        </View>
        );
    }

    renderFooter() {
        if (this.state.hasCommented) {
            return (
                <View style={styles.commentContainerStyle}>
                    {this.renderImageButton()}
                    <AutoGrowingTextInput 
                        placeholder="Share your thoughts here!"
                        value={this.props.comment}
                        onChangeText={value => this.props.commentUpdate({
                            prop: 'comment',
                            value
                        })}
                        style={styles.commentStyle}
                        underlineColorAndroid='transparent'
                    />
                    {this.renderSubmitButton()}
                </View>
            );
        }

        if (!this.state.hasCommented) {
            return (
                <TouchableWithoutFeedback onPress={this.joinThread.bind(this)}>
                    <View style={styles.footerContainerStyle}>
                        <Text style={styles.footerText}>First time commenting? Click here!</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }

    /* Within the render method, CommentList is what displays both the main post and its respective comments */
    render() {
        return (
            <KeyboardAvoidingView 
                style={styles.containerStyle} 
                behavior={(Platform.OS === 'ios') ? 'padding' : null}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
                enabled
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <CommentList 
                        {...this.props.post}
                        communityType={this.props.communityType}
                        school={this.props.school}
                    />
                        {this.renderFooter()}
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

/* Stylesheet for the thread component */
const styles = {
    containerStyle: {
        flex: 1,
        backgroundColor: '#F3F3F3'
    },
    commentContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#F4F7F8',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 10,
        bottom: 1,
        padding: 10
    },
    commentStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        // lineHeight: 20,
        lineHeight: Dimensions.get('window').width * (20/375),
        flex: 2
    },
    buttonView: {
        backgroundColor: '#F4F7F8',
        borderBottomWidth: 1,
        borderColor: '#4AA7B3',
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 14,
        padding: 15
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

const mapStateToProps = (state) => {
    const { comment, commentPhoto } = state.threadReducer;

    return { comment, commentPhoto };
};

export default connect(mapStateToProps, { 
    commentUpdate, 
    commentImageUpdate, 
    submitComment
})(Thread);
