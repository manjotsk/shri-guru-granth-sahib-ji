import { StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Alert, StatusBar } from "react-native";
import { Text, } from "../components/Themed";
import axios from "axios";
import { useState } from "react";
import SERVER from "../config/connection";
import RegInput from "../components/RegInput";
import RegBtn from "../components/RegBtn";
import PressBtn from "../components/PressBtn";
import { useMutation } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";

const Registration = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number>(0);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={{ alignItems: 'center' }} >
          <StatusBar backgroundColor="#000" />
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
            mode={mode} date={date} onChange={onChange}
            show={show} showDatepicker={showDatepicker}
          />
          <RegBtn handleregistration={handleregistration} isLoading={isLoading} />
          <PressBtn navigation={navigation} />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default Registration;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  }
});
