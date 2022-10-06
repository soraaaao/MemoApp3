import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
} from 'react-native';
import ButtonCom from '../components/Button';
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDxm3o8OLAJaBDe3Jwk4iCMqPxbvTFafNw",
  authDomain: "memoapp2-c1ce0.firebaseapp.com",
  projectId: "memoapp2-c1ce0",
  storageBucket: "memoapp2-c1ce0.appspot.com",
  messagingSenderId: "511881521575",
  appId: "1:511881521575:web:889383cef8b196c043ae82",
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth();

export default function LoginScreen(props) {
  const { navigation } = props;
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

function handlePless(auth, email, password) {
  // console.log(email)
  // console.log(password)

  // console.log("関数実行開始")
  // signInWithEmailAndPassword(auth, email, password)
  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user;
  //   // ...
  //   console.log(user)
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(errorMessage)
  // });
  navigation.reset({
    index: 0,
    routes: [{ name: 'MemoList' }],
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
          onPress={() => handlePless(auth, email, password)}
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
