import {
  StyleSheet,
  Keyboard,
  Image,
  Alert,
  StatusBar,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "../components/Themed";
import axios from "axios";
import { useState } from "react";
import SERVER from "../config/connection";
import RegInput from "../components/RegInput";
import RegBtn from "../components/RegBtn";
import PressBtn from "../components/PressBtn";
import { useMutation } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";

const Registration = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<number>(0);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{ alignItems: "center", backgroundColor: "white", flex: 1 }}
      >
        <StatusBar backgroundColor="#000" />
        <Text
          style={{
            fontSize: 26,
            textAlign: "center",
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            alignContent: "space-between",
            margin: 20,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "rgb(200,200,200)",
              height: 1,
              width: 80,
            }}
          />
          <Text style={{ color: "rgb(200,200,200)" }}>or Sign Up</Text>
          <View
            style={{
              borderWidth: 1,
              height: 1,
              width: 80,
              borderColor: "rgb(200,200,200)",
            }}
          />
        </View>
        <View style={{ margin: 20 }}>
          <Pressable
            onPress={() => console.log("press")}
            style={{
              alignItems: "center",
              padding: 13,
              backgroundColor: "white",
              width: 60,
              height: 60,
              borderWidth: 1,
              borderRadius: 60,
            }}
          >
            <Image
              style={styles.logo}
              source={{
                uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png",
              }}
            />
          </Pressable>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Registration;
const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
  },
});
