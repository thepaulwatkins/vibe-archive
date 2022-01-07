/* This component is specifically for the look and function of each resource within the resource list */
import React, { PureComponent } from 'react';
import { 
    View, 
    Text,
    Image, 
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { 
    flagResource, 
    clearFlagResource,
    getResourceFlagId 
} from '../../actions/ResourceActions';
import { Confirm } from '../common/Confirm';

class Resource extends PureComponent {

    onResourcePress(item) {
        const school = this.props.school;
        Actions.resourcethread({ resource: item, school });
    }

    onDotsClick = (item) => {
        this.props.flagResource();
        const resourceId = `${item.uid}`;
        this.props.getResourceFlagId(resourceId);
    }

    onDecline() {
        this.props.clearFlagResource();
    }

    onAccept() {
        const flaggedResource = this.props.resourceFlagId;
        const school = this.props.school;

        firebase.database().ref(`/locations/${school}/resources/${flaggedResource}`).remove();
        this.props.clearFlagResource();
    }

    resourceFlagModal() {
        return (
            <Confirm
            visible={this.props.resourceFlagModal}
            onAccept={this.onAccept.bind(this)}
            onDecline={this.onDecline.bind(this)}
            >
            Do you want to flag this resource?
            </Confirm>
        );
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.onResourcePress.bind(this, this.props.item)}>
                <View style={styles.postContainerStyle}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.headerStyle}>
                            <Text style={styles.nameStyle}>{this.props.item.resourceName}</Text>
                            <Text style={styles.dateStyle}>{this.props.item.resourceDate}</Text>
                        </View>

                        <View style={styles.headerStyle}>
                            <Text style={styles.typeStyle}>{this.props.item.resourceType}</Text>
                            <Image
                                source={require('../../../assets/images/circle_gray.png')}
                                style={styles.circleStyle} 
                            />
                            <Text style={styles.userNameStyle}>Posted by {this.props.item.userName}</Text>
                        </View>

                        <Text style={styles.postStyle}>{this.props.item.resourceDescription}</Text>

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
                    {this.resourceFlagModal()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

/* Stylesheet for the resources */
const styles = {
    postContainerStyle: {
        backgroundColor: 'white',
        // backgroundColor: '#4AA7B3',
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
    nameStyle: {
        fontFamily: 'apercu-bold',
        // fontSize: 16,
        fontSize: Dimensions.get('window').width * (16/375),
        color: '#000000',
        // color: '#47525E',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 30,
        marginTop: 15,
        // marginBottom: 5
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
        // marginBottom: 5
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        marginTop: 15
    },
    icon: {
        height: 15,
        width: 15
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
        // color: 'white',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    commentStyle: {
        fontFamily: 'apercu-font',
        // fontSize: 14,
        fontSize: Dimensions.get('window').width * (14/375),
        // color: '#47525E',
        color: '#B6BFC8',
        alignItems: 'flex-start',
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    dotsContainer: {
        position: 'absolute',
        right: 15,
        bottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20
    },
    dots: {
        height: 5,
        width: 23,
    }
};

const mapStateToProps = (state) => {
    const { resourceFlagModal, resourceFlagId } = state.resourceFlag;

    return { resourceFlagModal, resourceFlagId };
};

export default connect(mapStateToProps, {
    flagResource,
    clearFlagResource,
    getResourceFlagId
})(Resource);
