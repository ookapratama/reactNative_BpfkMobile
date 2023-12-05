import * as React from 'react';
import {Image} from 'react-native';
import {useLayout} from 'hooks';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {NavigationAction, HStack} from 'components';
import Images from 'assets/images';

const BottomTab = React.memo(({level = '1'}: {level?: string}) => {
  const {bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <HStack
      level={level}
      style={[styles.container, {paddingBottom: bottom + 8}]}>
      <NavigationAction status="primary" icon={'house'} />
      <NavigationAction status="primary" icon={'calendar'} />
      {/* @ts-ignore */}
      <Image source={Images.logo} style={styles.logo} />
      <NavigationAction status="primary" icon={'timer'} />
      <NavigationAction status="primary" icon={'user'} />
    </HStack>
  );
});

export default BottomTab;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
});
