import { View, Image, Text, Dimensions } from 'react-native';
import { Slide } from '../types';

const { width } = Dimensions.get('window');

interface Props {
  item: Slide;
}

export default function SlideItem({ item }: Props) {
  return (
    <View style={{ width, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={item.image} style={{ width: 300, height: 300, resizeMode: 'contain' }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 20 }}>{item.title}</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 10 }}>{item.description}</Text>
    </View>
  );
}