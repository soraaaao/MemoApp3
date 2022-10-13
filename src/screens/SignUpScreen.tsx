import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import Button from '../components/Button';
import firebase from 'firebase';
import { navigationReset, translateErrors } from '../common/servece/commonLogic';

export default function SignUpScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const handlePless = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { user} = userCredential;
      navigationReset(navigation, 'MemoList')
    }).catch((error) => {
      const errorMs = translateErrors(error.code)
      Alert.alert(errorMs.title, errorMs.description)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          value={email}
          style={styles.input} 
          onChangeText={(text) => {setEmail(text)}}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='Email Address'
          textContentType='emailAddress'
        />
        <TextInput
          value={password}
          style={styles.input} 
          onChangeText={(text) => {setpassword(text)}}
          autoCapitalize='none'
          placeholder='Password'
          secureTextEntry
          textContentType='password'
        />
        <Button
          label="submit"
          onPress={handlePless}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <TouchableOpacity
            onPress={() => {
              navigationReset(navigation, 'LogIn')
            }}
            >
            <Text style={styles.footerLink}>Log In.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  inner: {
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 21,
  },
  input: {
    fontSize: 16,
    height: 48,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    color: '#467FD3',
  },
  footer: {
    flexDirection: 'row',
  },
});
