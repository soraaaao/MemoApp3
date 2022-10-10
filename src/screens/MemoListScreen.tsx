import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import LogOutButton from '../components/LogOutButton';
import MemoList from '../components/MemoList';
import CirecleButton from '../components/SircleButton';
import firebase from 'firebase';

export default function MemoListScreen(props) {
  const { navigation } = props;
  const [memoList, setMemoList] = useState([]);
  console.log(memoList)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <LogOutButton />,
    })
  }, []);

  useEffect(() => {
    console.log("ここきたよ")
    const db = firebase.firestore();
    const { currentUser } = firebase.auth();
    let unsubscribe = () => {};
    if (currentUser) {
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
      }, (error) => {
        console.log(error)
        Alert.alert("データの読み込みに失敗しました。")
      });
    }
    return unsubscribe
  }, [])

  return (
    <View style={styles.container}>
      <MemoList userMemoList={memoList}/>
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
