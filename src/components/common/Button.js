import React from 'react';
import { Text, TouchableOpacity, Dimensions } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    //color: '#007aff',
    // fontSize: 20,
    fontSize: Dimensions.get('window').width * (20/375),
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'apercu-font'
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    //backgroundColor: '#fff',
    backgroundColor: '#47525E',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#47525E',
    //borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    //height: 60,
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1
  }
};

export { Button };
