/* Pure component that will render each individual comment for its respective resource */
import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { 
    showResourceCommentPrompt, 
    declineResourceCommentPrompt, 
    getFlagResourceCommentId,
    flagResourceComment 
} from '../../actions/ResourceThreadActions';
import { Confirm } from '../common';

class ResourceComment extends PureComponent {
    /* If you choose to flag the comment, the comment's id is collected along with the current person who's
    flagging the comment. A snapshot of the original comment is caputred (so we can review it) and then the flagResourceComment
    action is called */
    onAccept() {
        const flaggedResourceComment = this.props.resourceCommentId;
        const school = this.props.school;
        const resourceId = this.props.resourceId;
        const currentUser = firebase.auth().currentUser.uid;

        firebase.database().ref(`/locations/${school}/resources/${resourceId}/comments/${flaggedResourceComment}/resourceComment`)
            .on('value', snapshot => {
                const originalResourceComment = snapshot.val();
                this.props.flagResourceComment({ flaggedResourceComment, school, resourceId, currentUser, originalResourceComment });
            });
    }

    /* If you don't want to flag the comment then make the modal go away */
    onDecline() {
        this.props.declineResourceCommentPrompt();
    }

    /* Clicking the dots on the comment will show the modal and retrieve the current comment's id */
    onDotsClick = (item) => {
        this.props.showResourceCommentPrompt();
        const resourceCommentId = `${item.uid}`;
        
        this.props.getFlagResourceCommentId(resourceCommentId);
    }

    /* The modal that appears if you click the dots to flag a comment */
    flagResourceCommentModal() {
        return (
            <Confirm
                visible={this.props.showResourceCommentModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
            >
                Are you sure you want to flag this comment? 3 flags may result in the user's deletion.
            </Confirm>
        );
    }

    render() {
        if (`${this.props.item.resourceCommentPhoto}`.length < 5) {
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
                            <Text style={styles.commentStyle}>{this.props.item.resourceComment}</Text>
                    </View>
                        {this.flagResourceCommentModal()}
                </View>
            );
        }
        if (`${this.props.item.resourceCommentPhoto}`.length > 5) {
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
                            <Text style={styles.commentStyle}>{this.props.item.resourceComment}</Text>
                            <View style={styles.imageView}>
                            <Image 
                                source={{ uri: this.props.item.resourceCommentPhoto }}
                                style={styles.imageStyle}
                            />
                        </View>
                    </View>
                        {this.flagResourceCommentModal()}
                </View>
            );
        }
    }
}

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
        top: 20
    },
    dots: {
        height: 5,
        width: 23
    },
    nameStyle: {
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        fontFamily: 'apercu-bold',
        // color: '#47525E',
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
        height: Dimensions.get('window').height * (350/812),
        // height: 350,
        alignItems: 'center',
        borderRadius: 5
    }
};

const mapStateToProps = (state) => {
    const { showResourceCommentModal, resourceCommentId } = state.resourceThread;

    return { showResourceCommentModal, resourceCommentId };
};

export default connect(mapStateToProps, { 
    showResourceCommentPrompt, 
    declineResourceCommentPrompt,
    getFlagResourceCommentId,
    flagResourceComment
 })(ResourceComment);
