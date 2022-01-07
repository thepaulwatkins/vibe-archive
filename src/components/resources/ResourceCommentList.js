/*This component will render all of the resources added to the community resources */
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import { getResourceComments } from '../../actions/ResourceThreadActions';
import ResourceComment from './ResourceComment';

class ResourceCommentList extends Component {
    /*The getResourceComments function will access all of the posts stored in firebase to display when the component renders.
     */
    componentDidMount() {
        const school = `${this.props.school}`;
        const uid = `${this.props.uid}`;
        this.props.getResourceComments({ uid, school });
    }

    /*Render the main resource to be displayed at the top of the screen*/
    renderResource() {
        return (
            <View style={styles.bannerStyle}>
                <View style={{ flex: 1 }}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.nameStyle}>{this.props.resourceName}</Text>
                            <Text style={styles.dateStyle}>{this.props.resourceDate}</Text>
                        </View>

                        <View style={styles.headerStyle}>
                            <Text style={styles.typeStyle}>{this.props.resourceType}</Text>
                            <Image
                                source={require('../../../assets/images/circle_gray.png')}
                                style={styles.circleStyle} 
                            />
                            <Text style={styles.userNameStyle}>Posted by {this.props.userName}</Text>
                        </View>

                        <Text style={styles.postStyle}>{this.props.resourceDescription}</Text>
                    </View>
            </View>
        );
    }

    /*Return a list of comments for each respective resource */
    render() {
        return (
            <FlatList 
                style={{ flex: 1 }}
                scrollEnabled
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={this.renderResource()}
                data={this.props.resourceCommentList}
                renderItem={({ item }) =>
                    <ResourceComment
                        item={item}
                        resourceId={this.props.uid}
                        school={this.props.school}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        );
    }
}

const styles = {
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
    headerStyle: {
        flexDirection: 'row',
        flex: 1
    },
    nameStyle: {
        fontFamily: 'apercu-bold',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#000000',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 30,
        marginTop: 15,
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
    },
    typeStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 14,
        fontSize: Dimensions.get('window').width * (14/375),
        color: '#B6BFC8',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 5,
        marginBottom: 10
    },
    circleStyle: {
        height: 3,
        width: 3,
        marginTop: 7,
        marginRight: 5
    },
    userNameStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 14,
        fontSize: Dimensions.get('window').width * (14/375),
        color: '#B6BFC8',
        alignItems: 'flex-start',
        marginRight: 5,
        marginBottom: 10
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
}

const mapStateToProps = state => {
    const resourceCommentList = _.map(state.resourceCommentList, (val, uid) => {
        return { ...val, uid };
    });

    return { resourceCommentList };
};

export default connect(mapStateToProps, { getResourceComments })(ResourceCommentList);
