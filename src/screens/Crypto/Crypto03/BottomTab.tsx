import * as React from 'react';
import {useLayout} from 'hooks';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {NavigationAction, HStack} from 'components';

const BottomTab = React.memo(() => {
  const {bottom} = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <HStack level="1" style={[styles.container, {paddingBottom: bottom + 8}]}>
      <NavigationAction status="primary" icon={'house'} />
      <NavigationAction status="primary" icon={'calendar'} />
      <NavigationAction status="primary" icon={'calendar'} />
      <NavigationAction status="primary" icon={'timer'} />
      <NavigationAction status="primary" icon={'wallet'} />
    </HStack>
  );
});

export default BottomTab;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 12,
  },
});
