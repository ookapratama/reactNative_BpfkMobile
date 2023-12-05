import * as React from 'react';

import {useLayout} from 'hooks';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {NavigationAction, HStack} from 'components';
import {navigate} from 'navigation/RootNavigation';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Dashboard, {getStatus} from './Dashboard';

const BottomTab = React.memo(() => {
  const {bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  // get ALl data permohonan
  const allPermohonan = () => {};

  // Handle Logout User
  const onLogout = () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin logout?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('status');
            AsyncStorage.removeItem('role');
            AsyncStorage.removeItem('id');

            navigate('Login');
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <HStack level="1" style={[styles.container, {paddingBottom: bottom + 8}]}>
      <NavigationAction
        onPress={() => {
          navigate('Dashboard');
        }}
        status="primary"
        icon={'house'}
      />
      <NavigationAction
        onPress={() => {
          navigate({name: 'Permohonan', params: 'allData'});
        }}
        status="primary"
        icon={'wallet'}
      />
      <NavigationAction
        onPress={() => onLogout()}
        status="primary"
        icon={'logout'}
      />
    </HStack>
  );
});

export default BottomTab;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 34,
  },
});
