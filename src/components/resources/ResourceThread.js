/* The component displayed when somebody clicks on an individual resource */
import React, { Component } from 'react';
import { 
    View,
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
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { SafeAreaView } from 'react-navigation';
import { 
    resourceCommentUpdate, 
    resourceCommentImageUpdate, 
    resourceSubmitComment 
} from '../../actions/ResourceThreadActions';
import ResourceCommentList from './ResourceCommentList';

class ResourceThread extends Component {

    componentDidMount() {
        firebase.database().ref(`/locations/${this.props.school}/resources/${this.props.resource.uid}/comments`)
            .on('value', snapshot => {
                const numComments = snapshot.numChildren();
                if (numComments === 1) {
                    firebase.database().ref(`/locations/${this.props.school}/resources/${this.props.resource.uid}/numComments`)
                    .set(`${numComments} comment`)
                }
                if (numComments > 1) {
                    firebase.database().ref(`/locations/${this.props.school}/resources/${this.props.resource.uid}/numComments`)
                    .set(`${numComments} comments`)
                }
            })
    }

    /* Similar to the function in the Community component, this function is to access the
    person's camera roll */
    onResourceImageButtonPress = async () => {
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
                this.props.resourceCommentImageUpdate({ 
                    prop: 'resourceCommentPhoto',
                    value: `data:image/jpeg;base64,${commentImg}`
                });
            }
        }
    }

    /* This function allows someone to post a response to an existing resource. The action creator is passed the 
    new comment, the uid of the resource, and the username of the current user */
    submitResourceComment() {
        const { resourceComment, resourceCommentPhoto } = this.props;
        const uid = `${this.props.resource.uid}`;
        const school = `${this.props.school}`;
        const { currentUser } = firebase.auth();
        const resourceCommentUserId = currentUser.uid;
        
        if (`${resourceComment}`.length === 0 && `${resourceCommentPhoto}`.length === 0) {
            Keyboard.dismiss();
            return null;
        }

        if (`${this.props.resource.userId}` === `${resourceCommentUserId}`) {
            firebase.database().ref(`/locations/${school}/users/${resourceCommentUserId}/name`)
                .on('value', snapshot => {
                    const name = snapshot.val();
                    this.props.resourceSubmitComment({ resourceComment, resourceCommentPhoto: resourceCommentPhoto || 'none', name, resourceCommentUserId, isOriginalPoster: true, uid, school });
                    Keyboard.dismiss();
                });
        } else {
            firebase.database().ref(`/locations/${school}/users/${resourceCommentUserId}/name`)
                .on('value', snapshot => {
                    const name = snapshot.val();
                    this.props.resourceSubmitComment({ resourceComment, resourceCommentPhoto: resourceCommentPhoto || 'none', name, resourceCommentUserId, isOriginalPoster: false, uid, school });
                    Keyboard.dismiss();
                });
        }
    }

    /* If the image button is pressed again, get rid of the photo */
    deleteImage() {
        this.props.resourceCommentImageUpdate({
            prop: 'resourceCommentPhoto',
            value: ''
        });
    }

    /* The submit button is rendered */
    renderSubmitButton() {
        return (
            <TouchableOpacity onPress={this.submitResourceComment.bind(this, this.props.resource)}>
                <Image
                    style={styles.footerIcon}  
                    source={require('../../../assets/images/submit.png')}
                />
            </TouchableOpacity>
        );
    }

    /* The image gallery button is rendered */
    renderImageButton() {
        const { resourceCommentPhoto } = this.props;
        if (`${resourceCommentPhoto}`.length === 0) {
            return (
                <View style={{ marginRight: 10 }}>
                    <TouchableWithoutFeedback onPress={this.onResourceImageButtonPress.bind(this)}>
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
                    source={{ uri: this.props.resourceCommentPhoto }}
                />
            </TouchableWithoutFeedback>
        </View>
        );
    }

    render() {
        return (
            <KeyboardAvoidingView 
                style={styles.containerStyle} 
                behavior={(Platform.OS === 'ios') ? 'padding' : null}
                keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
                enabled
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <ResourceCommentList 
                        {...this.props.resource}
                        school={this.props.school}
                    />
                    <View style={styles.commentContainerStyle}>
                        {this.renderImageButton()}
                        <AutoGrowingTextInput 
                            placeholder="Share your thoughts here!"
                            value={this.props.resourceComment}
                            onChangeText={value => this.props.resourceCommentUpdate({
                                prop: 'resourceComment',
                                value
                            })}
                            style={styles.commentStyle}
                            underlineColorAndroid='transparent'
                        />
                        {this.renderSubmitButton()}
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
        );
    }
}

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
        marginTop: 14,
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
    footerIcon: {
        // width: 30,
        // height: 30
        width: Dimensions.get('window').width * (30/375),
        height: Dimensions.get('window').width * (30/375)
    }
};

const mapStateToProps = (state) => {
    const { resourceComment, resourceCommentPhoto } = state.resourceThread;

    return { resourceComment, resourceCommentPhoto };
};

export default connect(mapStateToProps, { 
    resourceCommentUpdate,
    resourceCommentImageUpdate,
    resourceSubmitComment 
})(ResourceThread);