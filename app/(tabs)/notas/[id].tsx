import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

import { spacing } from '@/constants/theme';

export default function NotaDetalleScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineSmall">Detalle de nota</Text>
      <Text variant="bodyMedium" style={{ marginTop: spacing.sm }}>
        ID: {id}
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
