import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Theme from "../theme/Theme";
import Layout from "../constants/Layout";
const RegBtn = ({ handleregistration, isLoading }: any) => {
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleregistration}>
          <Text style={styles.btntxt}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RegBtn;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Theme.color.Red,
    width: Layout.window.width * 0.4,
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  btntxt: {
    color: Theme.color.White,
    fontSize: Theme.font.l,
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
