import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { shape, string, instanceOf, arrayOf } from 'prop-types';
import { dateToString } from '../common/servece/commonLogic';
import firebase from 'firebase';

// TODO:型定義する
export default function MemoList({ userMemoList }) {
  const navigation = useNavigation()

  function deleteMemo (id) {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const db = firebase.firestore();
      const ref = db.collection(`users/${currentUser.uid}/memos`).doc(id)
      Alert.alert('メモを削除します', 'よろしいですか？', [
        {
          text: 'キャンセル',
          onPress: () => {},
        },
        {
          text: '削除する',
          style: 'destructive',
          onPress: () => {
            ref.delete().catch(() => { 
              Alert.alert('削除に失敗しました') 
            });
          },
        },
      ])
    }
  }

  function renderItem ({ item }) {
    return (
      <TouchableOpacity
        style={styles.memoListItem}
        onPress={() => { navigation.navigate('MemoDetail', {id: item.id})}}
      >
        <View>
          <Text style={styles.memoListItemTitle} numberOfLines={1}>{item.bodyText}</Text>
          <Text style={styles.memoListItemDate}>{dateToString(item.updatedAt)}</Text>
        </View>
        <TouchableOpacity
          style={styles.memoDelete}
          onPress={() => { deleteMemo(item.id)}}
        >
          <Feather name="x" size={16} color="gray" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <FlatList
        data={userMemoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id }
      />
    </View>
  );
}

MemoList.protoTypes = {
  userMemoList: arrayOf(shape({
    id: string,
    bodyText: string,
    updatedAt: instanceOf(Date),
  })).isRequired,
}

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
  memoDelete: {
    padding: 8,
  },
});
