import * as React from 'react';

declare module 'react-native' {
  declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';
    const content: React.FC<SvgProps>;
    export default content;
  }

  declare module '*.png' {
    const value: string;
    export default value;
  }

  interface PressableStateCallbackType {
    hovered?: boolean;
    focused?: boolean;
  }

  interface ViewStyle {
    transitionProperty?: string;
    transitionDuration?: string;
  }

  interface TextProps {
    accessibilityComponentType?: never;
    accessibilityTraits?: never;
    href?: string;
    hrefAttrs?: {
      rel: 'noreferrer';
      target?: '_blank';
    };
  }

  interface ViewProps {
    accessibilityRole?: string;
    href?: string;
    hrefAttrs?: {
      rel: 'noreferrer';
      target?: '_blank';
    };
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  }
}
