import { View, TextInput, Pressable } from "react-native";
import { useContext, useState } from "react";
import { FlexColumn, FlexRowCenter } from "../../components/View";
import TextView from "../../components/TextView";
import { Role, User } from "../../models/user";
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
import { goBack, navigate } from "../../utils/navigation";
import { AuthContext } from "../../context/authContext";
import uuid from "react-native-uuid";

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
  const { users, setUsers, setUser } = useContext(AuthContext);
  const SignupSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid Email"),
    password: Yup.string().required("Required"),
    displayName: Yup.string().required("Required"),
    dob: Yup.string().required("Required"),
    phonenumber: Yup.string().required("Required"),
  });
  const onSignup = (values: SignUpType) => {
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
    const findUser = users.find((item) => item.email === values.email);
    if (!!!findUser) {
      const newUser: User = {
        id: uuid.v4().toString(),
        displayName: values.displayName,
        email: values.email,
        phoneNumber: values.phonenumber,
        dob: values.dob,
        password: values.password,
        avatar: "",
        projects: [],
        role: Role.USER,
      };
      setUsers((prevState) => [...prevState, newUser]);
      setUser(newUser);
      navigate("home");
    }
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
        initialValues={
          {
            email: "",
            password: "",
            displayName: "",
            dob: moment().format(),
            phonenumber: "",
          } as SignUpType
        }
        onSubmit={onSignup}
        validationSchema={SignupSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          touched,
          setFieldValue,
        }) => (
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
              onChangeText={handleChange("displayName")}
            />
            <TextView size={"text_15"}>Phone Number</TextView>
            <Input
              placeholder="Enter your Phone number"
              onChangeText={handleChange("phonenumber")}
            />
            <FlexRowCenter style={{}}>
              <TextView size={"text_15"}>Birthday</TextView>
              <DateTimePicker
                style={{ display: "flex", width: 190, height: 40 }}
                value={moment(values.dob).toDate()}
                mode={"date"}
                display="default"
                onChange={(e, value) => {
                  setFieldValue(
                    "dob",
                    value ? value.toString() : moment().format()
                  );
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
              <Pressable
                style={{ padding: 2, marginTop: 8 }}
                onPress={() => goBack()}
              >
                <TextView style={{ color: "blue" }} size="text_11">
                  Sign in
                </TextView>
              </Pressable>
            </FlexRowCenter>
          </View>
        )}
      </Formik>
    </FlexColumn>
  );
};

export default Signup;
