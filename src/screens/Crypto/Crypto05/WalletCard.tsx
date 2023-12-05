import * as React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
  Icon,
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

const WalletCard = React.memo(() => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack style={styles.container} level="1" border={12} padding={16}>
      <HStack itemsCenter mb={4}>
        <Text status="platinum" category="subhead">
          Total Value
        </Text>
        <HStack itemsCenter>
          <Icon pack="assets" name="eye" style={styles.icon} />
          <Icon pack="assets" name="info" style={styles.icon} />
        </HStack>
      </HStack>
      <Text category="h3" marginBottom={8}>
        $100,246.31
      </Text>
      <HStack>
        <Button
          children={'Desposit'}
          style={styles.button}
          accessoryLeft={<Icon name="arrow_line_down" pack="assets" />}
        />
        <Button
          accessoryLeft={<Icon name="arrow_line_down" pack="assets" />}
          status="success"
          style={styles.download}
        />
      </HStack>
    </VStack>
  );
});

export default WalletCard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 12,
    height: 12,
    tintColor: 'text-platinum-color',
    marginLeft: 16,
  },
  button: {
    flex: 1,
  },
  download: {
    width: 48,
    height: 48,
    marginLeft: 16,
  },
});
