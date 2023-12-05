import * as React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  ViewPager,
} from '@ui-kitten/components';
import {
  Container,
  Text,
  NavigationAction,
  VStack,
  HStack,
  IDivider,
} from 'components';
import BoxTotal from './BoxTotal';
import Images from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import BottomTab from '../BottomTab';
import {navigate} from 'navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import Pagination from './Pagination';
import {useRoute} from '@react-navigation/native';

const Permohonan = React.memo(() => {
  // get status menu dashboard
  const route = useRoute();
  const getStatusData = route.params;
  // console.log(getStatusData);
  const styles = useStyleSheet(themedStyles);

  const [datas, setDatas]: any = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = datas.last_page === undefined ? '1' : datas.last_page;
  const totalDatas = datas.total;

  const fetchData = async (token: any) => {
    try {
      if (String(getStatusData) === 'allData') {
        const responseDatas = await axios.get(
          `${BASE_URL_API}/permohonan?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const resDatas = responseDatas.data.row;
        setDatas(resDatas);
      } else {
        const responseDatas = await axios.get(
          `${BASE_URL_API}/permohonan/status/${getStatusData}?page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const resDatas = responseDatas.data.row;
        setDatas(resDatas);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error : ', error);
    }
  };

  const onPageChange = (newPage: any) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getId = (id: number, kode_permohonan: string) => {
    // console.log('sebelum di try : ', i d);
    try {
      // const id_permohonan = await AsyncStorage.setItem(
      //   'id',
      //   JSON.stringify(id),
      // );
      // console.log('kode : ', kode_permohonan);
      console.log('id untuk detail : ', id);
      console.log('kode untuk detail : ', kode_permohonan);
      
      AsyncStorage.setItem('id', JSON.stringify(id));
      navigate({name: 'DetailPermohonan', params: id});
    } catch (error) {
      console.log('error : ', error);
    }
  };

  React.useEffect(() => {
    const checkTokenAndFetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const status = await AsyncStorage.getItem('status');
        const status_dashboard = await AsyncStorage.getItem('status_dashboard');
        
        await fetchData(token);
      } catch (error) {
        console.log('error : ', error);
      }
    };

    checkTokenAndFetchData();
  }, [currentPage]);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={'Permohonan'}
        accessoryLeft={
          <NavigationAction
            icon="arrow_left"
            status="primary"
            onPress={() => {
              navigate('Dashboard');
            }}
          />
        }
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          contentContainerStyle={styles.content}
          data={datas.data}
          keyExtractor={keyExtractor}
          renderItem={({item}) => {
            return (
              <VStack level="1" mb={12} border={12}>
                <HStack margin={18}>
                  <HStack itemsCenter justify="flex-start">
                    <HStack justify="flex-start" itemsCenter></HStack>
                    <Text category="h7">{item.nama_fasyankes}</Text>
                  </HStack>
                </HStack>
                <IDivider marginBottom={8} />
                <HStack mh={24}>
                  <VStack>
                    <Text category="subhead" status="placeholder">
                      Tanggal
                    </Text>
                    <Text category="h7">
                      {moment(item.tgl_permohonan).format('LL')}
                    </Text>
                  </VStack>
                  <VStack>
                    <Text category="subhead" status="placeholder">
                      Status
                    </Text>
                    {item.status == 1 ? (
                      <Text category="h7">Terkonfirmasi</Text>
                    ) : item.status == 2 ? (
                      <Text category="h7">Diproses</Text>
                    ) : (
                      <Text category="h7">Selesai</Text>
                    )}
                  </VStack>
                </HStack>

                <IDivider marginHorizontal={24} marginVertical={8} />
                <Text
                  onPress={() => getId(item.id, item.kode_permohonan)}
                  category="h7"
                  status="primary"
                  center
                  marginBottom={16}>
                  Details
                </Text>
              </VStack>
            );
          }}
          ListHeaderComponent={
            <>
              <BoxTotal totalDatas={totalDatas} />
              <Text category="h6" marginTop={24} marginBottom={14}>
                Daftar Permohonan
              </Text>
            </>
          }
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
      <BottomTab />
    </Container>
  );
});

export default Permohonan;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 16,
  },
  smallcoin: {
    width: 16,
    height: 16,
    marginLeft: 12,
  },
  tabBar: {
    marginHorizontal: 16,
  },
});

const DATA = [
  {
    name: 'Nama Fasyankes qwert qweyqwe yqyq',
    logo: 'cardholder',
    change: '28 September 2023',
    price: '$23,579.00',
    status: 'Diproses',
    listCoins: [
      Images.crypto.xsgd,
      Images.crypto.zillacracy,
      Images.crypto.zillet,
      Images.crypto.zilliqa,
    ],
  },
  {
    name: 'Future',
    logo: 'cactus',
    change: '23%',
    price: '$29,579.00',
    listCoins: [Images.crypto.xsgd, Images.crypto.zillacracy],
  },
];

