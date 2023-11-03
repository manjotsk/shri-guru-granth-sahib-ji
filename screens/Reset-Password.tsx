import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import { View, Text } from "../components/Themed";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const Resetpassword = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.verification}>
          <View>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
            >
              Reset Password
            </Text>

            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Pasword</Text>
              <TextInput
                placeholder="******"
                keyboardType="email-address"
                onChangeText={setPassword}
              />
            </View>
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Confirm Pasword
              </Text>
              <TextInput
                placeholder="******"
                keyboardType="email-address"
                onChangeText={setPassword}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 15,
              justifyContent: "flex-end",
            }}
          >
            <View style={{ justifyContent: "space-evenly", margin: 10 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Loginscreen")}
              >
                <Text
                  style={{
                    fontSize: 15,
                    textAlign: "center",
                    color: "rgb(25, 75, 220)",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Loginscreen")}
              style={styles.btn}
            >
              <Text
                style={{
                  fontSize: 15,
                  textAlign: "center",
                  color: "rgb(255,255,255)",
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(74,74,74)",
  },
  verification: {
    borderRadius: 10,
    width: width * 0.9,
    height: height * 0.35,
    padding: 10,
    elevation: 10,
  },
  btn: {
    backgroundColor: "rgb(25,75,220)",
    borderWidth: 1,
    borderColor: "white",
    width: width * 0.2,
    padding: 10,
    alignSelf: "center",
    borderRadius: 10,
  },
});
