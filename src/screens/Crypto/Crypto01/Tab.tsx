import * as React from 'react';
import {View, Image, StyleSheet, ImageRequireSource} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useLayout} from 'hooks';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
  TopNavigation,
} from '@ui-kitten/components';

import {
  Container,
  Content,
  Text,
  NavigationAction,
  VStack,
  HStack,
  IDivider,
} from 'components';

interface ICoinProps {
  id: string;
  image: any;
  name: string;
  price: number;
  priceRange: number;
  change: number;
}

interface TabProps {
  data: ICoinProps[];
}

const Tab = React.memo(({data}: TabProps) => {
  const theme = useTheme();
  const {goBack} = useNavigation();
  const {height, width, top, bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack style={styles.container}>
      {data &&
        data.map((item, i) => {
          return (
            <VStack key={i} mb={16}>
              <HStack level="1" itemsCenter>
                <HStack
                  level="1"
                  justify="flex-start"
                  itemsCenter>
                  <Image source={item.image} />
                  <VStack ml={8}>
                    <Text category="h7">{item.name}</Text>
                    <Text
                      status={item.change >= 0 ? 'success' : 'danger'}
                      category="c2">
                      {item.change >= 0 ? '+' : '-'}
                      {item.change}%
                    </Text>
                  </VStack>
                </HStack>
                <VStack style={{marginStart: '-65%'}} level="1">
                  <Text status="basic" category="subhead" right>
                    {item.price}
                  </Text>
                  <Text status="placeholder" category="c2" right>
                    ~{item.priceRange}
                  </Text>
                </VStack>
              </HStack>
              <IDivider marginTop={16} />
            </VStack>
          );
        })}
    </VStack>
  );
});

export default Tab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 24,
  },
});
