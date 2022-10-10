import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FlexRowCenter, FlexColumn } from "../../components/View";
import TextView from "../../components/TextView";
import DefaultModal from "../../components/DefaultModal";
import Logo from "../../assets/svg/ic_izi_logo.svg";

type Props = {};

const Home = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FlexColumn style={{ marginHorizontal: 8, marginVertical: 10 }}>
      <FlexColumn>
        <TextView style={{ color: "blue", paddingLeft: 250 }} size="text_15">
          Create issue
        </TextView>
      </FlexColumn>
      <FlexColumn style={{ paddingRight: 8 }}>
        <TextView style={{ paddingBottom: 8 }} size="text_14">
          Quick access
        </TextView>
        <Item />
        <Item />
        <Item />
      </FlexColumn>
      <FlexColumn>
        <TextView size="text_14">Recent issues</TextView>
      </FlexColumn>
    </FlexColumn>
  );
};

const Item = () => {
  return (
    <FlexRowCenter style={{ marginBottom: 8 }}>
      <Logo style={{ width: 64, height: 64 }} />
      <FlexColumn style={{ marginLeft: 16 }}>
        <TextView size="text_18">Test</TextView>
        <TextView size="text_13">Test</TextView>
      </FlexColumn>
    </FlexRowCenter>
  );
};

export default Home;
