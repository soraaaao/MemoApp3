import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import CirecleButton from '../components/SircleButton';
import firebase from 'firebase';
import Button from '../components/Button';
import Loading from '../components/Loading'

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memoList, setMemoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    })
  }, []);

  useEffect(() => {
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
      setIsLoading(true)
      const ref = db.collection(`users/${currentUser.uid}/memos`).orderBy("updatedAt", "desc");
      unsubscribe = ref.onSnapshot((snapshot) => {
        // 型定義
        const userMemoList: Array<any> = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          userMemoList.push({
            id: doc.id,
            bodyText: data.bodyText,
            updatedAt: data.updatedAt.toDate(),
          })
        })
        setMemoList(userMemoList);
        setIsLoading(false)
      }, (error) => {
        setIsLoading(false)
        Alert.alert("データの読み込みに失敗しました。")
      });
    }
    return unsubscribe
  }, [])

  const handlePress: () => void = useCallback(() => {
    navigation.navigate('MemoCreate')
  }, [navigation]);

  if (memoList.length === 0) {
    return (
    <View style={emptyStyles.container}>
      <Loading isLoading={isLoading}/>
      <View style={emptyStyles.inner}>
        <Text style={emptyStyles.title}>最初のメモを作成しよう！</Text>
        <Button 
          style={emptyStyles.button} 
          label="作成する"
          onPress={handlePress}
        />
      </View>
    </View>
    )
  }

  return (
    <View style={styles.container}>
      <MemoList userMemoList={memoList}/>
      <CirecleButton
        name="plus"
        onPress={handlePress}
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
const emptyStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    marginBottom: 24,
  },
  button: {
    alignSelf: 'center',
  },
});

