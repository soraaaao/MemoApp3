import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase';
import { navigationReset } from '../common/servece/commonLogic';
import { useNavigation } from '@react-navigation/native';

export default function LogOutButton() {
  const navigation = useNavigation()
  function handlePress () {
    firebase.auth().signOut()
      .then(() => {
        navigationReset(navigation, 'LogIn')
      })
      .catch(() => {
        Alert.alert("ログアウトに失敗しました。")
      })
  }
  return (
    <TouchableOpacity 
    style={styles.container}
    onPress={handlePress}
    >
        <Text style={styles.label}>ログアウト</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  label: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)'
  },
});
