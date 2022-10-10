import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import TextView from "../../components/TextView";
import { userlist } from "../../models/user";
import styled from "styled-components/native";

type LoginType = { email: string; password: string };

const Input = styled(TextInput)({
  borderWidth: 1,
  borderColor: "grey",
  paddingVertical: 8,
  width: "100%",
  paddingHorizontal: 8,
  borderRadius: 8,
});

const Login = () => {
  const [data, setData] = useState(userlist);
  const [user, setUser] = useState<LoginType>({
    email: "",
    password: "",
  });
  return (
    <FlexRowCenter
      style={{
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <View
        style={{
          padding: 16,
          backgroundColor: "white",
          shadowColor: "rgba(0,0,0,10%)",
          shadowOpacity: 0.5,
          shadowOffset: { height: 2, width: 4 },
          borderRadius: 8,
          width: 200,
        }}
      >
        <TextView size={"text_15"}>Email</TextView>
        <Input
          placeholder="Enter your email"
          onChangeText={(value) => {
            setUser((prevState) => ({ ...prevState, email: value }));
          }}
        />
        <TextView size={"text_15"}>Password</TextView>
        <Input
          secureTextEntry
          placeholder="Enter your password"
          onChangeText={(value) => {
            setUser((prevState) => ({ ...prevState, password: value }));
          }}
        />

        <Pressable
          style={{
            backgroundColor: "rgb(52,179,228)",
            borderWidth: 3,
            alignItems: "center",
            marginTop: 8,
          }}
          onPress={() => console.log(user)}
        >
          <TextView style={{}} size="text_20">
            LOGIN
          </TextView>
        </Pressable>
        <FlexRowCenter>
          <TextView style={{ marginTop: 8 }} size="text_11">
            Not have account?
          </TextView>
          <TextView style={{ color: "blue", marginTop: 8 }} size="text_11">
            Sign up
          </TextView>
        </FlexRowCenter>
      </View>
    </FlexRowCenter>
  );
};

export default Login;
