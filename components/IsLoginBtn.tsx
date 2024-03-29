import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import React from "react";
import { View, Text } from "./Themed";
import { ActivityIndicator, DarkTheme, DefaultTheme } from "react-native-paper";

const { height, width } = Dimensions.get("window");
const IsLoginBtn = ({ handleLogin, isLoading }: any) => {
  return (
    <View style={{ padding: 20 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#E1372D" />
      ) : (
        <TouchableOpacity style={[styles.btn]} onPress={handleLogin}>
          <Text style={styles.btntxt}>Sign In</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default IsLoginBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#E1372D",
    width: width * 0.5,
    padding: 10,
    alignSelf: "center",
    borderRadius: 20,
  },
  btntxt: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
