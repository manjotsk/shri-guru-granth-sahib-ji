import React from "react";
import { Pressable } from "react-native";
import { Text } from "./Themed";

const LoginButton = ({ navigation }: any) => {
  return (
    <Pressable onPress={() => navigation.navigate("Loginscreen")}>
      <Text style={{ paddingHorizontal: 10, fontSize: 20 }}>
        Login
      </Text>
    </Pressable>
  );
};

export default LoginButton;
