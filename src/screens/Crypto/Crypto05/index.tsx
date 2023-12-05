import * as React from 'react';
import {Image, FlatList} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Icon,
} from '@ui-kitten/components';
import {Container, Text, NavigationAction, VStack, HStack} from 'components';
import WalletCard from './WalletCard';
import Images from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import BottomTab from './BottomTab';

const detailPermohonan = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={'Overview'}
        accessoryLeft={
          <NavigationAction icon="circles_three" status="primary" />
        }
        accessoryRight={<NavigationAction icon="phone_out" status="primary" />}
      />
      <FlatList
        data={DATA}
        renderItem={({item}) => {
          return (
            <HStack mb={8} level="1" padding={16} border={12}>
              <HStack itemsCenter>
                <Icon pack="assets" name={item.logo} />
                <VStack ml={8}>
                  <Text category="h7" marginBottom={4}>
                    {item.name}
                  </Text>
                  <Text category="c2" status="placeholder">
                    {item.change}
                  </Text>
                </VStack>
              </HStack>
              <VStack>
                <Text category="subhead" right>
                  {item.price}
                </Text>
                <HStack justify="flex-end" mt={4}>
                  {item.listCoins.map((item, i) => {
                    return (
                      //@ts-ignore
                      <Image source={item} key={i} style={styles.smallcoin} />
                    );
                  })}
                </HStack>
              </VStack>
            </HStack>
          );
        }}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <WalletCard />
            <Text category="h6" marginTop={24} marginBottom={14}>
              Portfolios
            </Text>
          </>
        }
      />
      <BottomTab />
    </Container>
  );
});

export default detailPermohonan;

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
});

const DATA = [
  {
    name: 'Spot',
    logo: 'cardholder',
    change: '18%',
    price: '$23,579.00',
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
  {
    name: 'Margin',
    logo: 'campfire',
    change: '34%',
    price: '$33,579.00',
    listCoins: [
      Images.crypto.xsgd,
      Images.crypto.zillacracy,
      Images.crypto.zillet,
      Images.crypto.zilliqa,
    ],
  },
  {
    name: 'Saving',
    logo: 'money',
    change: '12%',
    price: '$23,579.00',
    listCoins: [
      Images.crypto.xsgd,
      Images.crypto.zillacracy,
      Images.crypto.zillet,
    ],
  },
  {
    name: 'Funding',
    logo: 'coins',
    change: '0.8%',
    price: '$17,579.00',
    listCoins: [
      Images.crypto.xsgd,
      Images.crypto.zillacracy,
      Images.crypto.zillet,
      Images.crypto.zilliqa,
    ],
  },
];
