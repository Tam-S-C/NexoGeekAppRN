import React, { useRef, useState } from 'react';
import { StyleSheet, View, Animated, Pressable} from 'react-native';

const AnimationExample = () => {

  const scaleAnim = useRef(new Animated.Value(1)).current; 
  const rotateAnim = useRef(new Animated.Value(0)).current; 

  const [currentImage, setCurrentImage] = useState(1); 
  const [isAnimating, setIsAnimating] = useState(false); 

  const toggleAnimation = () => {
    if (isAnimating) return; 
    setIsAnimating(true);

    Animated.parallel([

      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),

      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, 
          duration: 250,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, 
          duration: 250,
          useNativeDriver: false,
        }),
      ]),
    ]).start(() => {

      setCurrentImage((prev) => (prev === 1 ? 2 : 1)); 
      rotateAnim.setValue(0); 
      setIsAnimating(false); 
    });
  };


  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAnimation}>
        <Animated.Image
          source={
            currentImage === 1
              ? require('../../assets/jiggly1.png') 
              : require('../../assets/jiggly2.png') 
          }
          style={[
            styles.image,
            {
              transform: [{ scale: scaleAnim }, { rotate: rotateInterpolate }],
            },
          ]}
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};

export default AnimationExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40
  },
  image: {
    width: 180,
    height: 180,
  },
});
