import * as Haptics from 'expo-haptics';
import { Alert } from 'react-native';

export function useConfirmDelete(onConfirm: () => void) {
  return () => {
    Alert.alert(
      'Eliminar',
      '¿Seguro que quieres eliminar este elemento? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onConfirm();
          },
        },
      ],
    );
  };
}
