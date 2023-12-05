import * as React from 'react';
import {Image, ImageRequireSource, Alert} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Text,
  VStack,
} from 'components';
import Images from 'assets/images';
import {navigate} from 'navigation/RootNavigation';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import {onLogin} from '../../services/LoginService';
import {useNetInfo} from '@react-native-community/netinfo';

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const Login = React.memo(() => {
  const netInfo = useNetInfo();
  const styles = useStyleSheet(themedStyles);
  // Handle Value Email dan Password
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  // Save User Info
  const [userInfo, setUserInfo] = React.useState({});

  // cek koneksi internet
  const [isConnected, setIsConnected] = React.useState(true);


  // Handle jika user sudah login atau belum
  React.useEffect(() => {
    const cekUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const status = await AsyncStorage.getItem('status');
        if (token && status) {
          navigate('Dashboard');
        } else {
          navigate('Login');
        }
      } catch (error) {
        console.log('error : ', error);
        navigate('Login');
      }
    };

    cekUserInfo();
  }, []);

  // // Function Login nya
  const onLogin = async ({email, password}: any) => {
    console.log('Proses Login');
    console.log(netInfo.isConnected);

    if (!netInfo.isConnected) {
      Alert.alert(
        'Tidak ada koneksi internet',
        'Silahkan cek kembali koneksi internet anda.',
        [
          {
            text: 'OK',
            onPress: () => {
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem('status');
              AsyncStorage.removeItem('role');

              navigate('Login');
              return;
            },
          },
        ],
      );
    }

    if (email === '' || password === '') {
      Alert.alert('Warning', 'Periksa kembali Email dan Password anda');
      return;
    } else {
      await axios
        .post(`${BASE_URL_API}/login`, {email: email, password: password})
        .then(async res => {
          const data = await res.data;
          console.log('status : ' + data.status);
          if (data.status === false) {
            Alert.alert('Warning', 'Username tidak valid');
          } else {
            setUserInfo(data);
            await AsyncStorage.setItem('token', data.row.token);
            await AsyncStorage.setItem('status', JSON.stringify(data.status));
            await AsyncStorage.setItem('role', data.row.role);
            navigate('Dashboard');
          }
        })
        .catch(error => {
          if (axios.isCancel(error)) {
            console.log('Request was canceled:', error.message);
          } else if (error.response) {
            console.log('Server responded with an error:', error.response.data);
          }
          //  else if (error.message === 'Network Error') {
          //   Alert.alert(
          //     'Network Error',
          //     'Please check your internet connection.',
          //   );
          // } 
          else {
            console.log('Error:', error.message);
          }
        });
    }
  };

  return (
    <Container style={styles.container} level="2">
      <Image
        style={styles.ic_img}
        source={Images.bpfk.ic_bpfk_login}
        resizeMode="contain"
      />
      <VStack mh={24}>
        <Input
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Masukkan username"
        />
      </VStack>
      <VStack mh={24} mb={32} mt={18}>
        <Input
          style={styles.input}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder="Masukkan password"
          secureTextEntry={true}
        />
      </VStack>
      <Button
        children={'Login'}
        style={styles.button}
        onPress={() => onLogin({email, password})}
      />
      <VStack>
        <Text style={[{marginTop: 40}, {fontSize: 14}, {textAlign: 'center'}]}>
          <Text style={{color: '#000'}}>
            Badan Pengamanan Fasilitas Kesehatan{' '}
          </Text>
        </Text>
        <Text center>@2023 - BPFK Makassar </Text>
      </VStack>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  ic_img: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 18,
  },
  caret: {
    width: 12,
    height: 12,
    tintColor: 'text-basic-color',
  },
  logo: {
    width: 16,
    height: 16,
  },
  input: {
    backgroundColor: 'background-basic-color-1',
    borderRadius: 50,
  },
  buttonSwap: {
    width: 48,
    height: 48,
    alignSelf: 'center',
    marginVertical: 4,
  },
  info: {
    width: 16,
    height: 16,
    tintColor: 'text-platinum-color',
    marginLeft: 4,
  },
  inputSlipage: {
    flex: 1,
    marginLeft: 24,
    padding: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  caretDown: {
    tintColor: 'background-basic-color-5',
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  button: {
    borderRadius: 50,
    marginHorizontal: 24,
    marginVertical: 8,
    backgroundColor: '#00b1a9',
  },
});

