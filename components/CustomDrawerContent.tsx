import React, { useState } from 'react';
import { Linking } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Modal, Portal, RadioButton, Text as PaperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { useAtom } from 'jotai';
import { router } from 'expo-router';

import { View, Text } from './Themed';
import { fontScaleAtom, loginFlag } from '../store/auth';
import i18n from '../i18n';

export default function CustomDrawerContent(props: any) {
  const [isLoggedIn, setisLoggedIn] = useAtom(loginFlag);
  const [fontScale, setFontScale] = useAtom(fontScaleAtom);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('en');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      setisLoggedIn(false);
      router.push("/(drawer)");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
        
        {!isLoggedIn && (
          <>
            <DrawerItem
              label="Login"
              onPress={() => router.push("/(auth)/login")}
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="login" color={color} size={size} />
              )}
            />
            <DrawerItem
              label="Register"
              onPress={() => router.push("/(auth)/register")}
              icon={({ color, size }) => (
                <MaterialCommunityIcons name="account-plus" color={color} size={size} />
              )}
            />
          </>
        )}
        
        {isLoggedIn && (
          <DrawerItem
            label="Log out"
            onPress={handleLogout}
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color="green" size={size} />
            )}
          />
        )}
      </View>

      <View style={{ alignItems: 'center' }}>
        <Text>Font size</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={2}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#AAAAAA"
          step={0.2}
          value={+fontScale}
          onValueChange={async (fontScaleVal) => {
            await AsyncStorage.setItem('fontScale', `${fontScaleVal}`);
            setFontScale(fontScaleVal);
          }}
        />
        <View style={{ 
          display: 'flex', 
          width: 200, 
          flexDirection: 'row', 
          justifyContent: 'space-between' 
        }}>
          <Text style={{ fontSize: 20 }}>A</Text>
          <Text style={{ fontSize: 40 }}>A</Text>
          <Text style={{ fontSize: 60 }}>A</Text>
        </View>
      </View>

      <View style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: 30,
      }}>
        <DrawerItem
          label="Change Language"
          onPress={showModal}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="translate" color={color} size={size} />
          )}
        />
        
        <DrawerItem
          label="Delete my Account"
          onPress={() => {
            Linking.openURL(
              "https://sikhi-connect.web.app/form/delete-account"
            );
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="delete" color="red" size={size} />
          )}
        />
        
        <DrawerItem
          label="Privacy Policy"
          onPress={() => {
            Linking.openURL(
              "https://sikhi-connect.web.app/privacy-policy"
            );
          }}
          icon={({ color, size }) => (
            <MaterialCommunityIcons name="shield-account" color={color} size={size} />
          )}
        />
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <PaperText variant="titleLarge">Change App Language</PaperText>
          <View>
            <RadioButton.Group
              onValueChange={(value) => {
                setValue(value);
                i18n.changeLanguage(value);
                hideModal();
              }}
              value={value}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="en" />
                <Text>English</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="hi" />
                <Text>हिन्दी</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <RadioButton value="pa" />
                <Text>ਪੰਜਾਬੀ</Text>
              </View>
            </RadioButton.Group>
          </View>
        </Modal>
      </Portal>
    </DrawerContentScrollView>
  );
}
