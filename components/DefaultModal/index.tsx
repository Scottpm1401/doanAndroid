import IcCircleClose from '../../assets/svg/ic_circle_close.svg';
import Logo from '../../assets/svg/ic_izi_logo.svg';
import React, { useCallback, useMemo } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { isWeb } from '../../utils/platform';

type ModalType = {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  bodyStyle?: StyleProp<ViewStyle> | undefined;
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  isHiddenLogo?: boolean;
};

const ModalHeader = styled.View({
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ModalFooter = styled.View({
  width: '100%',
});

const ModalContent = styled.View`
  align-items: center;
  width: ${isWeb() ? '664px' : Dimensions.get('screen').width * 0.9};
  align-self: center;
  border-radius: 24px;
  padding: 16px 32px;
`;

const DefaultModal = ({
  isModalOpen,
  setIsModalOpen,
  style,
  children,
  isHiddenLogo = false,
  title,
  footer,
  bodyStyle,
}: ModalType) => {
  return (
    <Modal
      animationIn='fadeIn'
      animationOut='fadeOut'
      isVisible={isModalOpen}
      collapsable
      style={[style, {}]}
    >
      <ModalContent style={bodyStyle}>
        <ModalHeader>
          {title ? title : <View style={{ flex: 1 }} />}
          {!isHiddenLogo && (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Logo width={32} height={32} />
            </View>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
            <Pressable
              style={{
                width: 32,
                height: 32,
                borderRadius: 32,
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
              onPress={setIsModalOpen}
            >
              <IcCircleClose width={24} height={24} />
            </Pressable>
          </View>
        </ModalHeader>
        <ScrollView
          style={{
            maxHeight: isWeb() ? '80vh' : Dimensions.get('screen').height * 0.8,
            width: '100%',
          }}
        >
          {children}
        </ScrollView>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default DefaultModal;
