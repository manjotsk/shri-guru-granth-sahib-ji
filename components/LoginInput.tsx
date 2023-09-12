import { StyleSheet, Dimensions, View, TextInput } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");
const LoginInput = ({ setEmail, setPassword }: any) => {
  return (
    <>
      <TextInput
        style={styles.txt}
        placeholder="ਈ - ਮੇਲ"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.txt}
        placeholder="ਪਾਸਵਰਡ"
        autoCapitalize="none"
        secureTextEntry
        placeholderTextColor="grey"
        onChangeText={setPassword}
      />
    </>
  );
};

export default LoginInput;

const styles = StyleSheet.create({
  txt: {
    color: "grey",
    width: width * 0.8,
    height: 60,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
});
