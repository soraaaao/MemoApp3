import React from 'react';
import {
  Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import { string, func, shape } from 'prop-types';

export default function ButtonCom(props) {
  const { label, onPress, style } = props;
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

ButtonCom.propTypes = {
  label: string.isRequired,
  onPress: func,
  style: shape(),
};

ButtonCom.defaultProps = {
  onPress: null,
  style: null,
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    paddingVertical: 8,
    paddingHorizontal: 32,
    color: '#ffffff',
  },
});
