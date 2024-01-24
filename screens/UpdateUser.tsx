import {
  Dimensions,
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
const { height, width } = Dimensions.get("window");
const UpdateUser = () => {
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
  const currentDate: any = new Date();
  const year: any = currentDate.getFullYear().toString().padStart(4, "0");
  const month: any = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day: any = currentDate.getDate().toString().padStart(2, "0");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{ alignItems: "center", backgroundColor: "white", flex: 1 }}
      >
        <View>
          <TextInput
            style={styles.txt}
            placeholder="ਪੂਰਾ ਨਾਮ"
            onChangeText={setFullName}
            placeholderTextColor="grey"
          />

          <TouchableOpacity onPress={toggleDatePicker} style={styles.txt}>
            <Text style={{ color: "grey" }}>
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
        </View>
        <View style={{ padding: 10 }}>
          <TouchableOpacity style={styles.btn}>
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
    width: width * 0.8,
    color: "grey",
    padding: 7,
    marginTop: 4 * 5,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  btn: {
    backgroundColor: "#E1372D",
    width: width * 0.4,
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  btntxt: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontFamily: "Lora-Regular",
  },
});
