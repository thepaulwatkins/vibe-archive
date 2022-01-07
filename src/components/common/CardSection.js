import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[styles.containerStyle, props.style]}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderBottomWidth: 1,
    padding: 15,
    backgroundColor: '#F4F7F8',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#4AA7B3',
    position: 'relative',
    marginTop: 14,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  }
};

export { CardSection };
