import * as React from 'react';
import {
  FlatList,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
} from '@ui-kitten/components';

import {Container, Text, NavigationAction, VStack, HStack} from 'components';
import keyExtractor from 'utils/keyExtractor';
import BottomTab from 'screens/BottomTab';
import {navigate} from 'navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import axios from 'axios';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';

const DetailPermohonan = React.memo(() => {
  const {top} = useLayout();
  const styles = useStyleSheet(themedStyles);

  // get role by login
  const [role, setRole]: any = React.useState('');

  // data permohonan per id
  const [datas, setDatas]: any = React.useState<any[]>([]);

  // data items dari permohnonan
  const [items, setItems] = React.useState<any[]>([]);

  // untuk loading data
  const [loading, setLoading] = React.useState(true);

  // untuk kode permohonan
  const [kodePermohonan, setKodePermohonan] = React.useState('');

  // refresh state
  const [refresh, setRefresh] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    const kode = kodePermohonan;
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, [kodePermohonan]);

  // data tracking
  const [tracking, setTracking]: any = React.useState<any[]>([]);

  const [maxStep, setMaxStep] = React.useState(0);

  // validasi user bisa update atau tidak
  let statusRole = false;
  // jika login SU
  if (role == 'SU' && maxStep < 7) statusRole = true;
  // jika login A4 dan sudah di step 5 6
  else if (role == 'A5' && maxStep == 6) statusRole = true;
  else if (role == 'A4' && maxStep == 5) statusRole = true;
  // jika login A3 dan sudah di step 5 6
  else if (role == 'A3' && (maxStep == 4 || maxStep == 5)) statusRole = true;
  // jika login A2 dan sudah di step 2 3 4
  else if (
    role == 'A2' &&
    (maxStep == 2 || maxStep == 3 || maxStep == 4 || maxStep == 1)
  )
    statusRole = true;
  // jika login A1 dan sudah di step 1
  else if (role == 'A1' && maxStep == 0) statusRole = true;

  // get id dari permohonan
  const route = useRoute();
  const params_id = route.params;
  console.log('Received params_id:', params_id);

  // formatting to rupiah
  const formatToRupiah = (number: number) => {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });

    return formatter.format(number);
  };

  // data permohonan
  const fetchData = async (token: any, params: any) => {
    // console.log('getId data permohonan: ', params_id);
    try {
      const response = await axios.get(`${BASE_URL_API}/permohonan/${params}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const res = response.data.row;
      setDatas(res);
      setKodePermohonan(res.kode_permohonan);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error data permohonan : ', error);
    }
  };

  // data item
  const fetchDataItem = async (token: any) => {
    try {
      const kode_permohonan = kodePermohonan;
      const response = await axios.get(
        `${BASE_URL_API}/permohonan/detail/${kode_permohonan}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const resItem = response.data.row;
      setItems(resItem);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error data item : ', error);
    }
  };

  // data tracking
  const getTracking = async (token: any) => {
    try {
      const kode_permohonan = kodePermohonan;
      // console.log(kode_permohonan);
      const response = await axios.get(
        `${BASE_URL_API}/tracking/${kode_permohonan}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const resTracking = response.data;
      setTracking(resTracking);

      let maxStep = 0;
      const getTracking = resTracking.row.step;
      console.log('res : ', getTracking[1][0].step);
      for (let i = 1; i <= 8; i++) {
        if (getTracking[i].length != 0) {
          maxStep = i;
        }
      }

      if (maxStep !== null) {
        setMaxStep(maxStep);
      } else setMaxStep(maxStep);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error data tracking : ', error);
    }
  };

  React.useEffect(() => {
    // setLoading
    const getTokenAndId = async () => {
      try {
        const params_id = route.params;
        const token = await AsyncStorage.getItem('token');
        const getRole = await AsyncStorage.getItem('role');
        const getId = await AsyncStorage.getItem('id');

        await fetchData(token, getId);
        await fetchDataItem(token);
        await setRole(getRole);
        await getTracking(token);

        setLoading(false);
      } catch (error) {
        console.log('error  : ', error);
      }
    };
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    getTokenAndId();
    return () => clearTimeout(timeout);
  }, [kodePermohonan, refresh]);

  return (
    <Container style={styles.container} useSafeArea={false}>
      {loading ? (
        <VStack mt={300} justify="center">
          <ActivityIndicator size="large" color="#0000ff" />
        </VStack>
      ) : (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
            }>
            <VStack level="2" style={[styles.header, {paddingTop: top + 4}]}>
              <TopNavigation
                appearance="control"
                accessoryLeft={<NavigationAction status="primary" />}
              />
              <Text category="h3" marginLeft={20} marginBottom={8}>
                Detail Permohonan
              </Text>
              
            </VStack>

            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <VStack border={12} level="1" mh={24} mt={24} padding={16}>
                <HStack itemsCenter mb={12}>
                  <Text category="h6">{datas.nama_fasyankes}</Text>
                </HStack>
                <HStack itemsCenter>
                  <VStack>
                    <Text category="c1" status="platinum">
                      ID Pengajuan
                    </Text>
                    <Text category="h8">{datas.kode_permohonan}</Text>
                  </VStack>
                  <VStack>
                    <Text category="c1" right status="platinum">
                      Tanggal
                    </Text>
                    <Text right category="h8">
                      {moment(datas.tgl_permohonan).format('LL')}
                    </Text>
                  </VStack>
                </HStack>

                <HStack itemsCenter mv={12}>
                  <VStack>
                    <Text category="c1" status="platinum">
                      Nama Pemohon
                    </Text>
                    <Text category="h8" maxWidth={150}>
                      {datas.nama_pemohon} ({datas.no_whatsapp})
                    </Text>
                  </VStack>
                  <VStack>
                    <Text right category="c1" status="platinum">
                      Status
                    </Text>
                    {maxStep == 0 || tracking.status == false ? (
                      <Text right category="h8">
                        Diproses
                      </Text>
                    ) : maxStep == 1 ? (
                      <Text right category="h8">
                        Step 1 : Proposal
                      </Text>
                    ) : maxStep == 2 ? (
                      <Text right category="h8" maxWidth={160}>
                        Step 2 : Persetujuan Biaya
                      </Text>
                    ) : maxStep == 3 ? (
                      <Text right category="h8" maxWidth={160}>
                        Step 3 : Jadwal Kunjungan
                      </Text>
                    ) : maxStep == 4 ? (
                      <Text right category="h8" maxWidth={160}>
                        Step 4 : Pelaksanaan Pengujian/Kalibrasi
                      </Text>
                    ) : maxStep == 5 ? (
                      <Text right category="h8" maxWidth={160}>
                        Step 5 : Pembuatan Laporan
                      </Text>
                    ) : maxStep == 6 ? (
                      <Text right category="h8" maxWidth={160}>
                        Step 6 : Penerbitan Sertifikat
                      </Text>
                    ) : maxStep == 7 ? (
                      <Text right category="h8" maxWidth={160}>
                        Step 7 : Pengiriman Sertifikat
                      </Text>
                    ) : maxStep == 8 ? (
                      <Text right category="h8">
                        Selesai
                      </Text>
                    ) : (
                      <Text right category="h8">
                        Diproses
                      </Text>
                    )}
                  </VStack>
                </HStack>
                <HStack>
                  <VStack>
                    <Text category="c1" status="platinum">
                      Total Item
                    </Text>
                    <Text category="h8">{items ? items.length : 0}</Text>
                  </VStack>
                  <VStack>
                    <Text category="c1" right marginBottom={4}>
                      Total Harga
                    </Text>
                    <Text category="h8" right marginBottom={4}>
                      {formatToRupiah(datas.total_biaya)}
                    </Text>
                  </VStack>
                </HStack>

                <HStack justify='center'>
                  <HStack itemsCenter justify="center">
                    <Button
                      style={[{marginHorizontal: 10}, {marginVertical: 14}]}
                      children={'View Tracking'}
                      onPress={() => {
                        navigate({name: 'Tracking', params: kodePermohonan});
                      }}
                    />
                  </HStack>
                  {statusRole ? (
                    <HStack itemsCenter justify="center">
                      <Button
                        style={[{marginHorizontal: 10}, {marginVertical: 14}]}
                        children={'Update'}
                        onPress={() => {
                          navigate({
                            name: 'UpdatePermohonan',
                            params: datas.kode_permohonan,
                          });
                        }}
                      />
                    </HStack>
                  ) : (
                    <></>
                  )}
                </HStack>
              </VStack>
            )}

            <FlatList
              data={items}
              renderItem={({item}) => {
                return (
                  <HStack mb={8} level="2" mh={12} padding={16} border={12}>
                    <HStack itemsCenter>
                      <Text maxWidth={220} category="callout" marginBottom={4}>
                        {item.jenis ?? 'Tidak ada'}
                      </Text>
                    </HStack>
                    <VStack>
                      <Text category="s1" right>
                        {item.jumlah} x {item.tarif}
                      </Text>
                      <HStack justify="flex-end" mt={4}>
                        <Text category="callout" right>
                          {formatToRupiah(item.total)}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>
                );
              }}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.content}
              ListHeaderComponent={
                <>
                  <HStack mh={14} level="1">
                    <Text category="h4" marginBottom={14}>
                      Daftar Item
                    </Text>
                  </HStack>
                </>
              }
            />
          </ScrollView>

          <BottomTab />
        </>
      )}
    </Container>
  );
});

export default DetailPermohonan;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  bnb: {
    width: 16,
    height: 16,
  },
  buttonHeader: {
    backgroundColor: 'background-basic-color-1',
  },
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  select: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'background-basic-color-3',
    borderRadius: 16,
    marginRight: 16,
  },
  search: {
    flex: 1,
    borderRadius: 12,
  },
  item: {
    borderWidth: 1,
    borderColor: 'background-basic-color-3',
    borderRadius: 12,
  },
  content: {
    paddingTop: 24,
  },
  caretDown: {
    tintColor: 'background-basic-color-5',
    width: 16,
    height: 16,
    marginLeft: 6,
  },
});
