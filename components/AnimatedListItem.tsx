import type { ReactNode } from 'react';
import Animated, { FadeInDown, FadeOutLeft } from 'react-native-reanimated';

interface AnimatedListItemProps {
  children: ReactNode;
}

export function AnimatedListItem({ children }: AnimatedListItemProps) {
  return (
    <Animated.View entering={FadeInDown.duration(280)} exiting={FadeOutLeft.duration(200)}>
      {children}
    </Animated.View>
  );
}
