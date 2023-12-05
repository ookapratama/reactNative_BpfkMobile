import * as React from 'react';
import {StyleService, useStyleSheet, Button} from '@ui-kitten/components';
import {Text, NavigationAction, VStack, HStack} from 'components';
import useCountDownUtil from 'utils/useCountDownUtil';
import timeConvert from 'utils/timeConvert';

const Ticket = React.memo(() => {
  const styles = useStyleSheet(themedStyles);
  const [time, reset] = useCountDownUtil(2002);

  return (
    <VStack style={styles.container} level="1" mh={16} border={16} itemsCenter>
      <HStack itemsCenter justify="flex-start">
        <Text category="h4" status="success">
          {timeConvert(time)}
        </Text>
        <Text category="subhead" marginTop={6} marginLeft={4}>
          until to draw
        </Text>
      </HStack>
      <Text category="h8" status="primary" marginTop={8}>
        Round #713
      </Text>
      <Button
        children={'Buy Ticket Now'}
        style={styles.button}
        accessoryLeft={<NavigationAction icon='ticket'/>}
      />
      
    </VStack>
  );
});

export default Ticket;

const themedStyles = StyleService.create({
  container: {
    marginTop: 44,
    padding: 16,
  },
  button: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },
});
