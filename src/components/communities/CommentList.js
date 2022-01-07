/*This comment list component can be applied to any of the communities on the app */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { getComments } from '../../actions/ThreadActions';
import Comment from './Comment';

class CommentList extends Component {
    /*When this component is called, get the comments corresponding to the specific post */
    componentDidMount() {
        const community = `${this.props.communityType}`;
        const school = `${this.props.school}`;
        const uid = `${this.props.uid}`;
        this.props.getComments({ uid, community, school });
    }

    renderPost() {
        if (`${this.props.name}`.length === 0) {
            return (
                <View style={styles.bannerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.postName}>New Community Members!</Text>
                        <Text style={styles.dateStyle}>{this.props.postDate}</Text>
                    </View>
                    <Text style={styles.postText}>{this.props.post}</Text>
                </View>
            );
        }
        if (`${this.props.photo}`.length < 5 && `${this.props.name}`.length > 0) {
            return (
                <View style={styles.bannerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.postName}>{this.props.name}</Text>
                        <Text style={styles.dateStyle}>{this.props.postDate}</Text>
                    </View>
                    <Text style={styles.postText}>{this.props.post}</Text>
                </View>
            );
        }
            return (
                <View style={styles.bannerStyle}>
                    <View style={styles.headerStyle}>
                        <Text style={styles.postName}>{this.props.name}</Text>
                        <Text style={styles.dateStyle}>{this.props.postDate}</Text>
                    </View>
                    <Text style={styles.postText}>{this.props.post}</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: this.props.photo }} 
                                style={styles.image}
                            />
                        </View>
                </View>
            );
    }

    /*Return a list of comments for each respective post */
    render() {
        return (
            <FlatList 
                style={{ flex: 1 }}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={this.renderPost()}
                data={this.props.commentList}
                renderItem={({ item }) =>
                    <Comment
                        item={item}
                        communityType={this.props.communityType}
                        postId={this.props.uid}
                        school={this.props.school}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = {
    postContainerStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        flexDirection: 'row',
        position: 'relative',
        marginTop: 14,
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
    dateStyle: {
        color: '#B6BFC8',
        position: 'absolute',
        right: 15,
        marginTop: 15,
        fontFamily: 'apercu-font',
        fontSize: Dimensions.get('window').width * (14/375)
        // fontSize: 14
    },
    bannerStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 60,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2
    },
    postName: {
        color: '#000000',
        fontFamily: 'apercu-bold',
        fontSize: Dimensions.get('window').width * (16/375),
        // fontSize: 16,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 5
    },
    postText: {
        color: '#47525E',
        fontFamily: 'apercu-font',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10 
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: Dimensions.get('window').width - 20,
        // height: 350
        height: Dimensions.get('window').height * (350/812)
    }
};

const mapStateToProps = state => {
    const commentList = _.map(state.commentList, (val, uid) => {
        return { ...val, uid };
    });

    return { commentList };
};

export default connect(mapStateToProps, { getComments })(CommentList);
