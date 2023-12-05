import * as React from 'react';
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components';
import {Text, VStack, HStack} from 'components';

const Card = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <VStack style={styles.container} level="9" border={12}>
      <HStack>
        <VStack>
          <Text category="subhead">Overview</Text>
          <Text category="h3">12.468BNB</Text>
          <Text category="h7" status="platinum">
            ~$219,468.00
          </Text>
        </VStack>
        <VStack>
          <Button size="40" children={'-1.32%'} />
          <Text category="body" marginTop={20}>
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
