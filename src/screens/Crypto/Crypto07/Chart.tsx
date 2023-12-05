import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {StyleService, useStyleSheet, Layout} from '@ui-kitten/components';
import useLayout from 'hooks/useLayout';
import Text from 'components/Text';
import {
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory-native';
import {HStack, VStack} from 'components';

interface Props {
  x: number;
  y: number;
  date?: string;
}
interface ItemProps {
  data1Day: Props[];
  data7Day: Props[];
  data1Month: Props[];
  data3Month: Props[];
  dataAll: Props[];
  style?: StyleProp<ViewStyle>;
  strokeColor: string;
}

const Chart = ({
  data1Day,
  data7Day,
  data1Month,
  dataAll,
  data3Month,
  style,
  strokeColor,
}: ItemProps) => {
  const {height, width} = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [activeTab, setActiveTab] = React.useState(0);
  const [data, setData] = React.useState(data1Day);
  React.useEffect(() => {}, [
    activeTab,
    data1Day,
    data1Month,
    data3Month,
    data7Day,
    dataAll,
  ]);
  return (
    <Layout
      style={[styles.container, style]}
      level="2"
      onLayout={e => console.log(e.nativeEvent.layout.height)}>
      <HStack>
        <VStack
          mt={24}
          ml={16}
          style={{position: 'absolute', top: 0, left: 0, zIndex: 100}}>
          <Text category="c1" status="platinum" marginBottom={32}>
            $10M
          </Text>
          <Text category="c1" status="platinum" marginBottom={32}>
            $8M
          </Text>
          <Text category="c1" status="platinum" marginBottom={32}>
            $6M
          </Text>
          <Text category="c1" status="platinum" marginBottom={32}>
            $4M
          </Text>
          <Text category="c1" status="platinum" marginBottom={32}>
            $2M
          </Text>
        </VStack>
        <VictoryChart
          maxDomain={{y: 150}}
          width={width - 36}
          height={285 * (812 / height)}
          padding={{left: -1, bottom: 0, right: 0, top: 0}}>
          <VictoryLine
            y0={() => 40}
            animate={{
              duration: 2000,
              onLoad: {duration: 1000},
            }}
            interpolation={'catmullRom'}
            style={{
              data: {
                stroke: strokeColor,
                strokeWidth: 2,
              },
            }}
            data={data}
          />
        </VictoryChart>
      </HStack>
      <Layout style={styles.label} level="2">
        {tab.map((item, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setActiveTab(i);
                switch (i) {
                  case 0:
                    return setData(data1Day);
                  case 1:
                    return setData(data7Day);
                  case 2:
                    return setData(data1Month);
                  case 3:
                    return setData(data3Month);
                  case 4:
                    return setData(dataAll);
                  default:
                    break;
                }
              }}>
              <Text
                category="h7"
                status={activeTab === i ? 'basic' : 'placeholder'}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Layout>
    </Layout>
  );
};

export default Chart;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'color-basic-900',
    marginTop: 24,
  },
  topCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 16,
  },
  label: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    marginTop: -4,
    paddingTop: 22,
    borderRadius: 8,
    marginBottom: 16,
  },
});

const tab = ['1D', '7D', '1M', '3M', 'All'];
