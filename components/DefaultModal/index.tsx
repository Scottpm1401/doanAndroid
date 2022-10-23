import IcCircleClose from "../../assets/svg/ic_circle_close.svg";
import Logo from "../../assets/svg/ic_izi_logo.svg";
import React, { useCallback, useMemo } from "react";
import {
  Dimensions,
  ScrollView,
  StyleProp,
  View,
  ViewStyle,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import styled from "styled-components/native";
import { isWeb } from "../../utils/platform";
import IcClose from "../../assets/svg/ic_close.svg";
import { SafeAreaView } from "react-native";

type ModalType = {
  isModalOpen: boolean;
  setIsModalOpen: () => void;
  style?: StyleProp<ViewStyle> | undefined;
  bodyStyle?: StyleProp<ViewStyle> | undefined;
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  isHiddenLogo?: boolean;
  isHiddenIcon?: boolean;
};

const ModalHeader = styled.View({
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

const ModalFooter = styled.View({
  width: "100%",
});

const ModalContent = styled.View`
  align-items: center;
  width: 100%;
  height: 100%;
  align-self: center;
  border-radius: 24px;
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
  isHiddenIcon = false,
}: ModalType) => {
  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isModalOpen}
      collapsable
      style={[style, { margin: 0 }]}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "transparent" }}>
        <ModalContent style={bodyStyle}>
          <ModalHeader>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Pressable
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 32,
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
                onPress={setIsModalOpen}
              >
                {!isHiddenIcon && (
                  <IcClose width={24} height={24} fill="white" />
                )}
              </Pressable>
            </View>
            {title ? title : <View style={{ flex: 1 }} />}
            {!isHiddenLogo && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Logo width={32} height={32} />
              </View>
            )}
          </ModalHeader>
          <ScrollView
            style={{
              maxHeight: isWeb()
                ? "80vh"
                : Dimensions.get("screen").height * 0.8,
              width: "100%",
            }}
          >
            {children}
          </ScrollView>
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalContent>
      </SafeAreaView>
    </Modal>
  );
};

export default DefaultModal;
