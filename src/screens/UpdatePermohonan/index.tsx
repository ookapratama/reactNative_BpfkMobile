import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Input,
  Icon,
  Button,
  SelectItem,
  Select,
  IndexPath,
  Radio,
  RadioGroup,
  Datepicker,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import {useRoute} from '@react-navigation/native';
import BottomTab from 'screens/BottomTab';
import {goBack, navigate} from 'navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL_API} from '../../../env';
import axios from 'axios';

const UpdatePermohonan = React.memo(() => {
  const [loading, setLoading] = React.useState(true);

  const [maxStep, setMaxStep] = React.useState(0);

  const [opsi, setOpsi] = React.useState([]);

  // cek data alat
  const [cekAlat, setCekAlat] = React.useState(false);

  // cek data update supaya tidak dobel input step
  const [cekUpdate, setCekUpdate] = React.useState(false);

  // value jenis dan alat

  // value ambil option jenis dan alat
  const [jenisAlat, setJenisAlat]: any = React.useState([]);

  const onSelectJenis = (index: any) => {
    console.log('jenis yg dipilih : ', jenisAlat[index].jenis);
    setJenis(jenisAlat[index].jenis);
    setSelectedIndexJenis(index);
  };

  const [jenis, setJenis] = React.useState('');

  // get id detail permohonan
  const route = useRoute();
  const getKode = route.params;

  // get value role
  const [role, setRole]: any = React.useState('');

  const styles = useStyleSheet(themedStyles);

  // show/hide jenis alat (opsional)
  const [showJenis, setShowJenis] = React.useState(false);

  // value date
  const [dateMulai, setDateMulai] = React.useState(new Date());
  const [dateSelesai, setDateSelesai] = React.useState(new Date());
  // cek jika step sudah di step 3
  const [cekDateSelesai, setCekDateSelesai] = React.useState(false);

  // cek input no berita acara jika step = 5
  const [valueBeritaAcara, setValueBeritaAcara] = React.useState('');
  const [cekBeritaAcara, setCekBeritaAcara] = React.useState(false);

  // value keterangan
  const [deskripsi, setDeskripsi] = React.useState('');

  // on change value index di select option
  const [selectedIndexStep, setSelectedIndexStep] = React.useState(
    new IndexPath(0),
  );

  // value index step permohonan
  const [selectedIndexJenis, setSelectedIndexJenis] = React.useState(-1);

  // value deskripsi step permohonan
  const [changeValueStep, setChangeValueStep] = React.useState(
    'Pilih Status Permohonan',
  );
  const [changeIndexStep, setIndexStep] = React.useState(maxStep);

  // data tracking
  const [tracking, setTracking]: any = React.useState<any[]>([]);

  const onUpdate = async (getStep: number) => {
    const token = await AsyncStorage.getItem('token');
    // validasi tiap step di role" yg login
    let indexStep = getStep;

    // data step yg mau dikirim ke api
    const kodeUpdate = getKode;
    const deskripsiUpdate = changeValueStep;
    const keteranganUpdate = deskripsi;
    // const beritaAcara = valueBeritaAcara;

    // cut value date
    const tanggalUpdateMulai = dateMulai;

    const yearMulai = tanggalUpdateMulai.getFullYear();
    const monthMulai = String(tanggalUpdateMulai.getMonth() + 1).padStart(
      2,
      '0',
    );
    const dayMulai = String(tanggalUpdateMulai.getDate()).padStart(2, '0');
    const formattedDateMulai = `${yearMulai}-${monthMulai}-${dayMulai}`;
    const validDateMulai = `${yearMulai}${monthMulai}${dayMulai}`;

    const tanggalUpdateSelesai = dateSelesai;

    const yearSelesai = tanggalUpdateSelesai.getFullYear();
    const monthSelesai = String(tanggalUpdateSelesai.getMonth() + 1).padStart(
      2,
      '0',
    );
    const daySelesai = String(tanggalUpdateSelesai.getDate()).padStart(2, '0');
    const formattedDateSelesai = `${yearSelesai}-${monthSelesai}-${daySelesai}`;
    const validDateSelesai = `${yearSelesai}${monthSelesai}${daySelesai}`;

    let isValid = true;

    // validasi jika update step yang sudah ada
    if (tracking.status != false) {
      // validasi jika ada data yg tidak diisi
      if (
        dateMulai === null ||
        dateSelesai === null ||
        deskripsi === '' ||
        (jenis === '' && changeIndexStep > 2 && changeIndexStep <= 7)
      ) {
        Alert.alert(
          'Warning',
          'Periksa kembali Status, Jenis Layanan, Tanggal, dan Deskripsi',
        );
        isValid = false;
        return;
      }

      // validasi tanggal
      if (
        parseInt(validDateMulai) > parseInt(validDateSelesai) ||
        parseInt(validDateSelesai) < parseInt(validDateMulai)
      ) {
        Alert.alert('Warning', 'Format tanggal tidak valid');
        isValid = false;
        return;
      }

      // validasi tanggal
      if (changeIndexStep == 5 && valueBeritaAcara == '') {
        Alert.alert('Warning', 'No berita acara tidak boleh kosong');
        isValid = false;
        return;
      }
    }

    if (isValid) {
      // validasi value jenis jika di step dibawah ini
      if (changeIndexStep < 3) {
        setJenis('');
        console.log('ini step  1,2,8');
      }
      if (changeIndexStep != 5) setValueBeritaAcara('');

      console.log(
        `kode : ${kodeUpdate}\n deskripsi : ${deskripsiUpdate}\n step : ${changeIndexStep}\n tanggal mulai : ${formattedDateMulai} s.d tanggal selesai : ${formattedDateSelesai} \n jenis : ${jenis}\n keterangan : ${keteranganUpdate} \n no berita acara : ${valueBeritaAcara}`,
      );
      try {
        await axios.post(
          `${BASE_URL_API}/tracking`,
          {
            kode: kodeUpdate,
            step: changeIndexStep,
            deskripsi: deskripsiUpdate,
            tanggal_mulai: formattedDateMulai ?? null,
            tanggal_selesai: formattedDateSelesai ?? null,
            jenis: jenis,
            keterangan: keteranganUpdate,
            no_berita_acara: valueBeritaAcara ?? null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        if (changeIndexStep > 1 && changeIndexStep < 8) {
          if (jenisAlat == null) {
            Alert.alert(
              'Success',
              'Sukses Update Status, Semua alat telah di verifikasi silahkan kembali ke detail',
              [
                {
                  text: 'Kembali ke Detail',
                  onPress: () => {
                    console.log('OK Pressed Detail');
                    goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert(
              'Success',
              'Sukses Update Status, Silahkan Swipe Up untuk Refresh Halaman Detail jika tidak ada perubahan',
              [
                {
                  text: 'Kembali ke Detail',
                  onPress: () => {
                    console.log('OK Pressed Detail');
                    goBack();
                  },
                },
                {
                  text: 'Refresh Halaman Update',
                  onPress: () => {
                    console.log('OK Pressed Update');
                    setSelectedIndexJenis(-1);
                    setJenis('');
                    onRefresh();
                  },
                },
              ],
              {cancelable: false},
            );
          }
        } else {
          Alert.alert(
            'Success',
            'Sukses Update Status, Silahkan Swipe Up untuk Refresh Halaman Detail',
            [
              {
                text: 'OK',
                onPress: () => {
                  console.log('OK Pressed');
                  goBack();
                },
              },
            ],
            {cancelable: false},
          );
        }
      } catch (error) {
        console.log('update status error : ', error);
      }
    }
  };

  // refresh Page
  const [refreshPage, setRefreshPage] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    console.log('refresh page');
    setRefreshPage(true);
    setLoading(false);
    setTimeout(() => {
      setSelectedIndexJenis(-1);
      setJenis('');
      setRefreshPage(false);
    }, 2000);
  }, []);

  // data get step
  React.useEffect(() => {
    const selectedValue = [
      '',
      'Step 1 : Proposal',
      'Step 2 : Pertujuan Biaya',
      'Step 3 : Jadwal Kunjungan',
      'Step 4 : Pelaksanaan Pengujian/Kalibrasi',
      'Step 5 : Pembuatan Laporan',
      'Step 6 : Penerbitan Sertifikat',
      'Step 7 : Pengiriman Sertifikat',
      'Step 8 : Selesai',
    ];

    const dataDeskripsi = [
      'BPFK Makassar telah mengirimkan proposal penawaran biaya kepada pelanggan (via email/whatsapp)',
      'BPFK Makassar telah menerima surat persetujuan biaya dari pelanggan (via email/whatsapp)',
      'BPFK Makassar telah menetapkan jadwal kunjungan ke lokasi pelanggan untuk pengujian/kalibrasi',
      'BPFK Makassar telah melaksanakan pengujian/kalibrasi di lokasi pelanggan',
      'BPFK Makassar telah membuat laporan hasil pengujian/kalibrasi',
      'BPFK Makassar telah menerbitkan sertifikat hasil pengujian/kalibrasi',
      'BPFK Makassar telah menngirimkan sertifikat hasil pengujian/kalibrasi kepada pelanggan (via email/whatsapp)',
    ];

    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      let step = 0;
      if (changeIndexStep > maxStep) step = changeIndexStep;
      else {
        if (maxStep == 8) step = maxStep - 1;
        else step = maxStep;
      }

      try {
        const response = await axios.get(
          `${BASE_URL_API}/get-step?kode=${getKode}&step=${step}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );


        // set value kosong jika step bukan 5
        if (changeIndexStep != 5) setValueBeritaAcara('');

        // validasi jika step 3 tampilkan 2 input date
        if (changeIndexStep == 3 || changeIndexStep == 4)
          setCekDateSelesai(true);
        else setCekDateSelesai(false);

        // validasi jika step 5, tampilkan no berita acara
        if (changeIndexStep == 5) setCekBeritaAcara(true);
        else setCekBeritaAcara(false);

        // validasi button update tiap step
        if (
          (changeIndexStep >= 3 && changeIndexStep <= 7) ||
          response.data.optJenis != null
        ) {
          console.log(
            'Anda masih memiliki kesempatan untuk menginput data alat.',
          );
          setCekUpdate(true);
        }
        // jika step yg dipilih sama dgn step saat ini
        if (changeValueStep == 'Pilih Status Permohonan') {
          console.log('step yang dipilih sama atau anda belum memilih step');
          setCekUpdate(false);
        }
        // jika step yg dipilih lebih besar dari step saat ini
        else if (step > maxStep + 1) {
          setCekUpdate(false);
        } else {
          setCekUpdate(true);
        }

        // ambil opsi step
        setOpsi(response.data.data ?? []);

        if (response.data.optJenis == null) setJenisAlat([]);
        else setJenisAlat(response.data.optJenis);

        // validasi opsi jenis
        if (changeIndexStep > 2 && changeIndexStep < 8) {
          setShowJenis(true);
          if (response.data.optJenis == null) {
            setCekAlat(true);
            setCekUpdate(false);
          } else setCekAlat(false);
        } else setShowJenis(false);
        setDeskripsi(dataDeskripsi[changeIndexStep - 1]);

        setLoading(false);
      } catch (error) {
        console.log('error getStep : ', error);
      }
    }, 0);
  }, [changeIndexStep, refreshPage]);

  // data tracking
  const getTracking = async (token: any) => {
    try {
      const kode_permohonan = getKode;
      const response = await axios.get(
        `${BASE_URL_API}/tracking/${kode_permohonan}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const resTracking =
        response.data.row == undefined ? response.data : response.data.row;
      const getTracking = resTracking.step;
      // console.log('data tracking : ', resTracking.step[4]);
      let maxStep = 0;

      for (let i = 1; i <= 8; i++) {
        if (getTracking[i].length != 0) {
          maxStep = i;
          console.log('step : ', getTracking[i][0].step);
        }
      }

      if (maxStep !== null) {
        setMaxStep(maxStep);
      } else setMaxStep(maxStep);
      setLoading(false);
      setTracking(resTracking.step);
    } catch (error) {
      console.log('Error tracking : ', error);
    }
  };

  const getRole = async () => {
    try {
      const getRole = await AsyncStorage.getItem('role');
      const getToken = await AsyncStorage.getItem('token');
      getTracking(getToken);
      setRole(getRole);
      setLoading(false);
    } catch (error) {
      console.log('get role error message : ', error);
    }
  };

  React.useEffect(() => {
    // getValueJenis(selectedIndexJenis);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    getRole();
    return () => clearTimeout(timeout);
    // setLoading(false);
  }, [changeIndexStep, refreshPage, selectedIndexJenis]);

  return (
    <Container style={styles.container} level="2">
      {loading ? (
        <>
          {onRefresh()}
          <ActivityIndicator size="large" color="#0000ff" />
        </>
      ) : (
        <>
          <TopNavigation
            appearance="control"
            title={'Update Status'}
            accessoryLeft={<NavigationAction status="primary" />}
          />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshPage} onRefresh={onRefresh} />
            }>
            <Content>
              <VStack mh={24}>
                <Text marginBottom={16} category="h6" status="platinum">
                  Status Permohonan
                </Text>
                <Select
                  value={changeValueStep}
                  onSelect={index => {
                    const selectItem = opsi[index.row];
                    console.log('Selected index:', index.row);
                    if (selectItem) {
                      // console.log('Selected ID:', selectItem.id);
                      // console.log('Selected Name:', selectItem.name);
                      setChangeValueStep(selectItem.name);
                      setIndexStep(selectItem.id);
                    }
                  }}
                  status="basic"
                  size="large"
                  style={styles.select}>
                  {opsi.map((item: any) => (
                    <SelectItem key={item.id} title={item.name} />
                  ))}
                </Select>
              </VStack>
              {showJenis ? (
                <>
                  <VStack mh={24}>
                    <Text marginVertical={16} category="h6" status="platinum">
                      Jenis Layanan
                    </Text>
                    {cekAlat ? (
                      <>
                        {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                        <Text>Layanan tidak tersedia</Text>
                      </>
                    ) : (
                      <>
                        <RadioGroup
                          selectedIndex={selectedIndexJenis}
                          onChange={index => onSelectJenis(index)}>
                          {jenisAlat.map((item: any) => (
                            <Radio>{item.jenis}</Radio>
                          ))}
                        </RadioGroup>
                      </>
                    )}
                  </VStack>
                </>
              ) : (
                <></>
              )}

              {cekDateSelesai ? (
                <HStack>
                  <VStack ml={24}>
                    <Text marginVertical={16} category="h6" status="platinum">
                      Tanggal Mulai
                    </Text>
                    <Datepicker
                      style={myStyle.picker}
                      placeholder="Pick Date"
                      date={dateMulai}
                      onSelect={nextDate => setDateMulai(nextDate)}
                      accessoryRight={<Icon name="calendar" />}
                    />
                  </VStack>
                  <VStack mr={24}>
                    <Text marginVertical={16} category="h6" status="platinum">
                      Tanggal Selesai
                    </Text>
                    <Datepicker
                      style={myStyle.picker}
                      placeholder="Pick Date"
                      date={dateSelesai}
                      onSelect={nextDate => setDateSelesai(nextDate)}
                      accessoryRight={<Icon name="calendar" />}
                    />
                  </VStack>
                </HStack>
              ) : (
                <VStack mh={24}>
                  <Text marginVertical={16} category="h6" status="platinum">
                    Tanggal Selesai
                  </Text>
                  <Datepicker
                    style={myStyle.picker}
                    placeholder="Pick Date"
                    date={dateSelesai}
                    onSelect={nextDate => setDateSelesai(nextDate)}
                    accessoryRight={<Icon name="calendar" />}
                  />
                </VStack>
              )}

              {cekBeritaAcara ? (
                <VStack mh={24}>
                  <Text marginVertical={16} category="h6" status="platinum">
                    Nomor Berita Acara
                  </Text>
                  <Input
                    onChangeText={text => setValueBeritaAcara(text)}
                    value={valueBeritaAcara}
                    placeholder="ex: 124/.../..../BPFK"
                  />
                </VStack>
              ) : (
                <></>
              )}

              <VStack mh={24}>
                <Text marginVertical={16} category="h6" status="platinum">
                  Deskripsi
                </Text>
                <Input
                  onChangeText={text => setDeskripsi(text)}
                  value={deskripsi}
                  multiline={true}
                  placeholder="Deskripsi Status"
                />
              </VStack>
              {cekUpdate ? (
                <Button
                  children={'Tandai Selesai'}
                  onPress={() => onUpdate(selectedIndexStep.row + 1)}
                  style={styles.button}
                />
              ) : (
                <Button
                  children={'Kembali ke Detail'}
                  onPress={() => navigate('DetailPermohonan')}
                  style={styles.button}
                  status="transparent-primary"
                />
              )}
            </Content>
          </ScrollView>

          <BottomTab />
        </>
      )}
    </Container>
  );
});

export default UpdatePermohonan;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
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
    marginHorizontal: 24,
    marginVertical: 18,
  },
  select: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'background-basic-color-4',
    borderRadius: 8,
  },
});

const myStyle = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
  },
  picker: {
    margin: 2,
  },
});
