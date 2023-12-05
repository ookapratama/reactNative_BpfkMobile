import * as React from 'react';
import {FlatList} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
} from '@ui-kitten/components';

import {Container, NavigationAction} from 'components';
import {CryptoStackParamList} from 'navigation/navigation-types';

interface ButtonProps {
  name: string;
  navigate: keyof CryptoStackParamList;
}

const CryptoIntro = React.memo(() => {
  const {navigate} = useNavigation<NavigationProp<CryptoStackParamList>>();

  const styles = useStyleSheet(themedStyles);

  const data: ButtonProps[] = [
    {name: '01. Home Crypto', navigate: 'Crypto01'},
    {name: '02. List Coin Price', navigate: 'Crypto02'},
    {name: '03. Wallet', navigate: 'Crypto03'},
    {name: '04. Pool Lottery', navigate: 'Crypto04'},
    {name: '05. Overview', navigate: 'Crypto05'},
    {name: '06. Raise IDO', navigate: 'Crypto06'},
    {name: '07. Overview', navigate: 'Crypto07'},
    {name: '08. Swap', navigate: 'Crypto08'},
    {name: '09. Pool List', navigate: 'Crypto09'},
    {name: '10. Farm', navigate: 'Crypto10'},
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={'Crypto'}
        accessoryLeft={<NavigationAction status="placeholder" />}
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return (
            <Button
              status="primary"
              children={item.name}
              style={styles.button}
              onPress={() => {
                navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default CryptoIntro;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
  },
  button: {
    marginBottom: 16,
  },
});
