import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import TextView from "../../components/TextView";
import { userlist } from "../../models/user";
import styled from "styled-components/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import {
  isPossibleNumber,
  isValidNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
  PhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import { Formik } from "formik";
import * as Yup from "yup";

type SignUpType = {
  email: string;
  password: string;
  displayName: string;
  dob: string;
  phonenumber: string;
};

const Input = styled(TextInput)({
  borderWidth: 1,
  borderColor: "grey",
  paddingVertical: 8,
  width: "100%",
  paddingHorizontal: 8,
  borderRadius: 8,
});

const Signup = () => {
  const [isShow, setIsShow] = useState<Boolean>(false);
  const [data, setData] = useState(userlist);
  const [user, setUser] = useState<SignUpType>({
    email: "",
    password: "",
    displayName: "",
    dob: moment().format(),
    phonenumber: "",
  });
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid Email"),
    password: Yup.string().required("Required"),
    displayName: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    phonenumber: Yup.string().required("Required"),
  });
  const onSignup = (values: any) => {
    // if (
    //   isPossibleNumber(user.phonenumber, "VN") &&
    //   isValidPhoneNumber(user.phonenumber, "VN") &&
    //   validatePhoneNumberLength(user.phonenumber, "VN") === undefined
    // ) {
    //   const number = parsePhoneNumber(user.phonenumber, "VN");
    //   console.log(
    //     number.formatInternational(),
    //     number.country,
    //     number.getType()
    //   );
    // } else console.log("error");
    console.log(values);
  };
  return (
    <FlexColumn
      style={{
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={user}
        onSubmit={onSignup}
        validationSchema={SignupSchema}
      >
        {({ handleChange, values, handleSubmit, errors, touched }) => (
          <View
            style={{
              padding: 16,
              backgroundColor: "white",
              shadowColor: "rgba(0,0,0,10%)",
              shadowOpacity: 0.5,
              shadowOffset: { height: 2, width: 4 },
              borderRadius: 8,
              width: 280,
            }}
          >
            <TextView size={"text_15"}>Name</TextView>
            <Input
              placeholder="Enter your Name"
              onChangeText={(value) => {
                setUser((prevState) => ({ ...prevState, displayName: value }));
              }}
            />
            <TextView size={"text_15"}>Phone Number</TextView>
            <Input
              placeholder="Enter your Phone number"
              onChangeText={(value) => {
                setUser((prevState) => ({ ...prevState, phonenumber: value }));
              }}
            />
            <FlexRowCenter style={{}}>
              <TextView size={"text_15"}>Birthday</TextView>
              <DateTimePicker
                style={{ display: "flex", width: 190, height: 40 }}
                value={moment(user.dob).toDate()}
                mode={"date"}
                display="default"
                onChange={(e, value) => {
                  setUser((prevState) => ({
                    ...prevState,
                    dob: value ? value.toString() : moment().format(),
                  }));
                }}
              />
            </FlexRowCenter>

            <TextView size={"text_15"}>Email</TextView>

            <Input
              placeholder="Enter your email"
              onChangeText={handleChange("email")}
            />
            {errors.email && touched.email && (
              <TextView size="text_11">{errors.email}</TextView>
            )}
            <TextView size={"text_15"}>Password</TextView>
            <Input
              secureTextEntry
              placeholder="Enter your password"
              onChangeText={handleChange("password")}
            />
            {errors.password && touched.password && (
              <TextView size="text_11">{errors.password}</TextView>
            )}

            <Pressable
              style={{
                backgroundColor: "rgb(52,179,228)",
                borderWidth: 3,
                alignItems: "center",
                marginTop: 8,
              }}
              onPress={() => handleSubmit()}
            >
              <TextView style={{}} size="text_20">
                Sign Up
              </TextView>
            </Pressable>
            <FlexRowCenter>
              <TextView style={{ marginTop: 8 }} size="text_11">
                Already have account?
              </TextView>
              <TextView
                style={{ padding: 2, color: "blue", marginTop: 8 }}
                size="text_11"
              >
                Sign in
              </TextView>
            </FlexRowCenter>
          </View>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default Signup;
