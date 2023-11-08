import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import dayjs from "dayjs";
import PhoneInput from "react-native-phone-input";
import React, { useState } from "react";
import DatePicker from "react-native-ui-datepicker";
import { View, Text } from "../components/Themed";
import Layout from "../constants/Layout";
import Theme from "../theme/Theme";
import useFormValidation from "../hooks/useFormValidation";
const UpdateUser = () => {
  const {
    email,
    setEmail,
    phone,
    setPhone,
    fullName,
    setFullName,
    address,
    setAddress,
    showPhoneError,
    showEmailError,
    showFullNameError,
    showAddressError,
    validateAllFields,
  } = useFormValidation();
  const [date, setDate] = useState<any>(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const Update = () => {
    if (validateAllFields()) {
      // All fields are valid
      Alert.alert("Update");
      // Additional logic for updating the user
    }
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
        <View>
          <TextInput
            style={styles.txt}
            value={fullName}
            placeholder="ਪੂਰਾ ਨਾਮ"
            onChangeText={(text) => setFullName(text)}
            placeholderTextColor={Theme.color.Grey}
          />
          {showFullNameError && (
            <Text style={{ color: Theme.color.Red }}>
              Please enter full name
            </Text>
          )}

          <TextInput
            style={styles.txt}
            value={address}
            placeholder="ਪੂਰਾ ਪਤਾ"
            onChangeText={(text) => setAddress(text)}
            placeholderTextColor={Theme.color.Grey}
          />
          {showAddressError && (
            <Text style={{ color: Theme.color.Red }}>Please enter address</Text>
          )}
          <PhoneInput
            value={phone}
            textStyle={{ color: Theme.color.Grey }}
            onChangePhoneNumber={(text) => setPhone(text)}
            style={styles.txt}
            initialCountry="in"
            textProps={{
              placeholder: "Phone Number",
            }}
          />
          {showPhoneError && (
            <Text style={{ color: Theme.color.Red }}>
              Please enter Phone Number
            </Text>
          )}
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
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={Theme.color.Grey}
          />
          {showEmailError && (
            <Text style={{ color: Theme.color.Red }}>Please enter email</Text>
          )}
        </View>
        <View style={{ padding: 10 }}>
          <TouchableOpacity style={styles.btn} onPress={() => Update()}>
            <Text style={styles.btntxt}>Update</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({
  txt: {
    width: Layout.window.width * 0.8,
    color: Theme.color.Grey,
    padding: 7,
    marginTop: 4 * 5,
    borderBottomWidth: 1,
    borderBottomColor: Theme.color.Grey,
  },
  btn: {
    backgroundColor: Theme.color.Red,
    width: Layout.window.width * 0.4,
    padding: 10,
    margin: 5,
    borderRadius: 4 * 5,
  },
  btntxt: {
    color: Theme.color.White,
    fontSize: Theme.font.xl,
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
