import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import CirecleButton from '../components/SircleButton';

export default function MemoListScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    })
  }, []);

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
