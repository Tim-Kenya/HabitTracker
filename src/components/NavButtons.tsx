import { View, TouchableOpacity, Text } from 'react-native';

interface Props {
  isLastSlide: boolean;
  onSkip: () => void;
  onNext: () => void;
  onGetStarted: () => void;
}

export default function NavButtons({ isLastSlide, onSkip, onNext, onGetStarted }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
      {isLastSlide ? (
        <TouchableOpacity onPress={onGetStarted}>
          <Text>Get Started</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={onSkip}>
            <Text>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext}>
            <Text>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}