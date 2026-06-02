import { FlashList, type FlashListProps } from '@shopify/flash-list';

/** Wrapper mínimo para centralizar el uso de FlashList en la app. */
export type AppFlashListProps<T> = FlashListProps<T>;

export function AppFlashList<T>(props: AppFlashListProps<T>) {
  return <FlashList {...props} />;
}
