import {
  Alert,
  Keyboard,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableOpacity,
  TextInput,
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
import Theme from "../theme/Theme";
import Layout from "../constants/Layout";

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
            ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲਸਾ।।{"\n"}
            ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫਤਿਹ।।
          </Text>
        </View>
        <View>
          <TextInput
            style={styles.txt}
            placeholder="ਈ - ਮੇਲ"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            placeholderTextColor={Theme.color.Grey}
          />
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.txt}
              secureTextEntry={!isPasswordVisible}
              placeholder="ਪਾਸਵਰਡ"
              autoCapitalize="none"
              onChangeText={setPassword}
              placeholderTextColor={Theme.color.Grey}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Feather
                style={{
                  textAlign: "right",
                  paddingTop: 20,
                  right: 30,
                  color: Theme.color.Grey,
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default Login;
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
