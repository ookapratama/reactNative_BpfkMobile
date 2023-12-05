import * as React from 'react';
import {Image} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
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
import Progress from './Progress';

const Crypto02 = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction status="primary" />}
        accessoryRight={<NavigationAction status="primary" icon="share" />}
      />
      <Content contentContainerStyle={styles.content}>
        <Text category="h1">
          Minting ―{'\n'}
          <Text category="h1" status="success">
            Tramkam NFT
          </Text>
        </Text>
        <Text marginTop={8} marginBottom={16}>
          The artists’ work is amazing. I’m a huge art lover, and I’m always
          looking for cool works.
        </Text>
        <Image source={Images.crypto.ad02} />
        <VStack mt={24} mb={16}>
          <HStack>
            <Text category="h8">
              Price :{' '}
              <Text category="h8" status="primary">
                1299
              </Text>{' '}
              ETH
            </Text>
            <Text category="h8">
              1,403/
              <Text category="h8" status="platinum">
                10,000
              </Text>{' '}
              minted
            </Text>
          </HStack>
        </VStack>
        <Progress progress={3 / 10} />
      </Content>
      <Button children={'Mint Now'} style={styles.button} />
    </Container>
  );
});

export default Crypto02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  button: {
    marginHorizontal: 24,
    marginVertical: 8,
  },
});
