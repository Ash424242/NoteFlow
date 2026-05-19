import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';

export default function NuevaNotaScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="bodyLarge">
        Formulario para tipo: {type ?? 'note'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
});
