import * as React from 'react';
import {Image} from 'react-native';
import {
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
  HStack,
  VStack,
  IDivider,
} from 'components';
import Card from './Card';
import Chart from './Chart';
import Images from 'assets/images';
import BottomTab from '../Crypto05/BottomTab';

const Crypto07 = React.memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <Text category="h6" marginLeft={12} children={'Overview'} />
        }
        accessoryRight={
          <HStack>
            <NavigationAction icon="bell" status="primary" />
            <NavigationAction icon="setting" status="primary" />
          </HStack>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Card />
        <Chart
          data1Day={DATA}
          data7Day={DATA_7_DAY}
          data1Month={DATA_1_MONTH}
          data3Month={DATA_3_MONTH}
          dataAll={[]}
          strokeColor={theme['background-basic-color-12']}
        />
        <Text category="h6" marginTop={24} marginBottom={16}>
          Your Asset
        </Text>
        <VStack style={styles.assetContainer} padding={16} border={12}>
          {ASSETS.map((item, i) => {
            return (
              <VStack key={i}>
                <HStack mb={16} itemsCenter>
                  <HStack justify="flex-start" itemsCenter>
                    <Image source={item.icon} />
                    <VStack ml={8}>
                      <Text category="h7">{item.name}</Text>
                      <Text category="c2" status="platinum">
                        {item.describe}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack>
                    <Text category="subhead">{item.price}</Text>
                    <Text category="c2" status="placeholder" right>
                      {item.owner}
                    </Text>
                  </VStack>
                </HStack>
                {i < ASSETS.length - 1 && <IDivider marginBottom={16} />}
              </VStack>
            );
          })}
        </VStack>
      </Content>
      <BottomTab level="3" />
    </Container>
  );
});

export default Crypto07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  assetContainer: {
    borderWidth: 1,
    borderColor: 'background-basic-color-3',
  },
});

const ASSETS = [
  {
    icon: Images.crypto.bitcoin,
    name: 'Bitcoin',
    describe: 'BTC',
    price: '$67,964.00',
    owner: '~1,089BTC',
  },
  {
    icon: Images.crypto.bitcoin,
    name: 'Bitcoin',
    describe: 'BTC',
    price: '$67,964.00',
    owner: '~1,089BTC',
  },
];
export const DATA = [
  {x: 1.1, y: 120},
  {x: 1.2, y: 115},
  {x: 1.5, y: 90},
  {x: 2, y: 120},
  {x: 2.6, y: 80},
  {x: 3, y: 100},
  {x: 3.1, y: 90},
  {x: 3.2, y: 52},
  {x: 3.5, y: 92},
  {x: 3.8, y: 102},
  {x: 4.4, y: 52},
  {x: 4.8, y: 60},
  {x: 5.2, y: 60},
  {x: 5.3, y: 50},
  {x: 5.6, y: 55},
  {x: 6, y: 55},
];
export const DATA_7_DAY = [
  {x: 1.1, y: 120},
  {x: 1.2, y: 115},
  {x: 1.5, y: 90},
  {x: 2, y: 120},
  {x: 2.6, y: 80},
  {x: 3, y: 100},
  {x: 3.1, y: 90},
  {x: 3.2, y: 52},
  {x: 3.5, y: 92},
  {x: 3.8, y: 102},
  {x: 4.4, y: 52},
  {x: 4.8, y: 60},
  {x: 5.2, y: 60},
  {x: 5.3, y: 50},
  {x: 6.1, y: 120},
  {x: 7.2, y: 115},
  {x: 8.5, y: 90},
  {x: 9, y: 120},
  {x: 10.6, y: 80},
  {x: 11, y: 100},
  {x: 12, y: 90},
];
export const DATA_1_MONTH = [
  {x: 1.1, y: 120},
  {x: 1.2, y: 115},
  {x: 1.5, y: 90},
  {x: 2, y: 120},
  {x: 2.6, y: 80},
  {x: 3, y: 100},
  {x: 3.1, y: 90},
  {x: 3.2, y: 52},
  {x: 3.5, y: 92},
  {x: 3.8, y: 102},
  {x: 4.4, y: 52},
  {x: 4.8, y: 60},
  {x: 5.2, y: 60},
  {x: 5.3, y: 50},
  {x: 6.1, y: 120},
  {x: 7.2, y: 115},
  {x: 8.5, y: 90},
  {x: 9, y: 120},
  {x: 10.6, y: 80},
  {x: 11, y: 100},
  {x: 12, y: 90},
  {x: 13, y: 60},
  {x: 14, y: 60},
  {x: 15, y: 50},
  {x: 16.1, y: 120},
  {x: 17.2, y: 115},
  {x: 18.5, y: 90},
  {x: 19, y: 120},
  {x: 20.6, y: 80},
  {x: 21, y: 100},
  {x: 22, y: 90},
];
export const DATA_3_MONTH = [
  {x: 1.1, y: 120},
  {x: 1.2, y: 115},
  {x: 1.5, y: 90},
  {x: 2, y: 120},
  {x: 2.6, y: 80},
  {x: 3, y: 100},
  {x: 3.1, y: 90},
  {x: 3.2, y: 52},
  {x: 3.5, y: 92},
  {x: 3.8, y: 102},
  {x: 4.4, y: 52},
  {x: 4.8, y: 60},
  {x: 5.2, y: 60},
  {x: 5.3, y: 50},
  {x: 6.1, y: 120},
  {x: 7.2, y: 115},
  {x: 8.5, y: 90},
  {x: 9, y: 120},
  {x: 10.6, y: 80},
  {x: 11, y: 100},
  {x: 12, y: 90},
  {x: 13, y: 60},
  {x: 14, y: 60},
  {x: 15, y: 50},
  {x: 16.1, y: 120},
  {x: 17.2, y: 115},
  {x: 18.5, y: 90},
  {x: 19, y: 120},
  {x: 20.6, y: 80},
  {x: 21, y: 100},
  {x: 22, y: 100},
  {x: 23, y: 100},
  {x: 23.1, y: 90},
  {x: 23.2, y: 52},
  {x: 23.5, y: 92},
  {x: 23.8, y: 102},
  {x: 24.4, y: 52},
  {x: 24.8, y: 60},
  {x: 25.2, y: 60},
  {x: 25.3, y: 50},
  {x: 26.1, y: 120},
  {x: 27.2, y: 115},
  {x: 28.5, y: 90},
  {x: 29, y: 120},
  {x: 30.6, y: 80},
];
