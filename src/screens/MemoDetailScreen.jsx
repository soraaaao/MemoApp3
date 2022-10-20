import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import CirecleButton from '../components/SircleButton';
import { shape, string } from 'prop-types';
import firebase from 'firebase';
import { dateToString } from '../common/servece/commonLogic';

export default function MemoDetailScreen(props) {
  const { navigation, route } = props;
  const { id } = route.params;
  const [memo, setMemo] = useState(null);

  useEffect(() => {
    const { currentUser } = firebase.auth();
    const db = firebase.firestore();
    let unsubscribe = () => {}
    if (currentUser) {
      const ref = db.collection(`users/${currentUser && currentUser.uid}/memos`).doc(id)
      unsubscribe = ref.onSnapshot((doc) =>{
        console.log(doc.id, doc.data())
        const data = doc.data();
        setMemo({
          id: doc.id,
          bodyText: data?.bodyText,
          updatedAt: data?.updatedAt.toDate(),
        })
      });
    }
    return unsubscribe
  }, [id]);

  return (
    <View style={styles.container}>

      <View style={styles.memoheader}>
        <Text style={styles.memotitle} numberOfLines={1}>{memo && memo.bodyText && memo.bodyText}</Text>
        <Text style={styles.memodate}>{memo && memo.updatedAt && dateToString(memo.updatedAt)}</Text>
      </View>

      <ScrollView style={styles.memobody}>
        <View style={styles.memobodyInner}>
          <Text style={styles.memotext}>
            {memo && memo.bodyText && memo.bodyText}
          </Text>
        </View>
      </ScrollView>
      <CirecleButton
        name="edit-2"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => { navigation.navigate('MemoEdit', { id: memo.id, bodyText: memo.bodyText})}}
      />
    </View>
  );
}

MemoDetailScreen.propTypes = {
  route: shape({
    params: shape({ id: string }),
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoheader: {
    backgroundColor: '#F3AB57',
    height: 90,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memotitle: {
    color: '#ffffff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memodate: {
    color: '#ffffff',
    fontSize: 12,
    lineHeight: 16,
  },
  memobody: {
    paddingHorizontal: 27,
  },
  memobodyInner: {
    paddingTop: 32,
    paddingBottom: 40,
  },
  memotext: {
    fontSize: 16,
    lineHeight: 24,
  },
});