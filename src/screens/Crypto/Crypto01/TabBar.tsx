import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import {useTheme} from '@ui-kitten/components';
import Animated from 'react-native-reanimated';
import {Text} from 'components';
import useLayout from 'hooks/useLayout';

interface ItemProps {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBar = ({style, activeIndex, onChange, tabs}: ItemProps) => {
  const theme = useTheme();
  const AniButton = Animated.createAnimatedComponent(TouchableOpacity);
  const {width} = useLayout();
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeIndex],
  );
  const refScrollView = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 80 + 8 - (width - 250) / 2,
      animated: true,
    });
  }, [activeIndex]);
  return (
    <View>
      <ScrollView
        contentContainerStyle={[styles.container, style]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={refScrollView}>
        {tabs.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <AniButton
              key={index}
              style={[
                styles.btn,
                {
                  backgroundColor: isActive
                    ? theme['background-basic-color-5']
                    : theme['background-basic-color-2'],
                },
              ]}
              onPress={() => changeIndex(index)}
              activeOpacity={0.7}>
              <Text
                capitalize
                status={isActive ? 'white' : 'basic'}
                category={'h8'}>
                {item}
              </Text>
            </AniButton>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  btn: {
    marginRight: 16,
    flexDirection: 'row',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
});
