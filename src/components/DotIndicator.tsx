import { View, Animated } from 'react-native';
import { Slide } from '../types';

interface Props {
  slides: Slide[];
  activeIndex: number;
  dotAnimations: Animated.Value[];
}

export default function DotIndicator({ slides, activeIndex, dotAnimations }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
      {slides.map((_, index) => (
        <Animated.View
          key={index}
          style={{
            width: dotAnimations[index],
            height: 8,
            borderRadius: 4,
            backgroundColor: index === activeIndex ? '#333' : '#ccc',
            marginHorizontal: 4,
          }}
        />
      ))}
    </View>
  );
}