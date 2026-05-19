import { useColorScheme } from 'react-native';
import type { MD3Theme } from 'react-native-paper';

import { darkTheme, lightTheme } from '@/constants/theme';

export function useAppTheme(): MD3Theme {
  const colorScheme = useColorScheme();
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}
