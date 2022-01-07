import React from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
          <View style={cardSectionStyle}>
              <TouchableWithoutFeedback onPress={onDecline}>
                  <Image
                      source={require('../../../assets/images/x_icon.png')}
                  />
              </TouchableWithoutFeedback>
            <Text style={textStyle}>
              {children}
            </Text>
            <View style={styles.buttonContainerStyle}>
                <Button onPress={onAccept}>
                    Okay
                </Button>
            </View>
          </View>
      </View>


    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    padding: 15,
    backgroundColor: '#4AA7B3',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 14,
    marginRight: 25,
    marginLeft: 25,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  textStyle: {
    fontSize: Dimensions.get('window').width * (18/375),
    // fontSize: 18,
    color: 'white',
    fontFamily: 'apercu-font',
    textAlign: 'center',
    // lineHeight: 20,
    lineHeight: Dimensions.get('window').width * (20/375),
    marginTop: 25
  },
  buttonContainerStyle: {
    borderBottomWidth: 1,
    padding: 15,
    backgroundColor: '#4AA7B3',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#4AA7B3',
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
  }
};

export { Confirm };
