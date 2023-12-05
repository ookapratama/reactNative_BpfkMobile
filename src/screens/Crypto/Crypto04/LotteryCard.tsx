import * as React from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {Text, VStack} from 'components';

const LotteryCard = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack>
      <VStack
        style={styles.container}
        level="12"
        itemsCenter
        mh={16}
        border={12}>
        <Text category="h3" marginTop={16} status="white">
          Lottery Jacpot
        </Text>
        
      </VStack>
      <VStack style={styles.pool} level="10" pv={16} ph={8}>
        <Text category="h3" center>
          $68,759.00
        </Text>
      </VStack>
    </VStack>
  );
});

export default LotteryCard;

const themedStyles = StyleService.create({
  container: {},
  pool: {
    bottom: -20,
    left: 79,
    right: 79,
    position: 'absolute',
    borderRadius: 12,
  },
});
