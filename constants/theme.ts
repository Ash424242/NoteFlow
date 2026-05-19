import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

/** Paleta base de NoteFlow */
export const palette = {
  primary: '#4F46E5',
  primaryContainer: '#E0E7FF',
  secondary: '#0D9488',
  secondaryContainer: '#CCFBF1',
  error: '#DC2626',
  surfaceLight: '#FFFFFF',
  surfaceDark: '#1C1C1E',
  backgroundLight: '#F8FAFC',
  backgroundDark: '#0F0F10',
  textPrimaryLight: '#0F172A',
  textSecondaryLight: '#64748B',
  textPrimaryDark: '#F8FAFC',
  textSecondaryDark: '#94A3B8',
  ideaColors: ['#FEF3C7', '#DBEAFE', '#FCE7F3', '#D1FAE5', '#EDE9FE'],
} as const;

/** Escala tipográfica (tamaños en sp) */
export const typography = {
  display: 32,
  title: 24,
  headline: 20,
  body: 16,
  label: 14,
  caption: 12,
} as const;

/** Espaciados base (dp) */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: palette.primary,
    primaryContainer: palette.primaryContainer,
    secondary: palette.secondary,
    secondaryContainer: palette.secondaryContainer,
    background: palette.backgroundLight,
    surface: palette.surfaceLight,
    onSurface: palette.textPrimaryLight,
    onSurfaceVariant: palette.textSecondaryLight,
    error: palette.error,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#818CF8',
    primaryContainer: '#312E81',
    secondary: '#2DD4BF',
    secondaryContainer: '#134E4A',
    background: palette.backgroundDark,
    surface: palette.surfaceDark,
    onSurface: palette.textPrimaryDark,
    onSurfaceVariant: palette.textSecondaryDark,
    error: '#F87171',
  },
};
