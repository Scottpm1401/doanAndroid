import { ReactNode } from 'react';
import { Platform } from 'react-native';

export const isWeb = () => Platform.OS === 'web';

export const conditionallyRender = ({
  web,
  mobile,
}: {
  web: JSX.Element;
  mobile: JSX.Element;
}) => {
  if (Platform.OS === 'web') {
    return web;
  }

  return mobile;
};
