import { Alert, Dimensions, Keyboard, KeyboardAvoidingView, Platform, Pressable, StatusBar, TouchableWithoutFeedback, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Bookmark from "./Bookmark";
import SERVER from "../config/connection";
import LoginInput from "../components/LoginInput";
import IsLoginBtn from "../components/IsLoginBtn";
import PressReg from "../components/PressReg";
import { loginFlag } from "../store/auth";
import { useMutation } from "react-query";
import { useAtom } from "jotai";
import { SafeAreaView } from "react-native-safe-area-context";
import { authTokenAtom, checkTokenExpiration, isTokenExpiredAtom } from "../store/TokenAtom";

const Login = ({ navigation }: any) => {

  const [authToken, setAuthToken] = useAtom(authTokenAtom);
  const [isTokenExpired] = useAtom(isTokenExpiredAtom);

  // Use useEffect to check token expiration when the component mounts
  useEffect(() => {
    checkTokenExpiration();
  }, []);
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [isLoggedIn, setIsLoggedIn] = useAtom(loginFlag);

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
        setAuthToken(authToken);
        setIsLoggedIn(true);
        Alert.alert("Success", "Login Successfully");
        navigation.navigate("BookmarkScreen");
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

  return isLoggedIn ? (
    <Bookmark />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView style={{ marginBottom: 200 }} >
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
          <LoginInput setEmail={setEmail} setPassword={setPassword} />
          <IsLoginBtn handleLogin={handleLogin} isLoading={isLoading} />
          <Pressable>
            <Text style={{ color: "blue" }}>Forget password?</Text>
          </Pressable>
          <PressReg navigation={navigation} />
        </SafeAreaView>
      </KeyboardAvoidingView >
    </TouchableWithoutFeedback >
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
