import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FlexRowCenter } from '../../components/View';
import TextView from '../../components/TextView';

type Props = {};

const Home = (props: Props) => {
  return (
    <FlexRowCenter>
      <TextView style={{ color: 'black' }} size='text_13'>
        test1
      </TextView>
      <TextView style={{ color: 'black' }} size='text_13'>
        test2
      </TextView>
      <TextView style={{ color: 'black' }} size='text_13'>
        test3
      </TextView>
    </FlexRowCenter>
  );
};

export default Home;
