import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, KeyboardAvoidingView,
} from 'react-native';
import CirecleButton from '../components/SircleButton';
import firebase from 'firebase';

export default function MemoCreateScreen(props) {
  const [bodyText, setBodyText] = useState("");
  const { navigation } = props;

  function handlePless () {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    const rf = db.collection(`users/${currentUser && currentUser.uid}/memos`);
    rf.add({
      bodyText,
      updatedAt: new Date(),
    })
      .then(() => {
        navigation.goBack()
      })
      .catch(() => {
      });
  }
  return (
    <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={-500} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput 
          value={bodyText}
          multiline
          style={styles.input}
          onChangeText={(text) => setBodyText(text)}
          autoFocus
        />
      </View>
      <CirecleButton
        name="check"
        onPress={handlePless}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    color: "red"
  },
  inputContainer: {
    paddingHorizontal: 27,
    paddingVertical: 22,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});