import * as React from 'react';
import {FlatList} from 'react-native';
import {useLayout} from 'hooks';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  StyleService,
  useStyleSheet,
  Button,
  TopNavigation,
} from '@ui-kitten/components';

import {Container, Text, VStack} from 'components';
import {RootStackParamList} from 'navigation/navigation-types';

interface SplashButtonProps {
  name: string;
  navigate?: keyof RootStackParamList;
}

const SplashScreen = React.memo(() => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const {height, width, top, bottom} = useLayout();

  const data: SplashButtonProps[] = [
    {name: 'Onboarding'},
    {name: 'Authenticate'},
    {name: 'Social Media'},
    {name: 'Profile'},
    {name: 'Finance'},
    {name: 'ECommerce'},
    {name: 'Crypto', navigate: 'Crypto'},
    {name: 'Reading'},
    {name: 'Fitness'},
    {name: 'Health'},
  ];

  return (
    <Container style={styles.container}>
      <Text category="h3" center marginBottom={32}>
        {`Welcome to\nTramKam UIkit 🎉🎉🎉`}
      </Text>
      {/* <VStack level="2" style={[styles.header, {paddingTop: top}]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={
            <Text category="h3" marginLeft={20}>
              Dashboard
            </Text>
          }
          accessoryRight={
            <Text
              category="h7"
              style={{color: '#00b1a9'}}
              marginRight={20}
              onPress={() => {
                navigate('Login');
              }}>
              Logout
            </Text>
          }
        />
        
      </VStack> */}

      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return (
            <Button
              children={item.name}
              disabled={!item.navigate}
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

export default SplashScreen;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    paddingBottom: 8,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  button: {
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
});
