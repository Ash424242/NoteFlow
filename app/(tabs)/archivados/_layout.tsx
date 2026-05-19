import { Stack } from 'expo-router';

export default function ArchivadosLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Archivados' }} />
    </Stack>
  );
}
