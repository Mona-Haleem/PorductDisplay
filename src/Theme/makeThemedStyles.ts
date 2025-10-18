import { useMemo } from 'react';
import { StyleSheet, ImageStyle, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from './ThemeContext';
import { AppTheme } from './theme';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export function makeThemedStyles<T extends NamedStyles<T> | NamedStyles<any>>(
  stylesFunc: (theme: AppTheme) => T
) {
  return function useThemedStyles(): T {
    const { theme } = useTheme();
    return useMemo(() => StyleSheet.create(stylesFunc(theme)), [theme]);
  };
}
