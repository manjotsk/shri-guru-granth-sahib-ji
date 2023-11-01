import {
  Alert,
  Keyboard,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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

const Login = ({ navigation }: any) => {
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
      <View style={{ flex: 1 }}>
        <View style={{ padding: 10, margin: 10 }}>
          <Text
            style={{
              fontSize: 26,
              textAlign: "center",
            }}
          >
            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
          </Text>
        </View>
        <LoginInput setEmail={setEmail} setPassword={setPassword} />
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
        <View
          style={{
            padding: 10,
            margin: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderWidth: 1,
              width: 90,
              height: 1,
              alignSelf: "center",
              borderColor: "rgb(220,220,220)",
            }}
          />
          <Text style={{ textAlign: "center", color: "rgb(200,200,200)" }}>
            or sign up with
          </Text>
          <View
            style={{
              borderWidth: 1,
              width: 90,
              height: 1,
              alignSelf: "center",
              borderColor: "rgb(220,220,220)",
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
      </View>
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
});
