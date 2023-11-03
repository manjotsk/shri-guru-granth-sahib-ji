import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { View, Text } from "../components/Themed";
const { height, width } = Dimensions.get("screen");

const Forgetpassword = ({ navigation }: any) => {
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef()];
  const [inputs, setInputs] = useState(["", "", "", ""]);

  const handleInputChange = (text, index) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = text;
    setInputs(updatedInputs);

    // Check if the typed text is a number and move to the next input
    if (/^\d+$/.test(text) && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  const submit = () => {
    navigation.navigate("ResetPassword");
  };
  const text = "Verify";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            margin: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "center",
              padding: 20,
            }}
          >
            Verify Code
          </Text>
          <Text style={{ textAlign: "center", color: "rgb(200,200,200)" }}>
            Please enter the code we just send to email{"\n"} example@gmail.com
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            padding: 20,
          }}
        >
          {inputs.map((text, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              placeholder="-"
              onChangeText={(text) => handleInputChange(text, index)}
              value={text}
              keyboardType="number-pad"
              placeholderTextColor={"black"}
              textAlign="center"
              maxLength={1}
              style={styles.txtinput}
            />
          ))}
        </View>
        <View style={{ justifyContent: "center", padding: 10 }}>
          <Text style={{ textAlign: "center" }}>Didn't receive OTP?</Text>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              textDecorationLine: "underline",
            }}
          >
            Resend Code
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity onPress={submit} style={styles.btn}>
            <Text
              style={{
                color: "#fff",
                fontSize: 17,
                textAlign: "center",
                fontFamily: "Lora-Regular",
              }}
            >
              {text}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Forgetpassword;

const styles = StyleSheet.create({
  txtinput: {
    padding: 15,
    backgroundColor: "rgb(230,230,230)",
    borderRadius: 10,
    fontSize: 17,
    width: width * 0.15,
  },
  btn: {
    backgroundColor: "#E1372D",
    width: width * 0.4,
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
});
