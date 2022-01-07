/* Pure component that will render each individual post */
import React, { PureComponent } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import firebase from 'firebase';
// import { Video } from 'expo'; 
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { 
    showPrompt, 
    declinePrompt,
    showDeletePrompt,
    declineDeletePrompt, 
    getFlagId, 
    flagPost 
} from '../../actions/PostActions';
import { Confirm } from '../common';

class Post extends PureComponent {
    /*When clicked, the current post is passed as a prop to the Thread component */
    onPostClick(item) {
        const communityType = this.props.communityType;
        const school = this.props.school;
        Actions.thread({ post: item, communityType, school });
    }

    /* If you choose to flag the post, the post's id is collected along with the current person who's
    flagging the post. A snapshot of the original post is caputred (so we can review it) and then the flagPost
    action is called */
    onAccept() {
        const flaggedPost = this.props.flagId;
        const community = this.props.communityType;
        const school = this.props.school;
        const flagger = this.props.currentUserId;
        
        firebase.database().ref(`/locations/${school}/posts/${community}/${flaggedPost}/post`)
            .on('value', snapshot => {
                const originalPost = snapshot.val();
                this.props.flagPost({ flaggedPost, community, school, flagger, originalPost });
            });
    }

    /* If you don't want to flag the post then make the modal go away */
    onDecline() {
        this.props.declinePrompt();
    }

    /* If you choose to delete your post, do into the database and remove the post then hide the prompt */
    onDeleteAccept() {
        const flaggedPost = this.props.flagId;
        const community = this.props.communityType;
        const school = this.props.school;
        firebase.database().ref(`/locations/${school}/posts/${community}/${flaggedPost}`).remove();
        this.props.declinePrompt();
    }

    /* Clicking the dots on the post will show the modal and retrieve the current post's id */
    onDotsClick = (item) => {
        if (`${item.userId}` === `${this.props.currentUserId}`) {
            this.props.showDeletePrompt();
            const postId = `${item.uid}`;
            this.props.getFlagId(postId);
        } else {
            this.props.showPrompt();
            const postId = `${item.uid}`;
            this.props.getFlagId(postId);
        }
    }

    // onDeleteDotsClick = (item) => {
    //     console.log(`${item.uid}`);
    //     this.props.showDeletePrompt();
    //     // const postId = `${item.uid}`;
    //     // this.props.getFlagId(postId);
    // }

    // /* The modal that appears if the user wants to delete their post. */
    // deleteModal() {
    //     return (
    //         <Confirm
    //         visible={this.props.showDeleteModal}
    //         onDeleteAccept={this.onDeleteAccept.bind(this)}
    //         onDeleteDecline={this.onDeleteDecline.bind(this)}
    //         >
    //         Want to delete yo mess?
    //         </Confirm>
    //     );
    // }

