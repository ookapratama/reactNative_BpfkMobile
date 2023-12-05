import * as React from 'react';
import {Image} from 'react-native';
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
} from 'components';
import Images from 'assets/images';
import TabBar from '../Crypto01/TabBar';
import ProgressBar from 'components/ProgressBar';

const Crypto06 = React.memo(() => {
  const theme = useTheme();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryLeft={
          <Image
            source={Images.logo}
            //@ts-ignore
            style={styles.logo}
          />
        }
        accessoryRight={<NavigationAction status="primary" icon="qrcode" />}
      />
      <Content>
        <Text category="h1" marginHorizontal={24} marginBottom={16}>
          Launching your{'\n'}
          <Text category="h1" status="success">
            Project IDO
          </Text>
        </Text>
        {/* //@ts-ignore */}
        <Image source={Images.crypto.ad03} style={styles.image} />
        <TabBar
          style={styles.tabBar}
          tabs={['Live', 'Upcoming', 'Finish', 'All']}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />
        <Content horizontal contentContainerStyle={styles.content}>
          {DATA.map((item, i) => {
            return (
              <VStack key={i} padding={16} mr={12} style={styles.item}>
                <Image
                  source={item.image}
                  borderRadius={16}
                  style={{
                    width: 295 * (width / 375),
                    height: 140 * (height / 812),
                    marginBottom: 16,
                  }}
                />
                <Text category="h4">Project Tramkam NFT</Text>
                <HStack justify="flex-start" mv={16}>
                  {SOCIAL.map((item, i) => {
                    return (
                      <Icon
                        pack="assets"
                        name={item}
                        key={i}
                        style={styles.socialIcon}
                      />
                    );
                  })}
                </HStack>
                <Text category="h7" status="success" marginBottom={24}>
                  End date: {item.end_date}
                </Text>
                <ProgressBar
                  progress={item.progress}
                  style={styles.progressBar}
                  styleBar={styles.progressBar}
                  containColor={theme['background-basic-color-3']}
                />
                <HStack mt={8}>
                  <Text category="footnote">{item.currentValue} USDT</Text>
                  <Text category="footnote">{item.targetValue} USDT</Text>
                </HStack>
              </VStack>
            );
          })}
        </Content>
      </Content>
    </Container>
  );
});

export default Crypto06;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingLeft: 20,
  },
  logo: {
    width: 32,
    height: 32,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  tabBar: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  item: {
    borderWidth: 1,
    borderColor: 'background-basic-color-3',
    borderRadius: 12,
  },
  socialIcon: {
    width: 16,
    height: 16,
    tintColor: 'text-placeholder-color',
    marginRight: 16,
  },
  progressBar: {
    height: 8,
  },
  content: {
    paddingHorizontal: 24,
  },
});

const DATA = [
  {
    id: '1',
    name: 'Project Tramkam NFT',
    end_date: '20 DEC 2023',
    currentValue: '40,000',
    targetValue: '100,100',
    progress: 25 / 100,
    image: Images.crypto.ad01,
  },
  {
    id: '1',
    name: 'Project Tramkam NFT',
    end_date: '20 DEC 2023',
    currentValue: '40,000',
    targetValue: '100,100',
    progress: 25 / 100,
    image: Images.crypto.ad02,
  },
  {
    id: '1',
    name: 'Project Tramkam NFT',
    end_date: '20 DEC 2023',
    currentValue: '40,000',
    targetValue: '100,100',
    progress: 25 / 100,
    image: Images.crypto.ad03,
  },
  {
    id: '1',
    name: 'Project Tramkam NFT',
    end_date: '20 DEC 2023',
    currentValue: '40,000',
    targetValue: '100,100',
    progress: 25 / 100,
    image: Images.crypto.ad04,
  },
];
const SOCIAL = ['twitter', 'global', 'discord', 'telegram'];
