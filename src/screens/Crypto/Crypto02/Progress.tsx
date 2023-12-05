import * as React from 'react';
import {
  Layout,
  StyleService,
  useStyleSheet,
  useTheme,
} from '@ui-kitten/components';

import {VStack} from 'components';
import ProgressBar from 'components/ProgressBar';

interface ProgressBarProps {
  progress: number;
}

const Progress = React.memo(({progress}: ProgressBarProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  return (
    <VStack style={styles.container}>
      <Layout style={styles.dot} level={progress > 0 ? '12' : '3'} />
      <ProgressBar
        containColor={theme['background-basic-color-3']}
        progressColor={theme['background-basic-color-12']}
        progress={progress}
        style={styles.bar}
        styleBar={styles.bar}
      />
      <Layout
        style={[styles.dot, {left: '33%'}]}
        level={progress > 0.3 ? '12' : '3'}
      />
      <Layout
        style={[styles.dot, {left: '66%'}]}
        level={progress > 0.6 ? '12' : '3'}
      />
      <Layout
        style={[styles.dot, {left: '95%'}]}
        level={progress > 1 ? '12' : '3'}
      />
    </VStack>
  );
});

export default Progress;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 7,
  },
  bar: {
    height: 6,
    zIndex: -10,
  },
  dot: {
    height: 20,
    width: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    borderRadius: 99,
  },
});