    /* The modal that appears if you click the dots to flag or delete a post */
    flagModal() {
        if (this.props.showModal) {
            return (
                <Confirm
                visible={this.props.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                >
                Are you sure you want to flag this post? 3 flags may result in the user's deletion.
                </Confirm>
            );  
        } else {
            return (
                <Confirm
                visible={this.props.showModal}
                onAccept={this.onDeleteAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
                >
                Do you want to delete your post?
                </Confirm>
            );
        }
    }

    /*This function is what renders the data inside of the FlatList. Depending on if the
    post/item contains an image or not, the item is rendered to the screen as just a text
    post or a text/image post. If the person has not joined the community, they are not able to
    click the post and see the comments. Also the names are replaced in this case */
    //REVISIT THE IMAGE RESIZING SO IT'S THE SAME/QUALITY ON PHONES
    render() {
        if (`${this.props.item.photo}`.length < 5 && 
            this.props.joined && 
            `${this.props.item.name}`.length !== 0) {
            return (
                <TouchableWithoutFeedback onPress={this.onPostClick.bind(this, this.props.item)}>
                    <View style={styles.postContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerStyle}>
                                <Text style={styles.nameStyle}>{this.props.item.name}</Text>
                                <Text style={styles.dateStyle}>{this.props.item.postDate}</Text>
                            </View>
                            <Text style={styles.postStyle}>{this.props.item.post}</Text>
                            <View style={styles.headerStyle}>
                                <Text style={styles.commentStyle}>{this.props.item.numComments}</Text>
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
                        </View>
                            {this.flagModal()}
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        if (`${this.props.item.name}`.length === 0 && this.props.joined) {
            return (
                <TouchableWithoutFeedback onPress={this.onPostClick.bind(this, this.props.item)}>
                <View style={styles.postContainerStyle}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.joinStyle}>{this.props.item.post}</Text>
                        <Text style={styles.commentStyle}>{this.props.item.numComments}</Text>
                    </View>
                </View>
                </TouchableWithoutFeedback>
            );
        }

        if (`${this.props.item.photo}`.length > 5 && this.props.joined) {
            return (
                <TouchableWithoutFeedback onPress={this.onPostClick.bind(this, this.props.item)}>
                    <View style={styles.postContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerStyle}>
                                <Text style={styles.nameStyle}>{this.props.item.name}</Text>
                                <Text style={styles.dateStyle}>{this.props.item.postDate}</Text>
                            </View>
                                <Text style={styles.postStyle}>{this.props.item.post}</Text>
                        <View style={styles.imageView}>
                            <Image 
                                source={{ uri: this.props.item.photo }}
                                style={styles.imageStyle}
                            />
                        </View>
                        <View style={styles.headerStyle}>
                                <Text style={styles.commentStyle}>{this.props.item.numComments}</Text>
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
                        </View>
                            {this.flagModal()}
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        if (`${this.props.item.photo}`.length < 5 && 
            !this.props.joined && 
            `${this.props.item.name}`.length !== 0 &&
            `${this.props.communityType}` === 'POC + Wellness' ||
            `${this.props.communityType}` === 'LGBTQ + Wellness') {
            return (
                    <View style={styles.postContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerStyle}>
                                <Text style={styles.nameStyle}>AnonymousAnimal</Text>
                                <Text style={styles.dateStyle}>{this.props.item.postDate}</Text>
                            </View>
                            <Text style={styles.postStyle}>You must be in the space to see what's being discussed.</Text>
                        </View>
                    </View>
            );
        }

        if (`${this.props.item.photo}`.length < 5 && 
        !this.props.joined && 
        `${this.props.item.name}`.length !== 0) {
            return (
                <View style={styles.postContainerStyle}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.nameStyle}>AnonymousAnimal</Text>
                            <Text style={styles.dateStyle}>{this.props.item.postDate}</Text>
                        </View>
                        <Text style={styles.postStyle}>{this.props.item.post}</Text>
                    </View>
                </View>
            );
        }

        if (`${this.props.item.photo}`.length > 5 && !this.props.joined && 
        `${this.props.communityType}` === 'POC + Wellness' ||
        `${this.props.communityType}` === 'LGBTQ + Wellness') {
            return (
                    <View style={styles.postContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerStyle}>
                                <Text style={styles.nameStyle}>AnonymousAnimal</Text>
                                <Text style={styles.dateStyle}>{this.props.item.postDate}</Text>
                            </View>
                            <Text style={styles.postStyle}>You must be in the space to see what's being discussed.</Text>
                        </View>
                    </View>
            );
        }

        if (`${this.props.item.photo}`.length > 5 && !this.props.joined) {
            return (
                    <View style={styles.postContainerStyle}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerStyle}>
                                <Text style={styles.nameStyle}>AnonymousAnimal</Text>
                                <Text style={styles.dateStyle}>{this.props.item.postDate}</Text>
                            </View>
                            <Text style={styles.postStyle}>{this.props.item.post}</Text>
                        <View style={styles.imageView}>
                                <Image 
                                    source={{ uri: this.props.item.photo }}
                                    style={styles.imageStyle}
                                />
                        </View>
                        </View>
                    </View>
            );
        }
        return null;
    }
}

/* Stylesheet for the post itself */
const styles = {
    postContainerStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        position: 'relative',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 1
    },
    headerStyle: {
        flexDirection: 'row',
        flex: 1
    },
    dotsContainer: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
    dots: {
        height: 5,
        width: 23,
    },
    nameStyle: {
        fontFamily: 'apercu-bold',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#000000',
        // color: '#47525E',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginTop: 15,
        marginBottom: 5
    },
    dateStyle: {
        position: 'absolute',
        fontFamily: 'apercu-font',
        // fontSize: 14,
        fontSize: Dimensions.get('window').width * (14/375),
        color: '#B6BFC8',
        textAlign: 'right',
        right: 15,
        marginTop: 15,
        marginBottom: 5
    },
    postStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#47525E',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    commentStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 14,
        fontSize: Dimensions.get('window').width * (14/375),
        color: '#B6BFC8',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    joinStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#47525E',
        alignItems: 'flex-start',
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    imageStyle: {
        width: Dimensions.get('window').width - 20,
        height: Dimensions.get('window').height * (350/812)
        // height: 350
    }
};

const mapStateToProps = (state) => {
    const { showModal, showDeleteModal, flagId } = state.postReducer;

    return { showModal, showDeleteModal, flagId };
};

export default connect(mapStateToProps, { 
    showPrompt, 
    declinePrompt,
    showDeletePrompt,
    declineDeletePrompt, 
    getFlagId,
    flagPost
 })(Post);
