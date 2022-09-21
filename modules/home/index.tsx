import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { FlexRowCenter, FlexColumn } from '../../components/View';
import TextView from '../../components/TextView';
import DefaultModal from '../../components/DefaultModal';

type Props = {};

const Home = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FlexRowCenter>
      <Pressable onPress={() => setIsOpen(true)}>
        <TextView size={'text_11'}>Test</TextView>
      </Pressable>
      <DefaultModal
        isModalOpen={isOpen}
        setIsModalOpen={() => setIsOpen(false)}
      >
        <TextView size={'text_11'}>asdsadadad</TextView>
      </DefaultModal>
    </FlexRowCenter>
  );
};

export default Home;
