import { FlatList } from "react-native";
import React, { useState } from "react";
import { FlexRowCenter, FlexColumn } from "../../components/View";
import TextView from "../../components/TextView";

import { mockListSprint, Sprint } from "../../models/sprint";
import SprintItem from "../../components/SprintItem";

type Props = {};

const Home = (props: Props) => {
  const renderSprint = ({ item }: { item: Sprint }) => {
    return <SprintItem props={item} />;
  };

  return (
    <FlexColumn
      style={{
        backgroundColor: "black",
        height: "100%",
      }}
    >
      <FlexColumn>
        <TextView style={{ color: "blue", paddingLeft: 250 }} size="text_15">
          Create issue
        </TextView>
      </FlexColumn>
      <FlexColumn style={{ paddingRight: 8 }}>
        <FlatList
          data={mockListSprint}
          renderItem={renderSprint}
          keyExtractor={(item) => item.id}
        />
      </FlexColumn>
    </FlexColumn>
  );
};

export default Home;
