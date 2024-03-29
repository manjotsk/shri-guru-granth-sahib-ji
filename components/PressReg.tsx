import { Pressable } from "react-native";
import { Text } from "../components/Themed";
import React from "react";

const PressReg = ({ navigation }: any) => {
  return (
    <Pressable onPress={() => navigation.navigate("RegistrationScreen")}>
      <Text
        style={{
          fontSize: 17,
          fontFamily: "Lora-Regular",
          textAlign: "center",
          padding: 10,
        }}
      >
        {" "}
        Not a member?{" "}
        <Text
          style={{ color: "blue", fontSize: 17, fontFamily: "Lora-Regular" }}
        >
          Register now
        </Text>
      </Text>
    </Pressable>
  );
};

export default PressReg;
