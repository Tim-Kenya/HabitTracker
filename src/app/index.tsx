import { useState, useCallback, useRef, useEffect } from 'react';
import { View, FlatList, Animated } from 'react-native';
import SlideItem from '../components/SlideItem';
import DotIndicator from '../components/DotIndicator';
import NavButtons from '../components/NavButtons';
import { Slide } from '../types';

const slides: Slide[] = [
  { id: '1', image: require('../../assets/images/slide1.png'), title: 'Welcome', description: 'Discover amazing things with our app' },
  { id: '2', image: require('../../assets/images/slide2.png'), title: 'Stay Organised', description: 'Keep track of everything in one place' },
  { id: '3', image: require('../../assets/images/slide3.png'), title: 'Get Started', description: 'Join thousands of users today' },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const dotAnimations = useRef(slides.map(() => new Animated.Value(8))).current;

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  useEffect(() => {
    slides.forEach((_, index) => {
      Animated.spring(dotAnimations[index], {
        toValue: index === activeIndex ? 20 : 8,
        useNativeDriver: false,
      }).start();
    });
  }, [activeIndex]);

  const goToNext = () => {
    const nextIndex = activeIndex + 1;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    setActiveIndex(nextIndex);
  };

  const skip = () => {
    const lastIndex = slides.length - 1;
    flatListRef.current?.scrollToIndex({ index: lastIndex, animated: true });
    setActiveIndex(lastIndex);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => <SlideItem item={item} />}
      />
      <DotIndicator
        slides={slides}
        activeIndex={activeIndex}
        dotAnimations={dotAnimations}
      />
      <NavButtons
        isLastSlide={activeIndex === slides.length - 1}
        onSkip={skip}
        onNext={goToNext}
        onGetStarted={() => console.log('Navigate to Home')}
      />
    </View>
  );
}