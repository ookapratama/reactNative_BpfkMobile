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

  const number_winning = 23547;
  const list = Array.from(String(number_winning), num => Number(num));
  return (
    <VStack style={styles.container} level="1">
      <VStack>
        <Text category="h6" marginBottom={4}>
          Round #712
        </Text>
        <Text category="subhead">Nov 20,2022</Text>
        <IDivider marginVertical={16} />
        <Text category="h6" marginBottom={4}>
          Wining number
        </Text>
        <HStack mt={16}>
          {list.map((item, i) => {
            const colors = [
              '#00CD50',
              '#C06363',
              '#0F4C81',
              '#FFA26B',
              '#5C6BB2',
              '#CE8ABC',
            ];
            let colours = _.shuffle(colors);
            const color = colours.pop();
            return (
              <VStack style={{backgroundColor: color, ...styles.tag}} key={i}>
                <Text category='h7' status='white' center>{item}</Text>
              </VStack>
            );
          })}
        </HStack>
        <IDivider marginVertical={16}/>
      </VStack>
      <Text category='h6' marginBottom={4}>Winning address</Text>
      <Text category='subhead'>0x136...718e4</Text>
    </VStack>
  );
});

export default TicketDetails;

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    marginHorizontal: 16,
    marginTop: 20,
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
