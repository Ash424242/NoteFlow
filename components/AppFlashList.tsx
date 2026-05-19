import { FlashList, type FlashListProps } from '@shopify/flash-list';

/**
 * Wrapper de FlashList que exige estimatedItemSize (requisito del enunciado).
 * Centraliza la prop para mantener valores coherentes con constants/listSizes.ts.
 */
export type AppFlashListProps<T> = FlashListProps<T> & {
  estimatedItemSize: number;
};

export function AppFlashList<T>(props: AppFlashListProps<T>) {
  return <FlashList {...props} />;
}
