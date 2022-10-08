import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert
} from 'react-native';
import ButtonCom from '../components/Button';
import firebase from 'firebase';

export default function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

function handlePless() {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const { user } = userCredential;
      navigation.reset({
        index: 0,
        routes: [{ name: 'MemoList' }],
      })
    }).catch((error) => {
      Alert.alert(error.code)
    })
  
}

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Log In</Text>
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
        <ButtonCom
          label="Submit"
          onPress={() => handlePless()}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Not resistered?</Text>
          <TouchableOpacity
            onPress={() => { 
                navigation.reset({
                index: 0,
                routes: [{name: 'SignUp'}],
                })
            }}
          >
            <Text style={styles.footerLink}>Sign up here!</Text>
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
