import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import Login from "../screens/Login";
import Registration from "../screens/Registration";
import TabOneScreen from "../screens/TabOneScreen";
import LoginButton from "../components/LoginBtn";
import Bookmark from "../screens/Bookmark";
import { fontScaleAtom, loginFlag } from "../store/auth";
import { useAtom } from "jotai";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Profile from "../screens/Profile";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "../components/Themed";
import { Button, Modal, Portal, RadioButton, Title } from "react-native-paper";
import { useState } from "react";
import i18n from "../i18n";
import { Linking } from "react-native";
import Slider from "@react-native-community/slider";
import React from "react";

function CustomDrawerContent(props) {
  const [isLoggedIn, setisLoggedIn] = useAtom(loginFlag);

  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setisLoggedIn(false);
      navigation.navigate("Sri Guru Granth Sahib Ji");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const [fontScale, setFontScale] =useAtom(fontScaleAtom)
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Log out"
          onPress={() => {
            // logout logic
            handleLogout();
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="logout" color="green" size={size} />
          )}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <Text>Font size</Text>

        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={2}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#AAAAAA"
          step={.2}
          value={+fontScale}
        onValueChange={async (fontScaleVal)=>{
          await AsyncStorage.setItem('fontScale', `${fontScaleVal}`)
          setFontScale(fontScaleVal)
          
        }}

          />
        <View style={{display:'flex', width:200, flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize:20}}>A</Text>
          <Text style={{fontSize:40}}>A</Text>
          <Text style={{fontSize:60}}>A</Text>
          </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: 30,
        }}
      >
        <DrawerItem
          label="Delete my Account"
          onPress={() => {
            // logout logic
            Linking.openURL(
              "https://sikhi-connect.web.app/form/delete-account"
            );
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="open-in-new"
              color="green"
              size={size}
            />
          )}
        />
        <Text
          style={{ color: "blue", textAlign: "center" }}
          onPress={() => Linking.openURL("https://github.com/SimbaQuartz")}
        >
          SimbaQuartz Open Source
        </Text>
      </View>
    </DrawerContentScrollView>
  );
}
const Drawer = createDrawerNavigator();

export function RouterDrawer() {
  const [isLoggedIn] = useAtom(loginFlag);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [value, setValue] = useState("en");

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerRight: () => (
          <>
            <Button onPress={showModal}>🌐</Button>
            <Portal>
              <Modal
                visible={visible}
                onDismiss={hideModal}
                contentContainerStyle={containerStyle}
              >
                <Title>Change App Language</Title>
                <View>
                  <RadioButton.Group
                    onValueChange={(value) => {
                      setValue(value);
                      i18n.changeLanguage(value);
                      hideModal();
                    }}
                    value={value}
                  >
                    <RadioButton.Item label="Punjabi" value="pa" />
                    <RadioButton.Item label="English" value="en" />
                  </RadioButton.Group>
                </View>
              </Modal>
            </Portal>
          </>
        ),
        headerShown: true,
      })}
    >
      <Drawer.Screen
        name="Sri Guru Granth Sahib Ji"
        component={TabOneScreen}
        options={({ navigation }) => ({
          headerRight: () =>
            !isLoggedIn && <LoginButton navigation={navigation} />,
          headerShown: true,

          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" color="orange" size={size} />
          ),
        })}
      />
      {isLoggedIn && (
        <>
          <Drawer.Screen
            name="BookmarkScreen"
            component={Bookmark}
            options={{
              title: "Bookmark",
              headerShown: true,
              headerStyle: {
                backgroundColor: "rgb(1,1,1)",
              },
              headerTintColor: "rgb(255,255,255)",
              headerTitleAlign: "center",
              drawerIcon: ({ color, size }) => (
                <Foundation
                  name="book-bookmark"
                  style={{ color: "rgb(50,150,230)" }}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="ProfileScreen"
            component={Profile}
            options={{
              title: "Profile",
              headerShown: true,
              drawerIcon: ({ color, size }) => (
                <MaterialIcons
                  name="person"
                  style={{ color: "rgb(250,220,130)" }}
                  color={color}
                  size={size}
                />
              ),
            }}
          />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Drawer.Screen
            name="Loginscreen"
            component={Login}
            options={{
              title: "Login",
              headerShown: true,

              drawerIcon: ({ color, size }) => (
                <MaterialIcons
                  name="lock"
                  color="rgb(100,150,169)"
                  size={size}
                />
              ),
            }}
          />
          <Drawer.Screen
            name="RegistrationScreen"
            component={Registration}
            options={{
              title: "Registration",
              headerShown: true,
              drawerIcon: ({ color, size }) => (
                <MaterialIcons
                  name="person"
                  color="rgb(150, 90, 160)"
                  size={size}
                />
              ),
            }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
