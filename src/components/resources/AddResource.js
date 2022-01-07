/* This component is a modal that pops up on the screen whenever someone wants to add a new community resource */
import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Modal, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';
import { 
    resourceTypeUpdate,
    resourceNameUpdate,
    resourceDescriptionUpdate,
    declineResourcePrompt,
    resourceSubmit
 } from '../../actions/ResourceActions';

import { Button } from '../common/Button';

class AddResource extends Component {
    /*Initializing the date variable to add the date to the submitted resource*/
    state = {
        findDate: '',
    }

    /*Finding the date pre-emptively so it can be attached to the resource if one is submitted*/
    componentDidMount() {
        const getDate = new Date();
        const year = getDate.getFullYear();
        const month = getDate.getMonth() + 1;
        const day = getDate.getDate();
        this.setState({
            findDate: `${month}/${day}/${year}`
        });
    }

    /*If someone chooses to submit a resource, call the resourceSubmit action */
    onAccept() {
        const school = this.props.school;
        const userId = this.props.currentUser;
        const userName = this.props.userName;
        const resourceDate = this.state.findDate; 
        const { resourceType, resourceName, resourceDescription } = this.props;
        const numComments = 'Review, discuss, share your thoughts';

        if (`${resourceDescription}`.length > 10) {
        this.props.resourceSubmit({ 
            resourceType: resourceType || 'Resource', 
            resourceName: resourceName || 'N/A', 
            resourceDescription: resourceDescription || 'N/A', 
            resourceDate, school, userId, userName, numComments })
        }
    }

render() {
  return (
    <Modal
      visible={this.props.visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <KeyboardAvoidingView style={styles.containerStyle} keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
          <View style={styles.cardSectionStyle}>
              <TouchableWithoutFeedback onPress={this.props.onDecline}>
                  <Image
                      source={require('../../../assets/images/close.png')}
                      style={{ height: 15, width: 15 }}
                  />
              </TouchableWithoutFeedback>

            <Text style={styles.titleStyle}>
              What Do You Recommend?
            </Text>
            <Text style={styles.subtitleStyle}>
                Know a way to de-stress? Want to offer your help? Share clinical resources or more casual support with those around you!
            </Text>

            <Text style={styles.textStyle}>
                Is this an event, location, or service?
            </Text>

            <View style={styles.inputContainerStyle}>
            <TextInput 
                placeholder="Event"
                value={this.props.resourceType}
                onChangeText={value => this.props.resourceTypeUpdate({ 
                    prop: 'resourceType', 
                    value 
                })}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
            />
            </View>

            <Text style={styles.textStyle}>
                What's it called?
            </Text>

            <View style={styles.inputContainerStyle}>
            <TextInput
                placeholder="Yoga in the Park"
                value={this.props.resourceName}
                onChangeText={value => this.props.resourceNameUpdate({ 
                    prop: 'resourceName', 
                    value 
                })}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
            />
            </View>

            <Text style={styles.textStyle}>
                Mini-description (max. 250 char)
            </Text>
                
            <View style={styles.inputContainerStyle}>
            <AutoGrowingTextInput
                placeholder="I go to this every other Monday and it really helps me get through the week! 8-9AM at The Park. It's coming up and I'm down to carpool if you want to go!"
                value={this.props.resourceDescription}
                onChangeText={value => this.props.resourceDescriptionUpdate({
                    prop: 'resourceDescription',
                    value
                })} 
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
                maxLength={250}
            />
            </View>
            
            <Text style={styles.textStyle}>
                Anything fake, inappropriate, or unrelated to wellness will be removed.
            </Text>

            <View style={styles.buttonContainerStyle}>
                <Button onPress={this.onAccept.bind(this)}>
                    Submit
                </Button>
            </View>

          </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
}

const styles = {
  cardSectionStyle: {
    padding: 15,
    backgroundColor: '#F3F3F3',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 14,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  titleStyle: {
    // fontSize: 18,
    fontSize: Dimensions.get('window').width * (18/375),
    color: '#4AA7B3',
    // color: '#47525E',
    fontFamily: 'apercu-bold',
    textAlign: 'center',
    lineHeight: Dimensions.get('window').width * (20/375),
    marginTop: 25
  },
  subtitleStyle: {
    // fontSize: 14,
    fontSize: Dimensions.get('window').width * (14/375),
    color: '#47525E',
    fontFamily: 'apercu-font',
    textAlign: 'center',
    lineHeight: Dimensions.get('window').width * (20/375),
    marginBottom: 10
  },
  textStyle: {
    // fontSize: 14,
    fontSize: Dimensions.get('window').width * (14/375),
    color: '#47525E',
    fontFamily: 'apercu-font',
    textAlign: 'center',
    lineHeight: Dimensions.get('window').width * (20/375),
  },
  buttonContainerStyle: {
    borderBottomWidth: 1,
    // padding: 15,
    padding: Dimensions.get('window').width * (15/375),
    backgroundColor: '#F3F3F3',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#F3F3F3',
    position: 'relative',
    marginTop: 14,
    borderRadius: 10
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainerStyle: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4AA7B3',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'relative',
    padding: 5,
    marginBottom: 10,
    bottom: 1
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    // fontSize: 16,
    fontSize: Dimensions.get('window').width * (16/375),
    lineHeight: Dimensions.get('window').width * (20/375),
    flex: 1
  }
};

/* This function helps connect this component to the application state held in the resourceReducer */
const mapStateToProps = (state) => {
    const { resourceType, resourceName, resourceDescription, showResourceModal } = state.resourceAdd;

    return { resourceType, resourceName, resourceDescription, showResourceModal };
};

export default connect(mapStateToProps, {
    resourceTypeUpdate,
    resourceNameUpdate,
    resourceDescriptionUpdate,
    declineResourcePrompt,
    resourceSubmit
})(AddResource);

