import {
  Alert,
  Keyboard,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bookmark from "./Bookmark";
import SERVER from "../config/connection";
import IsLoginBtn from "../components/IsLoginBtn";
import PressReg from "../components/PressReg";
import { loginFlag } from "../store/auth";
import { useMutation } from "react-query";
import { useAtom } from "jotai";
import { Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
const { width } = Dimensions.get("window");

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginFlag);

  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    checkLoggedInStatus();
  }, []);
  const checkLoggedInStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert(
        "ਕੁਝ ਗਲਤ",
        "ਕਿਰਪਾ ਕਰਕੇ ਈਮੇਲ ਅਤੇ ਪਾਸਵਰਡ ਦੋਵਾਂ ਖੇਤਰਾਂ ਨੂੰ ਭਰੋ।"
      );
      return;
    }
    try {
      const res = await axios.post(`${SERVER}login`, {
        email: email,
        password: password,
      });
      if (res.data.token) {
        const authToken = res.data.token;
        await AsyncStorage.setItem("authToken", authToken);
        setIsLoggedIn(true);
        Alert.alert("Success", "Login Successfully");
        navigation.navigate("Sri Guru Granth Sahib Ji");
      } else {
        Alert.alert(
          "Error",
          "Invalid response from the server. Missing authentication token."
        );
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Login failed. Please check your email and password."
      );
    }
  };

  const { mutate, isLoading } = useMutation(loginUser);
  const handleLogin = () => {
    mutate({ email, password });
  };
  const { t } = useTranslation();

  return isLoggedIn ? (
    <Bookmark />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={{ alignItems: "center", backgroundColor: "white", flex: 1 }}
      >
        <View style={{ padding: 10, margin: 10 }}>
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
        </View>
        <View>
          <TextInput
            style={styles.txt}
            placeholder={t('Email')}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
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
                style={{
                  textAlign: "right",
                  paddingTop: 20,
                  right: 30,
                  color: "grey",
                }}
                name={isPasswordVisible ? "eye-off" : "eye"}
                size={30}
                color="rgb(30,30,30)"
              />
            </TouchableOpacity>
          </View>
        </View>

        <IsLoginBtn handleLogin={handleLogin} isLoading={isLoading} />
        <View
          style={{
            padding: 5,
            alignItems: "flex-end",
          }}
        >
          <Pressable onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={{ color: "blue" }}>Forget password?</Text>
          </Pressable>
        </View>
        <PressReg navigation={navigation} />

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Login;
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
