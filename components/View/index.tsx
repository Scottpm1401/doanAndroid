import TextView from '../TextView';
import { Platform, View } from 'react-native';
import styled from 'styled-components/native';

export const FlexRowCenter = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 1,
});

export const FlexColumn = styled.View({
  flexDirection: 'column',
});

export const TextViewStyles = styled(TextView)`
  margin-bottom: 24px;
  color: white;
`;

export const TextViewSubStyles = styled(TextView)`
  margin-bottom: 4px;
  color: white;
`;

export const FormItem = styled(View)<{ isMobileOrTablet?: boolean }>`
  margin-bottom: 24px;
  flex-direction: ${(props) => (props?.isMobileOrTablet ? 'column' : 'row')};
  align-items: flex-start;
  z-index: 2;
  flex: 2 1 auto;
  width: 100%;
`;

export const FormItemDesc = styled(TextView)`
  color: ${(props: any) => props.theme.color_text_placeholder};
`;

export const ViewStyle = styled(View)`
  all: unset;
`;
