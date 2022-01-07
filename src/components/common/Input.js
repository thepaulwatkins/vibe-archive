import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';

const Input = ({ value, onChangeText, placeholder, secureTextEntry, maxLength, keyboardType }) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCapitalize='none'
        autoCorrect={false}
        style={inputStyle}
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        underlineColorAndroid='transparent'
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    // fontSize: 16,
    fontSize: Dimensions.get('window').width * (16/375),
    // lineHeight: 20,
    lineHeight: Dimensions.get('window').width * (20/375),
    flex: 2,
    fontFamily: 'apercu-font'
  },
  // labelStyle: {
  //   fontSize: 18,
  //   paddingLeft: 20,
  //   flex: 1,
  //   color: '#8190A5'
  // },
  containerStyle: {
    // height: 20,
    height: Dimensions.get('window').width * (20/375),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
