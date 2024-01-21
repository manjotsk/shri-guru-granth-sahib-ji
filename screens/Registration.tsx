import {
  StyleSheet,
  Keyboard,
  Image,
  Alert,
  StatusBar,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
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
import { TextInput } from "react-native-paper";

const { height, width } = Dimensions.get("window");
import { useTranslation } from 'react-i18next';

const Registration = ({ navigation }: any) => {
  const { t } = useTranslation();
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
        style={{ alignItems: "center", backgroundColor: "white", flex: 1 }}
      >
        <StatusBar backgroundColor="#000" />
        <Text
          style={{
            fontSize: 26,
            textAlign: "center",
          }}
        >
          {
            t('wjkk')+'\n'+
            t('wjkf')
          }
          
        </Text>
        <View>
          <TextInput
          mode="flat"
            style={styles.txt}
            label={t('Full Name')}
            onChangeText={setFullName}
            placeholderTextColor="grey"
          />
          <TextInput
            style={styles.txt}
            // label="ਪੂਰਾ ਪਤਾ"
            label={t('Full Address')}
            onChangeText={setAddress}
            placeholderTextColor="grey"
          />
          
          <TouchableOpacity onPress={toggleDatePicker} style={styles.txt}>
            <Text style={{ color: "grey" }}>
              {date ? dayjs(date).format("DD/MM/YYYY") : t('Date of Birth')+" (DD/MM/YYYY)"}
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
            placeholder={t('Email')}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="grey"
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.txt}
              secureTextEntry={!isPasswordVisible}
              placeholder={t('Password')}
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholderTextColor="grey"
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                style={{ paddingTop: 15, right: 30, color: "grey" }}
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={30}
                color="rgb(30,30,30)"
              />
            </TouchableOpacity>
          </View>
        </View>
        <RegBtn handleregistration={handleregistration} isLoading={isLoading} />
        <PressBtn navigation={navigation} />

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Registration;
const styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 60,
    margin: 10,
  },
  txt: {
    width: width * 0.8,
    color: "grey",
    padding: 7,
    marginTop: 4 * 5,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});
