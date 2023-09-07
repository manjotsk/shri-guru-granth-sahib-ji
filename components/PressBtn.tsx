import React from "react";
import { Text } from "../components/Themed";
import { Pressable } from "react-native";

const PressBtn = ({ navigation }: any) => {
  return (
    <Pressable onPress={() => navigation.navigate("Loginscreen")}>
      <Text
        style={{
          fontSize: 15,
          fontFamily: "Lora-Regular",
          textAlign: "center",
        }}
      >
        {" "}
        Already have an Account?{" "}
        <Text
          style={{ color: "blue", fontSize: 15, fontFamily: "Lora-Regular" }}
        >
          Sign in
        </Text>
      </Text>
    </Pressable>
  );
};
export default PressBtn;
