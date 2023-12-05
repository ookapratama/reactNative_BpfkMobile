import * as React from 'react';
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components';
import {Text, VStack, HStack} from 'components';

const Card = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <VStack style={styles.container} level="1" border={12}>
      <HStack>
        <VStack>
          <Text category="body" >Kode Pengajuan</Text>
        </VStack>
        <VStack>
          <Text category="callout" >
            -$9,468.00
          </Text>
        </VStack>
      </HStack>
    </VStack>
    
  );
});

export default Card;

const themedStyles = StyleService.create({
  container: {
    padding: 20,
  },
});
