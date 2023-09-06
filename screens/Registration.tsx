import {
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text, View } from "../components/Themed";
import { useFonts } from "expo-font";
import axios from "axios";
import { useState } from "react";
import SERVER from "../config/connection";
import RegInput from "../components/RegInput";
import RegBtn from "../components/RegBtn";
import PressBtn from "../components/PressBtn";
import { useMutation } from "react-query";

const Registration = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");

  const registrationUser = async () => {
    if (!fullName || !address || !email || !password) {
      Alert.alert("ਕੁਝ ਗਲਤ", "ਕਿਰਪਾ ਕਰਕੇ ਖੇਤਰਾਂ ਨੂੰ ਭਰੋ।");
      return;
    }
    try {
      const res = await axios.post(SERVER + "/registration", {
        fullName: fullName,
        address: address,
        phone: phone,
        email: email,
        password: password,
      });
      Alert.alert("Success", "User saved successfully!");
      navigation.navigate("Login screen");
    } catch (err) {
      Alert.alert("Error", "Failed to save data. Please try again.");
    }
  };
  const { mutate, isLoading } = useMutation(registrationUser);
  const handleregistration = () => {
    mutate({ fullName, address, phone, email, password });
  };
  return (

    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ alignItems: 'center' }} >
          <StatusBar backgroundColor="#fff" />
          <Text
            style={{
              fontSize: 26,
              textAlign: "center"
            }}
          >
            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
          </Text>
          <RegInput
            setFullName={setFullName}
            setAddress={setAddress}
            setPhone={setPhone}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          <RegBtn handleregistration={handleregistration} isLoading={isLoading} />
          <PressBtn navigation={navigation} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default Registration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    alignItems: "center",
    backgroundColor: "#eee",
  }
});
