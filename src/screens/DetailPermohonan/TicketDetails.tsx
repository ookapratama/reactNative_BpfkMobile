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
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  IDivider,
  HStack,
} from 'components';
import _ from 'lodash';

const TicketDetails = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const number_winning = 235111111;
  const list = Array.from(String(number_winning), num => Number(num));
  return (
    <VStack style={styles.container} level="3">
      <VStack>
        <HStack>
          <Text category="h5" marginBottom={4}>
            Total
          </Text>
          {/* <Text category="subhead">Nov 20,2022</Text> */}
          <IDivider marginVertical={16} />
          <Text category="h6" marginBottom={4}>
            Rp. 12.000.000
          </Text>
        </HStack>
        <HStack>
          <VStack>
            <Text category="h7" status="primary" left>
              Daftar Kemampuan
            </Text>
          </VStack>
          <VStack>
            <Text category="h7" status="primary" center>
              Tarif x Jumlah
            </Text>
          </VStack>
          <VStack>
            <Text category="h7" status="primary" right>
              Subtotal
            </Text>
          </VStack>
        </HStack>
        {list.map((item, i) => {
          return (
            <HStack>
              <VStack>
                <Text style={{width: '40%'}} category="h7" left>
                  RUmah Sakit umum Kota Makassar Sulawesi Sleatan
                </Text>
              </VStack>
              <VStack>
                <Text category="h7" center>
                  Rp. 12.000 x 4
                </Text>
              </VStack>
              <VStack>
                <Text category="h7" right>
                  Rp. 48.000
                </Text>
              </VStack>
            </HStack>
          );
        })}

        <IDivider marginVertical={16} />
      </VStack>
    </VStack>
  );
});

export default TicketDetails;

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 12,
  },
  tag: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
