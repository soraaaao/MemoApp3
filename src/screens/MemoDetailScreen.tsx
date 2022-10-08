import React from 'react';
import {
  View, Text, ScrollView, StyleSheet,
} from 'react-native';
import CirecleButton from '../components/SircleButton';

export default function MemoDetailScreen(props) {
  const { navigation } = props;
  return (
    <View style={styles.container}>

      <View style={styles.memoheader}>
        <Text style={styles.memotitle}>買い物リスト</Text>
        <Text style={styles.memodate}>2022年12月21日 10:00</Text>
      </View>

      <ScrollView style={styles.memobody}>
        <Text style={styles.memotext}>
          買い物リスト
          テキストテキストテキストテキストテキストテキスト
          テキストテキストテキストテキストテキストテキストテキストテキスト
        </Text>
      </ScrollView>
      <CirecleButton
        name="edit-2"
        style={{ top: 60, bottom: 'auto' }}
        onPress={() => { navigation.navigate('MemoEdit')}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  memoheader: {
    backgroundColor: '#467FD3',
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
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memotext: {
    fontSize: 16,
    lineHeight: 24,
  },
});
