import React, { useState } from 'react';
import {
  View, StyleSheet, TextInput, KeyboardAvoidingView, Alert,
} from 'react-native';
import CirecleButton from '../components/SircleButton';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import { translateErrors } from '../common/servece/commonLogic';

export default function MemoEditScreen(props) {
  const { navigation, route } = props;
  const { id, bodyText } = route.params;
  const [body, setBody] = useState(bodyText);

  function handlPress () {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id);
      ref.set({
        bodyText: body,
        updatedAt: new Date(),
      }, {merge: true})
      .then(() => {
        // 処理が成功したら前の画面に戻る
        navigation.goBack()
      })
      .catch((error) => {
        const errorMs = translateErrors(error.code)
        Alert.alert(errorMs.title, errorMs.description)
      });
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.inputContainer}>
        <TextInput 
          value={body} 
          multiline 
          style={styles.input}
          onChangeText={(text) => { setBody(text) }}
        />
      </View>
      <CirecleButton
        name="check"
        onPress={handlPress}
      />
    </KeyboardAvoidingView>
  );
}

MemoEditScreen.propTypes = {
  route: shape({
    params: shape({ id: string, bodyText: string }),
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
