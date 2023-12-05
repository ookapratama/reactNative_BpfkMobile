import * as React from 'react';
import {Image, ImageRequireSource} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout, useModal} from 'hooks';
import {
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Input,
  Icon,
  Button,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  HStack,
  VStack,
} from 'components';
import Images from 'assets/images';

interface CoinFromProps {
  id: string;
  image: ImageRequireSource;
  code: string;
}

const Crypto08 = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const {show: showTo, hide: hideTo, modalRef: modalTo} = useModal();
  const {show: showFrom, hide: hideFrom, modalRef: modalFrom} = useModal();

  const [coinFrom, setCoinFrom] = React.useState(DATA[0]);
  const [showAll, setShowAll] = React.useState(true);

  return (
    <Container style={styles.container} level="2">
      <TopNavigation
        appearance="control"
        title={'Swap'}
        accessoryLeft={<NavigationAction status="primary" />}
      />
      <Content>
        <VStack mh={24}>
          <HStack mb={8}>
            <Text category="h8" status="platinum">
              From
            </Text>
            <Text category="h8" status="primary">
              Max
            </Text>
          </HStack>
          <Input
            style={styles.input}
            accessoryRight={() => (
              <HStack onPress={showFrom} itemsCenter>
                <Image source={coinFrom.image} style={styles.logo} />
                <Text marginHorizontal={8} category="h7">
                  {coinFrom.code}
                </Text>
                <Icon pack="assets" name="caret_down" style={styles.caret} />
              </HStack>
            )}
          />
          <Text category="c1" status="platinum" marginTop={8}>
            Balance: 2,356.89 SOL
          </Text>
        </VStack>
        <Button
          accessoryRight={<Icon pack="assets" name="updown" />}
          style={styles.buttonSwap}
          status="purple"
        />
        <VStack mh={24}>
          <HStack mb={8}>
            <Text category="h8" status="platinum">
              To
            </Text>
            <Text category="h8" status="primary">
              Max
            </Text>
          </HStack>
          <Input
            style={styles.input}
            accessoryRight={() => (
              <HStack onPress={showFrom} itemsCenter>
                <Image source={coinFrom.image} style={styles.logo} />
                <Text marginHorizontal={8} category="h7">
                  {coinFrom.code}
                </Text>
                <Icon pack="assets" name="caret_down" style={styles.caret} />
              </HStack>
            )}
          />
          <Text category="c1" status="platinum" marginTop={8}>
            Balance: 2,356.89 SOL
          </Text>
        </VStack>
        <VStack border={12} level="1" margin={24} padding={16}>
          <HStack itemsCenter>
            <HStack itemsCenter>
              <Text category="c1" status="platinum">
                Swapping Through
              </Text>
              <Icon pack="assets" name="info" style={styles.info} />
            </HStack>
            <Text category="h8">Raydium Pools</Text>
          </HStack>

          <HStack itemsCenter mv={24}>
            <HStack itemsCenter>
              <Text category="c1" status="platinum">
                Minimum Received
              </Text>
              <Icon pack="assets" name="info" style={styles.info} />
            </HStack>
            <Text category="h8" status="success">
              43,654.12 USDT
            </Text>
          </HStack>
          {showAll && (
            <>
              <HStack itemsCenter>
                <HStack itemsCenter>
                  <Text category="c1" status="platinum">
                    Price Impact
                  </Text>
                  <Icon pack="assets" name="info" style={styles.info} />
                </HStack>
                <Text category="h8" status="primary">
                  {'<0.5%'}
                </Text>
              </HStack>
              <HStack itemsCenter mt={24} mb={16}>
                <HStack itemsCenter>
                  <Text category="c1" status="platinum">
                    Slippage Tolerance
                  </Text>
                  <Icon pack="assets" name="info" style={styles.info} />
                </HStack>
                <HStack level="3" style={styles.inputSlipage}>
                  <Text category="h8" marginLeft={12}>
                    1.5
                  </Text>
                  <Text category="s2">%</Text>
                  <Button children={'Auto'} />
                </HStack>
              </HStack>
            </>
          )}
          <HStack
            itemsCenter
            justify="center"
            onPress={() => {
              setShowAll(!showAll);
            }}>
            <Text category="h8" marginBottom={4} status="primary">
              Show less
            </Text>
            <Icon pack="assets" name="caret_down" style={styles.caretDown} />
          </HStack>
        </VStack>
      </Content>
      <Button children={'Swap Now'} style={styles.button} />
    </Container>
  );
});

export default Crypto08;

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
    marginVertical: 8,
  },
});

const DATA: CoinFromProps[] = [
  {id: '1', image: Images.crypto.bitcoin, code: 'BTC'},
  {id: '2', image: Images.crypto.eth, code: 'ETH'},
  {id: '3', image: Images.crypto.sol, code: 'SOL'},
];
