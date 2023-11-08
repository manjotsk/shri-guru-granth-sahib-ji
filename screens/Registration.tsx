import {
  StyleSheet,
  Keyboard,
  Image,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Text, View } from "../components/Themed";
import axios from "axios";
import { useState } from "react";
import SERVER from "../config/connection";
import RegBtn from "../components/RegBtn";
import dayjs from "dayjs";
import PressBtn from "../components/PressBtn";
import { useMutation } from "react-query";
import { SafeAreaView } from "react-native-safe-area-context";
import PhoneInput from "react-native-phone-input";
import DatePicker from "react-native-ui-datepicker";
import { Feather } from "@expo/vector-icons";

import React from "react";
import Theme from "../theme/Theme";
import Layout from "../constants/Layout";

const Registration = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState<any>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const registrationUser = async () => {
    if (!fullName || !address || !email || !password) {
      Alert.alert("ਕੁਝ ਗਲਤ", "ਕਿਰਪਾ ਕਰਕੇ ਖੇਤਰਾਂ ਨੂੰ ਭਰੋ।");
      return;
    }
    try {
      const res = await axios.post(SERVER + "registration", {
        fullName: fullName,
        address: address,
        phone: phone,
        email: email,
        password: password,
      });
      Alert.alert("Success", "User saved successfully!");
      navigation.navigate("Loginscreen");
    } catch (err) {
      Alert.alert("Error", "User already registered");
    }
  };
  const { mutate, isLoading } = useMutation(registrationUser);
  const handleregistration = () => {
    mutate({ fullName, address, phone, email, password });
  };
  const currentDate: any = new Date();
  const year: any = currentDate.getFullYear().toString().padStart(4, "0");
  const month: any = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day: any = currentDate.getDate().toString().padStart(2, "0");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          alignItems: "center",
          backgroundColor: Theme.color.White,
          flex: 1,
        }}
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
        <View>
          <TextInput
            style={styles.txt}
            placeholder="ਪੂਰਾ ਨਾਮ"
            onChangeText={(text) => setFullName(text)}
            placeholderTextColor={Theme.color.Grey}
          />
          <TextInput
            style={styles.txt}
            placeholder="ਪੂਰਾ ਪਤਾ"
            onChangeText={(text) => setAddress(text)}
            placeholderTextColor={Theme.color.Grey}
          />
          <PhoneInput
            value={phone}
            setValue="10"
            textStyle={{ color: Theme.color.Grey }}
            onChangePhoneNumber={(text) => setPhone(text)}
            style={styles.txt}
            initialCountry="in"
            textProps={{
              placeholder: "Phone Number",
            }}
          />
          <TouchableOpacity onPress={toggleDatePicker} style={styles.txt}>
            <Text style={{ color: Theme.color.Grey }}>
              {date ? dayjs(date).format("DD/MM/YYYY") : "DD/MM/YYYY"}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DatePicker
              value={date}
              maximumDate={new Date(`${Number(year) - 13}-${month}-${day}`)}
              onValueChange={(newDate) => {
                setDate(newDate);
                toggleDatePicker(); // Hide the date picker after a date is selected
              }}
              mode="date"
            />
          )}
          <TextInput
            style={styles.txt}
            placeholder=" ਈ - ਮੇਲ "
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="grey"
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.txt}
              secureTextEntry={!isPasswordVisible}
              placeholder="ਪਾਸਵਰਡ"
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholderTextColor="grey"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                style={{ paddingTop: 15, right: 30, color: Theme.color.Grey }}
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={30}
                color="rgb(30,30,30)"
              />
            </TouchableOpacity>
          </View>
        </View>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 10,
          }}
        >
          <TouchableOpacity>
            <Image
              style={styles.logo}
              source={{
                uri: "https://ww2.freelogovectors.net/wp-content/uploads/2023/03/apple_logo-freelogovectors.net_-1.png",
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.logo}
              source={{
                uri: "https://logowik.com/content/uploads/images/985_google_g_icon.jpg",
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              style={styles.logo}
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/018/930/702/original/facebook-logo-facebook-icon-transparent-free-png.png",
              }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Registration;
const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 60,
    backgroundColor: Theme.color.White,
    borderWidth: 1,
    borderRadius: 60,
    margin: 10,
  },
  txt: {
    width: Layout.window.width * 0.8,
    color: Theme.color.Grey,
    padding: 7,
    marginTop: 4 * 5,
    borderBottomWidth: 1,
    borderBottomColor: Theme.color.Grey,
  },
});
