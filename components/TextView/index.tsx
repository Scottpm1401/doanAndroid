// import { Theme } from 'app/theme';
import React, { ReactNode, useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { useTheme } from 'styled-components/native';

export type TextViewProps = {
  children?: ReactNode;
  size:
    | 'text_11'
    | 'text_12'
    | 'text_13'
    | 'text_14'
    | 'text_15'
    | 'text_16'
    | 'text_18'
    | 'text_24'
    | 'text_20'
    | 'text_22'
    | 'text_30'
    | 'text_32'
    | 'text_36'
    | 'text_48'
    | 'text_52';
  fontWeight?: 'bold' | 'normal';
  color?:
    | 'base'
    | 'base_inverse'
    | 'secondary'
    | 'placeholder'
    | 'disabled'
    | 'caption'
    | 'paragraph'
    | 'link_primary'
    | 'link_secondary'
    | 'error';
} & TextProps;

const styles = StyleSheet.create({
  text_11: {
    fontSize: 11,
    lineHeight: 15,
  },
  text_13: {
    fontSize: 13,
    lineHeight: 18,
  },
  text_16: {
    fontSize: 16,
    lineHeight: 24,
  },
  text_14: {
    fontSize: 14,
    lineHeight: 20,
  },
  text_15: {
    fontSize: 15,
    lineHeight: 22,
  },
  text_18: {
    fontSize: 18,
    lineHeight: 26,
  },
  text_20: {
    fontSize: 20,
    lineHeight: 28,
  },
  text_22: {
    fontSize: 22,
    lineHeight: 28,
  },
  text_12: {
    fontSize: 12,
    lineHeight: 16,
  },
  text_24: {
    fontSize: 24,
  },
  text_30: {
    fontSize: 30,
    lineHeight: 38,
  },
  text_32: {
    fontSize: 32,
    lineHeight: 46,
  },
  text_36: {
    fontSize: 36,
    lineHeight: 46,
  },
  text_48: {
    fontSize: 48,
    lineHight: 46,
  },
  text_52: {
    fontSize: 52,
    lineHeight: 46,
  },
});

const TextView = ({
  children,
  size,
  fontWeight,
  style,
  color = 'base_inverse',
  ...props
}: TextViewProps) => {
  // const theme: Theme = useTheme();
  // const textColor = useMemo(
  //   () =>
  //     StyleSheet.create({
  //       base: {
  //         color: theme.color_text_base,
  //       },
  //       base_inverse: {
  //         color: theme.color_text_base_inverse,
  //       },
  //       secondary: {
  //         color: theme.color_text_secondary,
  //       },
  //       placeholder: {
  //         color: theme.color_text_placeholder,
  //       },
  //       disable: {
  //         color: theme.color_text_disabled,
  //       },
  //       paragraph: {
  //         color: theme.color_text_paragraph,
  //       },
  //       link_primary: {
  //         color: theme.color_text_primary,
  //       },
  //       link_secondary: {
  //         color: theme.color_text_second,
  //       },
  //       error: {
  //         color: theme.color_text_third,
  //       },
  //       caption: {
  //         color: theme.color_text_caption,
  //       },
  //       disabled: {
  //         color: theme.color_text_disabled,
  //       },
  //     }),
  //   [
  //     theme.color_text_base,
  //     theme.color_text_base_inverse,
  //     theme.color_text_caption,
  //     theme.color_text_disabled,
  //     theme.color_text_paragraph,
  //     theme.color_text_placeholder,
  //     theme.color_text_primary,
  //     theme.color_text_second,
  //     theme.color_text_secondary,
  //     theme.color_text_third,
  //   ]
  // );
  return (
    <Text
      style={[
        {
          fontWeight: fontWeight === 'bold' ? '700' : '400',
          fontFamily: fontWeight === 'bold' ? 'lexend_bold' : 'lexend',
        },
        styles?.[size] || {},
        // textColor?.[color],
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default TextView;
