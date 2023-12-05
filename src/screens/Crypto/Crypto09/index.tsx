import * as React from 'react';
import {Image} from 'react-native';
import {useLayout} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
  IndexPath,
  Select,
  SelectItem,
  Input,
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
import TabBar from './TabBar';
import BottomTab from '../Crypto05/BottomTab';

const Crypto09 = React.memo(() => {
  const {top} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  console.log(selectedIndex);
  return (
    <Container style={styles.container} useSafeArea={false}>
      <VStack level="2" style={[styles.header, {paddingTop: top + 4}]}>
        <TopNavigation
          appearance="control"
          accessoryRight={
            <Button
              children="BSC"
              status="basic"
              style={styles.buttonHeader}
              accessoryLeft={() => (
                //@ts-ignore
                <Image source={Images.crypto.bnb} style={styles.bnb} />
              )}
            />
          }
          accessoryLeft={<NavigationAction status="primary" />}
        />
        <Text category="h3" marginLeft={20}>
          Pools
        </Text>
      </VStack>
      <TabBar
        tabActive={selectedTab}
        onChangeTab={setSelectedTab}
        tabs={['Live', 'Finish']}
        style={styles.tabBar}
      />
      <HStack mh={16}>
        <Select
          selectedIndex={selectedIndex}
          value={'Sort by'}
          size="large"
          style={styles.select}
          onSelect={index => setSelectedIndex(index)}>
          <SelectItem title="Option 1" />
          <SelectItem title="Option 2" />
          <SelectItem title="Option 3" />
        </Select>
        <Input placeholder="Search" style={styles.search} size="large" />
      </HStack>
      <Content contentContainerStyle={styles.content}>
        <ViewPager>
          <VStack mh={16}>
            {DATA.map((item, i) => {
              return (
                <VStack key={i} style={styles.item} mb={16} padding={16}>
                  <HStack justify="flex-start" itemsCenter mb={12}>
                    <Image source={Images.crypto.btc_usdc} />
                    <Text category="h8" marginLeft={8}>
                      {item.title}
                    </Text>
                  </HStack>
                  <HStack mb={8}>
                    <HStack>
                      <Text status="placeholder" category="subhead">
                        TVL:
                      </Text>
                      <Text status="basic" category="subhead">
                        {item.tvl}
                      </Text>
                    </HStack>
                    <HStack justify="flex-start">
                      <Text status="placeholder">Grid APY</Text>
                      <Text status="success" marginLeft={32}>
                        {item.grid}
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack mb={16}>
                    <HStack>
                      <Text status="placeholder" category="subhead">
                        Running Bots:
                      </Text>
                      <Text status="basic" category="subhead">
                        {item.running_bot}
                      </Text>
                    </HStack>
                    <HStack justify="flex-start">
                      <Text status="placeholder">Total APY</Text>
                      <Text status="success" marginLeft={32}>
                        {item.total}
                      </Text>
                    </HStack>
                  </HStack>
                  <Button
                    children={'Connect Wallet'}
                    status="transparent-primary"
                  />
                </VStack>
              );
            })}
          </VStack>
          <VStack>
            <Text>Finish Tab</Text>
          </VStack>
        </ViewPager>
      </Content>
      <BottomTab level="2" />
    </Container>
  );
});

export default Crypto09;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
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
  tabBar: {
    margin: 16,
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
});

const DATA = [
  {
    id: '1',
    title: 'BTC-USDC',
    logo: Images.crypto.btc_usdc,
    tvl: '$43,576.98',
    running_bot: 23,
    grid: '25%',
    total: '18%',
  },
  {
    id: '1',
    title: 'BTC-USDC',
    logo: Images.crypto.btc_usdc,
    tvl: '$43,576.98',
    running_bot: 23,
    grid: '25%',
    total: '18%',
  },
  {
    id: '1',
    title: 'BTC-USDC',
    logo: Images.crypto.btc_usdc,
    tvl: '$43,576.98',
    running_bot: 23,
    grid: '25%',
    total: '18%',
  },
  {
    id: '1',
    title: 'BTC-USDC',
    logo: Images.crypto.btc_usdc,
    tvl: '$43,576.98',
    running_bot: 23,
    grid: '25%',
    total: '18%',
  },
];
