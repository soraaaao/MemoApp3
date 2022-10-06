import React from 'react';
import { View, StyleSheet } from 'react-native';
import MemoList from '../components/MemoList';
import CirecleButton from '../components/SircleButton';

export default function MemoListScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <MemoList />
      <CirecleButton
        name="plus"
        onPress={() => { navigation.navigate('MemoCreate') }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
});
