import * as React from 'react';
import {Image, FlatList} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  IndexPath,
  Select,
  SelectItem,
  Input,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Text,
  NavigationAction,
  HStack,
  VStack,
  IDivider,
} from 'components';
import TabBar from './TabBar';
import Images from 'assets/images';
import keyExtractor from 'utils/keyExtractor';
import BottomTab from '../Crypto05/BottomTab';

const Crypto10 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        accessoryLeft={
          <Text category="h6" marginLeft={8}>
            FARMS
          </Text>
        }
        accessoryRight={
          <HStack>
            <NavigationAction status="primary" icon="menu" />
            <NavigationAction status="primary" icon="headphones" />
          </HStack>
        }
      />
      <TabBar
        tabActive={selectedTab}
        onChangeTab={setSelectedTab}
        tabs={['Live', 'Finish', 'Trending']}
        style={styles.tabBar}
      />
      <HStack mt={16} mb={24} mh={16}>
        <Select
          selectedIndex={selectedIndex}
          value={'Sort by'}
          size="large"
          status="control"
          style={styles.select}
          //@ts-ignore
          onSelect={index => setSelectedIndex(index)}>
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>
        <Input placeholder="Search" style={styles.search} size='large' />
      </HStack>
      <FlatList
        contentContainerStyle={styles.content}
        data={DATA}
        keyExtractor={keyExtractor}
        renderItem={({item}) => {
          return (
            <VStack level="1" mb={48} border={12}>
              <HStack margin={24}>
                <HStack itemsCenter justify="flex-start">
                  <HStack justify="flex-start" itemsCenter>
                    {/* @ts-ignore */}
                    <Image source={item.coins[0].image} style={styles.coin} />
                    {/* @ts-ignore */}
                    <Image source={item.coins[1].image} style={[styles.coin, {marginLeft: -8}]}/>
                  </HStack>
                  <Text category="h7">
                    {item.coins[0].name}/{item.coins[1].name}
                  </Text>
                </HStack>
                <VStack level="5" style={styles.tag}>
                  <Text status="white" category="c1">
                    {item.volumn}
                  </Text>
                </VStack>
              </HStack>
              <IDivider marginBottom={16} />
              <HStack mh={24}>
                <VStack>
                  <Text category="subhead" status="placeholder">
                    APY
                  </Text>
                  <Text category="h7">{item.apy}%</Text>
                </VStack>
                <VStack>
                  <Text category="subhead" status="placeholder">
                    EARN
                  </Text>
                  <Text category="h7">{item.earn}</Text>
                </VStack>
              </HStack>
              <IDivider marginHorizontal={24} marginVertical={16} />
              <HStack mh={24}>
                <VStack style={{flex: 1}}>
                  <Text category="subhead" status="placeholder">
                    REWARD
                  </Text>
                  <HStack itemsCenter>
                    <Text category="h7">{item.reward}</Text>
                    <Button children={'Claim'} size="small" status="success" />
                  </HStack>
                </VStack>
              </HStack>
              <IDivider marginHorizontal={24} marginVertical={16} />
              <HStack mh={24}>
                <VStack style={{flex: 1}}>
                  <Text category="subhead" status="placeholder">
                    STAKE
                  </Text>
                  <HStack itemsCenter>
                    <Text category="h7">
                      {item.stake.percent}
                      <Text category="c2" status="placeholder"></Text>~
                      {item.stake.value}
                    </Text>
                    <Button children={'Claim'} size="small" status="success" />
                  </HStack>
                </VStack>
              </HStack>
              <IDivider marginHorizontal={24} marginVertical={16} />
              <Text category="h7" status="primary" center marginBottom={16}>
                Details
              </Text>
            </VStack>
          );
        }}
      />
      <BottomTab level='2'/>
    </Container>
  );
});

export default Crypto10;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 16,
  },
  tabBar: {
    marginHorizontal: 16,
    padding: 4,
    backgroundColor: 'background-basic-color-1',
  },
  select: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    borderRadius: 12,
    marginRight: 16,
  },
  search: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    borderColor: 'transparent',
    borderRadius:12
  },
  coin: {
    width: 32,
    height: 32,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'background-basic-color-1',
  },
  tag: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 99,
  },
});

const DATA = [
  {
    id: '1',
    coins: [
      {id: '1', name: 'BTC', image: Images.crypto.bitcoin},
      {id: '2', name: 'BNB', image: Images.crypto.bnb},
    ],
    volumn: '40x',
    apy: 39.8,
    earn: 'BNB + Fees',
    reward: '12BNB',
    stake: {percent: '0.986', value: 136.28},
  },
  {
    id: '2',
    coins: [
      {id: '1', name: 'ETH', image: Images.crypto.eth},
      {id: '2', name: 'MATIC', image: Images.crypto.matic},
    ],
    volumn: '40x',
    apy: 39.8,
    earn: 'BNB + Fees',
    reward: '12BNB',
    stake: {percent: '0.986', value: 136.28},
  },
];
