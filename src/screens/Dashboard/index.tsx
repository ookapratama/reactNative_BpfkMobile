import * as React from 'react';
import {RefreshControl, ScrollView} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
} from '@ui-kitten/components';

import {Container, Content, Text, VStack, HStack, IDivider} from 'components';
import LotteryCard from './LotteryCard';
import {navigate} from 'navigation/RootNavigation';
import BottomTab from '../BottomTab';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';

const Dashboard = React.memo(() => {
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [dataTotal, setDataTotal]: any = React.useState([]);
  const [refreshPage, setRefreshPage] = React.useState(false);
  const [status, setStatus] = React.useState('');

  const getStatus = async (status: string = '') => {
    console.log('hal dashboard : ', status);
    try {
      const token = await AsyncStorage.getItem('token');
      const responseStatus = await axios.get(
        `${BASE_URL_API}/permohonan/status/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const resTotal = responseStatus.data;
      setStatus(resTotal);
      await AsyncStorage.setItem('status_data', status);
      navigate({name: 'Permohonan', params: status});
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const fetchData = async (token: any) => {
    try {
      const responseTotal = await axios.get(`${BASE_URL_API}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setDataTotal(responseTotal.data);
    } catch (error) {
      console.log('Error : ', error);
    }
  };

  const onRefresh = React.useCallback(() => {
    console.log("refresh page");
    setRefreshPage(true);
    setTimeout(() => {
      setRefreshPage(false);
    }, 2000);
  }, [status]);

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
  }, [refreshPage]);

  return (
    <Container style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshPage} onRefresh={onRefresh} />
        }>
        <VStack level="2" style={[styles.header, {paddingTop: top}]}>
          <TopNavigation
            appearance="control"
            accessoryLeft={
              <Text category="h3" marginLeft={20}>
                Dashboard
              </Text>
            }
          />
        </VStack>
        <Content level="2" contentContainerStyle={styles.content}>
          <LotteryCard />

          {/* Permohonan */}
          <VStack mh={16} style={styles.shadow} level="1" mb={12} border={12}>
            <HStack mv={12} mh={24}>
              <HStack itemsCenter justify="flex-start">
                <HStack justify="flex-start" itemsCenter>
                  <Text category="h3">Permohonan</Text>
                </HStack>
              </HStack>
              <VStack level="5" style={styles.tag}>
                {dataTotal.row && dataTotal.row.pengajuan !== undefined ? (
                  <Text status="white" category="p1">
                    {dataTotal.row.pengajuan}
                  </Text>
                ) : (
                  <Text status="white" category="p1">
                    0
                  </Text>
                )}
              </VStack>
            </HStack>

            <IDivider marginHorizontal={12} marginVertical={1} />

            <Button
              onPress={() => getStatus('1')}
              style={[{marginHorizontal: 10}, {marginVertical: 14}]}
              children={'Lihat Selengkapnya'}
              status="transparent-primary"
            />
          </VStack>

          {/* DIproses */}
          <VStack mh={16} style={styles.shadow} level="1" mb={12} border={12}>
            <HStack mv={12} mh={24}>
              <HStack itemsCenter justify="flex-start">
                <HStack justify="flex-start" itemsCenter>
                  <Text category="h3">Diproses</Text>
                </HStack>
              </HStack>
              <VStack level="5" style={styles.tag}>
                {dataTotal.row && dataTotal.row.diproses !== undefined ? (
                  <Text status="white" category="p1">
                    {dataTotal.row.diproses}
                  </Text>
                ) : (
                  <Text status="white" category="p1">
                    0
                  </Text>
                )}
              </VStack>
            </HStack>

            <IDivider marginHorizontal={12} marginVertical={1} />

            <Button
              onPress={() => getStatus('2')}
              style={[{marginHorizontal: 10}, {marginVertical: 14}]}
              children={'Lihat Selengkapnya'}
              status="transparent-primary"
            />
          </VStack>

          {/* Selesai */}
          <VStack mh={16} style={styles.shadow} level="1" mb={12} border={12}>
            <HStack mv={12} mh={24}>
              <HStack itemsCenter justify="flex-start">
                <HStack justify="flex-start" itemsCenter>
                  <Text category="h3">Selesai</Text>
                </HStack>
              </HStack>
              <VStack level="5" style={styles.tag}>
                {dataTotal.row && dataTotal.row.selesai !== undefined ? (
                  <Text status="white" category="p1">
                    {dataTotal.row.selesai}
                  </Text>
                ) : (
                  <Text status="white" category="p1">
                    0
                  </Text>
                )}
              </VStack>
            </HStack>

            <IDivider marginHorizontal={12} marginVertical={1} />

            <Button
              onPress={() => getStatus('3')}
              style={[{marginHorizontal: 10}, {marginVertical: 14}]}
              children={'Lihat Selengkapnya'}
              status="transparent-primary"
            />
          </VStack>
        </Content>
      </ScrollView>

      <BottomTab />
    </Container>
  );
});

export default Dashboard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    paddingBottom: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  tabBar: {
    marginHorizontal: 16,
  },
  content: {
    paddingTop: 16,
  },
  content_list: {
    marginHorizontal: 16,
  },
  buttonHeader: {
    backgroundColor: 'background-basic-color-1',
  },
  coin: {
    width: 32,
    height: 32,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'background-basic-color-1',
  },
  tag: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 99,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,

    elevation: 2,
  },
});
