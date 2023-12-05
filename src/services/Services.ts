import * as React from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../env';
import {navigate} from 'navigation/RootNavigation';

export const onLogin = async ({email, password}: any) => {
  console.log('ON LOGIN');
  const [userInfo, setUserInfo] = React.useState({});

  await axios.post(`${BASE_URL_API}/login`, {email, password}).then(async res => {
    const data = await res.data;
    console.log('error : ' + data.status);
    // if (data.status === false) {
    //   Alert.alert('Warning', 'Username tidak ditemukan');
    // } else {
    //   setUserInfo(data);
    //   await AsyncStorage.setItem('token', data.row.token);
    //   await AsyncStorage.setItem('status', JSON.stringify(data.status));
    //   // navigate('Dashboard');
    //   console.log(data);
    // }
  });

  // Handle jika user sudah login atau belum
  //   React.useEffect(() => {
  //     const cekUserInfo = async () => {
  //       try {
  //         // const token = await AsyncStorage.getItem('token');
  //         // const status = await AsyncStorage.getItem('status');
  //         if (email != null && password != null) {
  //           // Jika token dan status ditemukan, lakukan permintaan API dengan token
  //           navigate('Dashboard');
  //         } else {
  //           // Jika token atau status tidak ditemukan, arahkan pengguna ke layar login
  //           navigate('Login');
  //         }
  //       } catch (error) {
  //         console.log('error : ', error);
  //         navigate('Login');
  //       }
  //     };

  //     cekUserInfo();
  //   }, []);
};
