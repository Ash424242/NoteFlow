import { StyleSheet, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

import { spacing } from '@/constants/theme';

interface ListSearchHeaderProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function ListSearchHeader({
  value,
  onChangeText,
  placeholder = 'Buscar…',
}: ListSearchHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.search}
        inputStyle={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: spacing.sm,
  },
  search: {
    elevation: 0,
  },
  input: {
    fontSize: 14,
  },
});
