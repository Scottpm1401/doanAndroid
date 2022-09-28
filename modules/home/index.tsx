import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FlexRowCenter, FlexColumn } from '../../components/View';
import TextView from '../../components/TextView';
import DefaultModal from '../../components/DefaultModal';
import Logo from '../../assets/svg/ic_izi_logo.svg';
import { v4 as v4uuid } from 'uuid';

type Props = {};

const Home = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FlexColumn style={{ margin: 8 }}>
      <Item />
      <Item />
      <Item />
    </FlexColumn>
  );
};

const Item = () => {
  return (
    <FlexRowCenter style={{ marginBottom: 8 }}>
      <Logo style={{ width: 64, height: 64 }} />
      <FlexColumn style={{ marginLeft: 16 }}>
        <TextView size='text_16'>Test</TextView>
        <TextView size='text_13'>Test</TextView>
      </FlexColumn>
    </FlexRowCenter>
  );
};

export default Home;
