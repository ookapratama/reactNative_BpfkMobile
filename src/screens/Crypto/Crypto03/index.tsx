import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
  IDivider,
} from 'components';
import Images from 'assets/images';
import Tab from '../Crypto01/Tab';
import BottomTab from './BottomTab';

interface IButtonProps {
  onPress?(): void;
  title: string;
  icon: string;
  level: string;
}

const Crypto03 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const IButton = ({onPress, title, icon, level}: IButtonProps) => {
    return (
      <VStack itemsCenter onPress={onPress} minWidth={104 * (width / 375)}>
        <VStack>
          <Icon pack="assets" name={icon} style={styles.iconButton} />
          <Image
            source={Images.shape}
            style={{
              tintColor: theme[`background-basic-color-${level}`],
              zIndex: -10,
            }}
          />
        </VStack>
        <Text>{title}</Text>
      </VStack>
    );
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={<NavigationAction status="primary" icon="share" />}
        accessoryLeft={
          <Image
            source={Images.logo}
            //@ts-ignore
            style={styles.logo}
          />
        }
      />
      <Text category="h4" marginLeft={16}>
        Manage accounts
      </Text>
      <Content>
        <VStack level="5" padding={16} mh={16} border={12} mt={16}>
          <HStack itemsCenter mb={12}>
            <Text status="white">Your net worth:</Text>
            <HStack itemsCenter>
              <Icon pack="assets" name="eye" style={styles.icon} />
              <Icon pack="assets" name="info" style={styles.icon} />
            </HStack>
          </HStack>
          <Text category="h3" status="white" marginBottom={14}>
            $100,246.31
            <Text category="h7" status="white">
              {' '}
              +12%
            </Text>
          </Text>
          <HStack justify="flex-start">
            {LIST_COIN.map((item, i) => {
              return (
                <Image
                  source={item}
                  key={i}
                  //@ts-ignore
                  style={styles.coin}
                />
              );
            })}
          </HStack>
        </VStack>
        <HStack mh={16} mt={24}>
          <IButton title={'Desposit'} icon={'plus'} level="7" />
          <IButton title={'Withdraw'} icon={'arrow_down'} level="8" />
          <IButton title={'Tranfer'} icon={'arrow_upright'} level="5" />
        </HStack>
        <Text category="h6" marginLeft={16} marginTop={32} marginBottom={16}>
          Portfolios
        </Text>
        <VStack mh={16}>
          {TAB.map((item, i) => {
            return (
              <VStack key={i} mb={16}>
                <HStack mb={16}>
                  <HStack justify="flex-start" itemsCenter>
                    <Image source={item.image} />
                    <VStack ml={8}>
                      <Text category="h7">{item.name}</Text>
                      <Text category="c2" status="placeholder">
                        {item.describe}
                      </Text>
                    </VStack>
                  </HStack>
                  <VStack>
                    <Text category="subhead">${item.price}</Text>
                    <Text
                      category="c2"
                      status={item.change > 0 ? 'success' : 'danger'}>
                      {item.change > 0 ? '+' : '-'}
                      {item.change}%
                    </Text>
                  </VStack>
                </HStack>
                {i < TAB.length - 1 && <IDivider />}
              </VStack>
            );
          })}
        </VStack>
      </Content>
      <BottomTab />
    </Container>
  );
});

export default Crypto03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: 'text-white-color',
    marginLeft: 16,
  },
  coin: {
    width: 16,
    height: 16,
    marginRight: 12,
  },
  iconButton: {
    width: 20,
    height: 20,
    position: 'absolute',
    zIndex: 10,
    top: 22,
    left: 22,
    tintColor: 'text-white-color',
  },
});
const LIST_COIN = [
  Images.crypto.bitcoin,
  Images.crypto.bnb,
  Images.crypto.eth,
  Images.crypto.matic,
  Images.crypto.matic,
];
const TAB = [
  {
    id: '4',
    image: Images.crypto.bnb,
    name: 'Binance',
    describe: 'BNB',
    price: 14.44,
    change: 8.06,
  },
  {
    id: '1',
    image: Images.crypto.bitcoin,
    name: 'Bitcoin',
    describe: 'BTC',
    price: 14.44,
    change: 8.06,
  },
  {
    id: '2',
    image: Images.crypto.eth,
    name: 'Ethereum',
    describe: 'ETH',
    price: 14.44,
    change: 8.06,
  },
  {
    id: '4',
    image: Images.crypto.sol,
    name: 'Solana',
    describe: 'SOL',
    price: 14.44,
    change: 8.06,
  },
];
