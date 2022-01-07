/* Pure component that will render each individual comment */
import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { 
    showCommentPrompt,
    showCommentDeletePrompt, 
    declineCommentPrompt, 
    getFlagCommentId,
    flagComment 
} from '../../actions/ThreadActions';
import { Confirm } from '../common';

class Comment extends PureComponent {
    /* If you choose to flag the comment, the comment's id is collected along with the current person who's
    flagging the comment. A snapshot of the original comment is caputred (so we can review it) and then the flagComment
    action is called */
    onAccept() {
        const flaggedComment = this.props.commentId;
        const community = this.props.communityType;
        const school = this.props.school;
        const postId = this.props.postId;
        const currentUser = firebase.auth().currentUser.uid;

        firebase.database().ref(`/locations/${school}/posts/${community}/${postId}/comments/${flaggedComment}/comment`)
            .on('value', snapshot => {
                const originalComment = snapshot.val();
                this.props.flagComment({ flaggedComment, community, school, postId, currentUser, originalComment });
            });
    }

    /* If you don't want to flag the comment then make the modal go away */
    onDecline() {
        this.props.declineCommentPrompt();
    }

    /* If you choose to delete your comment, go into the database and remove the comment then hide the prompt */
    onDeleteAccept() {
        const flaggedComment = this.props.commentId;
        const community = this.props.communityType;
        const school = this.props.school;
        const postId = this.props.postId;
        firebase.database().ref(`/locations/${school}/posts/${community}/${postId}/comments/${flaggedComment}`).remove();
        this.props.declineCommentPrompt();
    }

    /* Clicking the dots on the comment will show the modal and retrieve the current comment's id */
    onDotsClick = (item) => {
        const currentUser = firebase.auth().currentUser.uid;
        if (`${item.commentUserId}` === `${currentUser}`) {
            this.props.showCommentDeletePrompt();
            const commentId = `${item.uid}`;
            this.props.getFlagCommentId(commentId);
        } else {
            this.props.showCommentPrompt();
            const commentId = `${item.uid}`;
            this.props.getFlagCommentId(commentId);
        }
    }

    /* The modal that appears if you click the dots to flag a comment */
    flagCommentModal() {
        if (this.props.showCommentModal) {
            return (
                <Confirm
                visible={this.props.showCommentModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                >
                Are you sure you want to flag this comment? 3 flags may result in the user's deletion.
                </Confirm>
            );  
        } else {
            return (
                <Confirm
                visible={this.props.showCommentModal}
                onAccept={this.onDeleteAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                >
                Do you want to delete your comment?
                </Confirm>
            );
        }
    }

    /*This function is what renders the data inside of the FlatList. Depending on if the
    comment/item contains an image or not, the item is rendered to the screen as just a text
    comment or a text/image comment */
    render() {
        if (`${this.props.item.commentPhoto}`.length < 5) {
            return (
                <View style={styles.postContainerStyle}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.nameStyle}>{this.props.item.name}</Text>
                            <TouchableWithoutFeedback
                                onPress={this.onDotsClick.bind(this, this.props.item)}
                            >
                                <View style={styles.dotsContainer}>
                                    <Image 
                                        source={require('../../../assets/images/dots.png')}
                                        style={styles.dots}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                            <Text style={styles.commentStyle}>{this.props.item.comment}</Text>
                    </View>
                        {this.flagCommentModal()}
                </View>
            );
        }
        if (`${this.props.item.commentPhoto}`.length > 5) {
            return (
                <View style={styles.postContainerStyle}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.nameStyle}>{this.props.item.name}</Text>
                            <TouchableWithoutFeedback
                                onPress={this.onDotsClick.bind(this, this.props.item)}
                            >
                                <View style={styles.dotsContainer}>
                                    <Image 
                                        source={require('../../../assets/images/dots.png')}
                                        style={styles.dots}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                            <Text style={styles.commentStyle}>{this.props.item.comment}</Text>
                            <View style={styles.imageView}>
                            <Image 
                                source={{ uri: this.props.item.commentPhoto }}
                                style={styles.imageStyle}
                            />
                        </View>
                    </View>
                        {this.flagCommentModal()}
                </View>
            );
        }
    }
}

/* Stylesheet for each indvidual comment */
const styles = {
    postContainerStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        position: 'relative',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    headerStyle: {
        flexDirection: 'row',
        flex: 1
    },
    dotsContainer: {
        position: 'absolute',
        right: 15,
        top: 20,
        paddingLeft: 20,
        paddingRight: 10,
        paddingBottom: 20
    },
    dots: {
        height: 5,
        width: 23
    },
    nameStyle: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-bold',
        color: '#000000',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 5
    },
    commentStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#47525E',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: Dimensions.get('window').width - 20,
        // height: 350,
        height: Dimensions.get('window').height * (350/812),
        alignItems: 'center',
        borderRadius: 5
    }
};

const mapStateToProps = (state) => {
    const { showCommentModal, showCommentDeleteModal, commentId } = state.threadReducer;

    return { showCommentModal, showCommentDeleteModal, commentId };
};

export default connect(mapStateToProps, { 
    showCommentPrompt,
    showCommentDeletePrompt, 
    declineCommentPrompt,
    getFlagCommentId,
    flagComment
 })(Comment);
