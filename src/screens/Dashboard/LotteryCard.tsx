import * as React from 'react';
import {StyleService, useStyleSheet} from '@ui-kitten/components';

import {Text, VStack} from 'components';

const LotteryCard = React.memo(() => {
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack
      style={[styles.container, {backgroundColor: '#00b1a9'}]}
      itemsCenter
      mh={16}
      mb={24}
      border={12}>
      <Text
        style={{alignSelf: 'center'}}
        category="h3"
        marginTop={16}
        marginBottom={24}
        status="white">
        BPFK Makassar
      </Text>
      <Text category="subhead" status="white" marginBottom={32}>
        Balai Pengamanan Fasilitas Kesehatan
      </Text>
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
