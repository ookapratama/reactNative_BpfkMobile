import * as React from 'react';
import {Image} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  ViewPager,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
} from 'components';
import Images from 'assets/images';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
import Pagination from './Pagination';
import TabBar from './TabBar';
import Tab from './Tab';
import BottomTab from '../elements/BottomTab';
import { navigate } from 'navigation/RootNavigation';

const Crypto01 = React.memo(() => {
  const theme = useTheme();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const heightImg = 140 * (height / 812);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const progressValue = useSharedValue<number>(0);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <VStack level="2" style={[styles.header, {paddingTop: top}]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={
            <NavigationAction status="primary" icon="circles_four" />
          }
          accessoryRight={
            <Text category="h7" status="primary" marginRight={20} onPress={() => {navigate}}>
              Connect Wallet
            </Text>
          }
        />
        <Text category="h3" marginLeft={20}>
          Dashboard
        </Text>
      </VStack>
      <Content contentContainerStyle={styles.content}>
        <Carousel
          width={width}
          height={heightImg}
          autoPlay
          data={DATA_AD}
          renderItem={({item}) => {
            return (
              <Image
                source={item}
                style={{
                  width: width - 32,
                  height: heightImg,
                  marginHorizontal: 16,
                }}
                borderRadius={16}
              />
            );
          }}
          onSnapToItem={index => {
            setActiveIndex(index);
          }}
          onProgressChange={(_, absoluteProgress) =>
            (progressValue.value = absoluteProgress)
          }
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 0,
          }}
        />
        <HStack justify="center" mt={8} mb={24}>
          {DATA_AD.map((backgroundColor, index) => {
            return (
              <Pagination
                backgroundColor={theme['background-basic-color-5']}
                animValue={progressValue}
                index={index}
                key={index}
                widthActiveIndicator={20}
                length={DATA_AD.length}
              />
            );
          })}
        </HStack>
        
        <TabBar
          style={styles.tabBar}
          tabs={['Favorite', 'Trending', 'New Listings', 'Gainers', 'Gainers', 'Gainers']}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          swipeEnabled={false}>
          <Tab data={TAB_FAVORITE} />
          <Tab data={TAB_TRENDING} />
          <Tab data={TAB_NEW} />
          <Tab data={TAB_GAINERS} />
        </ViewPager>
      </Content>
      <BottomTab />
    </Container>
  );
});

export default Crypto01;

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
});
const DATA_AD = [
  Images.crypto.ad01,
  Images.crypto.ad02,
  Images.crypto.ad03,
  Images.crypto.ad04,
];

const TAB_TRENDING = [
  {
    id: '1',
    image: Images.crypto.bitcoin,
    name: 'BTC/USDT',
    price: 16786.25,
    priceRange: 16786.22,
    change: 0.07,
  },
  {
    id: '2',
    image: Images.crypto.eth,
    name: 'ETH/USDT',
    price: 1203.4,
    priceRange: 1203.29,
    change: 2,
  },
  {
    id: '3',
    image: Images.crypto.bnb,
    name: 'BNB/USDT',
    price: 297.94,
    priceRange: 297.99,
    change: 2,
  },
  {
    id: '4',
    image: Images.crypto.sol,
    name: 'SOL/USDT',
    price: 14.44,
    priceRange: 14.99,
    change: 1.06,
  },
  {
    id: '5',
    image: Images.crypto.matic,
    name: 'MATIC/USDT',
    price: 0.8913,
    priceRange: 0.8919,
    change: 2,
  },
];
const TAB_FAVORITE = [
  {
    id: '1',
    image: Images.crypto.bitcoin,
    name: 'BTC/USDT', 
    price: 16786.25,
    priceRange: 16786.22,
    change: 0.07,
  },
  {
    id: '2',
    image: Images.crypto.eth,
    name: 'ETH/USDT',
    price: 1203.4,
    priceRange: 1203.29,
    change: 2,
  },
  {
    id: '3',
    image: Images.crypto.bnb,
    name: 'BNB/USDT',
    price: 297.94,
    priceRange: 297.99,
    change: 2,
  },
  {
    id: '4',
    image: Images.crypto.sol,
    name: 'SOL/USDT',
    price: 14.44,
    priceRange: 14.99,
    change: 1.06,
  },
  {
    id: '5',
    image: Images.crypto.matic,
    name: 'MATIC/USDT',
    price: 0.8913,
    priceRange: 0.8919,
    change: 2,
  },
];
const TAB_NEW = [
  {
    id: '1',
    image: Images.crypto.bitcoin,
    name: 'BTC/USDT',
    price: 16786.25,
    priceRange: 16786.22,
    change: 0.07,
  },
  {
    id: '2',
    image: Images.crypto.eth,
    name: 'ETH/USDT',
    price: 1203.4,
    priceRange: 1203.29,
    change: 2,
  },
  {
    id: '3',
    image: Images.crypto.bnb,
    name: 'BNB/USDT',
    price: 297.94,
    priceRange: 297.99,
    change: 2,
  },
  {
    id: '4',
    image: Images.crypto.sol,
    name: 'SOL/USDT',
    price: 14.44,
    priceRange: 14.99,
    change: 1.06,
  },
  {
    id: '5',
    image: Images.crypto.matic,
    name: 'MATIC/USDT',
    price: 0.8913,
    priceRange: 0.8919,
    change: 2,
  },
];
const TAB_GAINERS = [
  {
    id: '1',
    image: Images.crypto.bitcoin,
    name: 'BTC/USDT',
    price: 16786.25,
    priceRange: 16786.22,
    change: 0.07,
  },
  {
    id: '2',
    image: Images.crypto.eth,
    name: 'ETH/USDT',
    price: 1203.4,
    priceRange: 1203.29,
    change: 2,
  },
  {
    id: '3',
    image: Images.crypto.bnb,
    name: 'BNB/USDT',
    price: 297.94,
    priceRange: 297.99,
    change: 2,
  },
  {
    id: '4',
    image: Images.crypto.sol,
    name: 'SOL/USDT',
    price: 14.44,
    priceRange: 14.99,
    change: 1.06,
  },
  {
    id: '5',
    image: Images.crypto.matic,
    name: 'MATIC/USDT',
    price: 0.8913,
    priceRange: 0.8919,
    change: 2,
  },
];
