import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import axios from 'axios';

const BoxTotal = ({totalDatas}:any) => {
  const styles = useStyleSheet(themedStyles);

  const [dataTotalPermohonan, setTotalPermohonan] = React.useState([]);
  React.useEffect(() => {
    const checkTokenAndFetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const status = await AsyncStorage.getItem('status');
        await fetchData(token);
      } catch (error) {
        console.log('error : ', error);
      }
    };

    checkTokenAndFetchData();
  }, []);

  const fetchData = async (token: any) => {
    try {
      const response = await axios.get(`${BASE_URL_API}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTotalPermohonan(response.data);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  return (
    <VStack style={styles.container} level="1" border={12} padding={16}>
      <HStack itemsCenter mb={4}>
        <Text status="platinum" category="subhead">
          Total Permohonan
        </Text>
      </HStack>

      <Text marginBottom={8} category="h3">
        {totalDatas}
      </Text>
      {/* <Text marginBottom={8} category="h3">
          0
        </Text> */}
    </VStack>
  );
};

export default BoxTotal;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: 'text-platinum-color',
    marginLeft: 16,
  },
  button: {
    flex: 1,
  },
  download: {
    width: 48,
    height: 48,
    marginLeft: 16,
  },
});
