import { View, Text, TextInput, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import TextView from "../../components/TextView";
import { userlist } from "../../models/user";
import styled from "styled-components/native";
import { navigate } from "../../utils/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../context/authContext";
import { Button } from "native-base";

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
  const { setUser, users } = useContext(AuthContext);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid Email"),
    password: Yup.string().required("Required"),
  });

  const onLogin = (values: LoginType) => {
    const findUser = users.find((item) => item.email === values.email);
    if (!!findUser) {
      if (findUser.password === values.password) {
        setUser(findUser);
        navigate("home");
      }
    }
  };

  return (
    <FlexRowCenter
      style={{
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Formik
        initialValues={
          {
            email: "",
            password: "",
          } as LoginType
        }
        validationSchema={LoginSchema}
        onSubmit={onLogin}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
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
            <TextView style={{ marginBottom: 2 }} size={"text_16"}>
              Email
            </TextView>
            <Input
              placeholder="Enter your email"
              onChangeText={handleChange("email")}
              style={{ marginBottom: 8 }}
            />
            <TextView style={{ marginBottom: 2 }} size={"text_16"}>
              Password
            </TextView>
            <Input
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={handleChange("password")}
              style={{ marginBottom: 8 }}
            />

            <Button
              colorScheme="secondary"
              marginTop="1"
              size="sm"
              onPress={() => handleSubmit()}
            >
              <TextView
                style={{ color: "white" }}
                size="text_20"
                fontWeight="bold"
              >
                LOGIN
              </TextView>
            </Button>
            <FlexRowCenter>
              <TextView style={{ marginTop: 8 }} size="text_14">
                Not have account?
              </TextView>
              <Pressable
                style={{ marginTop: 8 }}
                onPress={() => navigate("signup")}
              >
                <TextView
                  style={{ color: "blue", marginLeft: 4 }}
                  size="text_14"
                >
                  Sign up
                </TextView>
              </Pressable>
            </FlexRowCenter>
          </View>
        )}
      </Formik>
    </FlexRowCenter>
  );
};

export default Login;
