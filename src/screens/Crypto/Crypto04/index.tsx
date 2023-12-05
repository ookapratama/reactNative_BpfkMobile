import * as React from 'react';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components';
import {Container, Content, HStack} from 'components';
import Images from 'assets/images';
import LotteryCard from './LotteryCard';
import Ticket from './Ticket';
import TicketDetails from './TicketDetails';

const Crypto04 = React.memo(() => {
  const {goBack} = useNavigation();
  const styles = useStyleSheet(themedStyles);

  return (
    <Container style={styles.container} level="2">
      <HStack mh={16} itemsCenter>
        <Image
          source={Images.logo}
          //@ts-ignore
          style={styles.logo}
        />
        <HStack>
          <Button
            children={'BSC'}
            status="basic"
            style={styles.buttonBSC}
            onPress={goBack}
            accessoryLeft={() => (
              <Image
                source={Images.crypto.bnb}
                //@ts-ignore
                style={styles.iconButton}
              />
            )}
            size="40"
          />
          <Button children={'Connect Wallet'} size="40" onPress={goBack} />
        </HStack>
      </HStack>
      <Content contentContainerStyle={styles.content}>
        <LotteryCard />
        <Ticket />
        <TicketDetails />
      </Content>
    </Container>
  );
});

export default Crypto04;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 32,
    height: 32,
    marginLeft: 10,
  },
  iconButton: {
    width: 16,
    height: 16,
  },
  buttonBSC: {
    backgroundColor: 'background-basic-color-1',
    marginRight: 12,
  },
  content: {
    paddingTop: 16,
  },
});
