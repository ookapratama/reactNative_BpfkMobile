import * as React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
} from '@ui-kitten/components';

import {
  Container,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import BottomTab from 'screens/BottomTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import axios from 'axios';
import {useRoute} from '@react-navigation/native';
import ProgressStep from '@joaosousa/react-native-progress-steps';

const Tracking = React.memo(() => {
  const [maxStep, setMaxStep] = React.useState(0);

  const {top} = useLayout();
  const styles = useStyleSheet(themedStyles);

  // get role by login
  const [role, setRole]: any = React.useState('');

  // data permohonan per id
  const [datas, setDatas]: any = React.useState<any[]>([]);

  // untuk loading data
  const [loading, setLoading] = React.useState(true);

  // untuk kode permohonan
  const [kodePermohonan, setKodePermohonan] = React.useState('');

  // data tracking
  const [tracking, setTracking]: any = React.useState<any[]>([]);
  let trackingName = 'Status belum terupdate';
  // setPosisi(maxStep);

  const trackingStep = tracking && tracking.step;

  const steps = [];
  if (trackingStep) {
    trackingName = tracking.name;
    const valueStep = [
      'Step 1 : Proposal',
      'Step 2 : Pertujuan Biaya',
      'Step 3 : Jadwal Kunjungan',
      'Step 4 : Pelaksanaan Pengujian/Kalibrasi',
      'Step 5 : Pembuatan Laporan',
      'Step 6 : Penerbitan Sertifikat',
      'Step 7 : Pengiriman Sertifikat',
      'Step 8 : Selesai',
    ];
    for (let i = 1; i <= 8; i++) {
      const cekDataStep = trackingStep[i][0];
      const dataJenis = trackingStep[i];
      const step5 = trackingStep[5];
      const step6 = trackingStep[6];

      const step5NoBeritaAcara = step5.map(step5Item => {
        const cekItemStep6 = step6.find(
          step6Item =>
            step6Item.kode === step5Item.kode &&
            step6Item.jenis === step5Item.jenis,
        );
        if (cekItemStep6) {
          cekItemStep6.no_berita_acara = step5Item.no_berita_acara;
        }
      });
      const data = () => {
        return (
          <Text category="h8">
            {dataJenis.map(
              item =>
                `\u25CF  ${item.jenis} \n    ${item.tanggal_mulai} s.d ${
                  item.tanggal_selesai
                } \n ${i == 6 ? `   No. BA: ${item.no_berita_acara}\n` : ''} \n`,
            )}
          </Text>
        );
      };

      const isiStep = {
        title: (
          <Text marginHorizontal={10} category="h7" marginTop={10}>
            {cekDataStep ? cekDataStep.deskripsi : valueStep[i - 1]}
          </Text>
        ),
        content: (
          <Text marginHorizontal={10} category="h8" marginTop={6} marginBottom={20}>
            {cekDataStep && (i < 3 || i == 8) ? `${cekDataStep.tanggal_selesai}` : ''}
            {i > 2 && i < 8 && data()}
          </Text>
        ),
      };
      steps.push(isiStep);
    }
  }

  // step default
  const stepsDefault = [
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 1 : Proposal
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 2 : Pertujuan Biaya
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 3 : Jadwal Kunjungan
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 4 : Pelaksanaan Pengujian/Kalibrasi
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 5 : Pembuatan Laporan
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 6 : Penerbitan Sertifikat
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 7 : Pengiriman Sertifikat
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7" marginBottom={20}>
          Tanggal belum ada
        </Text>
      ),
    },
    {
      title: (
        <Text marginHorizontal={10} category="h7" marginTop={10}>
          Step 8 : Selesai
        </Text>
      ),
      content: (
        <Text marginHorizontal={10} category="h7">
          Tanggal belum ada
        </Text>
      ),
    },
  ];

  // console.log('labels : ', labels);

  let statusRole = false;
  // jika login SU
  if (role == 'SU') statusRole = true;
  // jika login A4 dan sudah di step 5 6
  else if (role == 'A4' && maxStep == 8) statusRole = false;
  else if (role == 'A4' && (maxStep == 7 || maxStep == 8)) statusRole = true;
  // jika login A3 dan sudah di step 5 6
  else if (role == 'A3' && maxStep == 6) statusRole = false;
  else if (role == 'A3' && maxStep == 5 && maxStep == 6) statusRole = true;
  // jika login A2 dan sudah di step 2 3 4
  else if (role == 'A2' && maxStep == 4) statusRole = false;
  else if (role == 'A2' && (maxStep == 2 || maxStep == 3)) statusRole = true;
  // jika login A1 dan sudah di step 1
  else if (role == 'A1' && maxStep == 1) statusRole = true;
  // console.log(statusRole);

  // get id dari permohonan
  const route = useRoute();
  const params_kode: any = route.params;
  console.log('Received params_id:', params_kode);

  // data permohonan
  const fetchData = async (token: any) => {
    try {
      const response = await axios.get(
        `${BASE_URL_API}/permohonan/${params_kode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const res = response.data.row;
      setDatas(res);
      setKodePermohonan(params_kode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Error data permohonan : ', error);
    }
  };

  // data tracking
  const getTracking = async (token: any) => {
    try {
      const kode_permohonan = params_kode;
      const response = await axios.get(
        `${BASE_URL_API}/tracking/${kode_permohonan}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const resTracking = response.data.row;
      setTracking(resTracking);
      let maxStep = 0;
      const getTracking = resTracking.step;
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
      console.log('Error data item : ', error);
    }
  };

  React.useEffect(() => {
    const getTokenAndId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const getRole = await AsyncStorage.getItem('role');
        // console.log(token);
        await fetchData(token);
        // await fetchDataItem(token);
        await setRole(getRole);
        await getTracking(token);

        setLoading(false);
      } catch (error) {
        console.log('error  : ', error);
      }
    };
    getTokenAndId();
  }, [kodePermohonan]);

  return (
    <Container style={styles.container} useSafeArea={false}>
      <VStack level="2" style={[styles.header, {paddingTop: top + 4}]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction status="primary" />}
        />
        <Text category="h3" marginLeft={20} marginBottom={8}>
          Tracking
        </Text>
      </VStack>
      <Container style={styles.progres}>
        <HStack>
          <Text marginBottom={18} marginTop={-35} category="h5">
            {trackingName}
          </Text>
        </HStack>
        <HStack mb={20} ml={-5}>
          <HStack>
            <TouchableOpacity
              style={[styles.circleStatusSukses, styles.circleStatus]}
            />
            <Text marginTop={2} category="label">
              {' '}
              : Selesai
            </Text>
          </HStack>
          <HStack>
            <TouchableOpacity
              style={[styles.circleStatusProses, styles.circleStatus]}
            />
            <Text marginTop={2} category="label">
              {' '}
              : Sedang Diproses
            </Text>
          </HStack>
          <HStack mr={20}>
            <TouchableOpacity
              style={[styles.circleStatusBelumProses, styles.circleStatus]}
            />
            <Text marginTop={2} category="label">
              {' '}
              : Belum Diproses
            </Text>
          </HStack>
        </HStack>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ProgressStep
              currentStep={maxStep}
              orientation="vertical"
              colors={{
                title: {
                  text: {
                    normal: '#4e4f4f',
                    active: '#000',
                    completed: '#000',
                  },
                },
                marker: {
                  text: {
                    normal: '#005f73',
                    active: '#005f73',
                    completed: '#fff',
                  },
                  line: {
                    normal: '#a1a5b7',
                    active: '#50cd89',
                    completed: '#ffc700',
                  },
                },
              }}
              // steps={stepsDefault}
              steps={trackingStep ? steps : stepsDefault}
            />
          )}
        </ScrollView>
      </Container>
      <BottomTab />
    </Container>
  );
});

export default Tracking;

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
    marginBottom: 24,
  },
  progres: {
    marginLeft: 30,
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
  StepIndicator: {
    padding: 24,
  },
  circleStatus: {
    borderRadius: 50,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleStatusSukses: {
    backgroundColor: '#50cd89',
  },
  circleStatusProses: {
    backgroundColor: '#ffc700',
  },
  circleStatusBelumProses: {
    backgroundColor: '#a1a5b7',
  },
});
