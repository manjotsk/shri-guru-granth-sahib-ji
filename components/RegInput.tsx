import { TextInput, StyleSheet, Dimensions, View, Pressable, Text } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
const { height, width } = Dimensions.get("window");
interface input {
  setFullName: string;
  setAddress: string;
  setPhone: number;
  setEmail: string;
  setPassword: string;
}
const RegInput = ({ setFullName, setAddress, setPhone, setEmail, setPassword, show, date, mode, onChange, showDatepicker }: input) => {

  return (
    <View>
      <TextInput
        style={styles.txt}
        placeholder="ਪੂਰਾ ਨਾਮ"
        onChangeText={setFullName}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.txt}
        placeholder="ਪੂਰਾ ਪਤਾ"
        onChangeText={setAddress}
        placeholderTextColor="grey"
      />
      <Pressable onPress={showDatepicker}>
        <Text>
          style={styles.txt}
          placeholder="Date of Birth"
          placeholderTextColor="grey"
        </Text>
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <TextInput
        style={styles.txt}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        onChangeText={setPhone}
        placeholderTextColor="grey"
      />

      <TextInput
        style={styles.txt}
        placeholder=" ਈ - ਮੇਲ "
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholderTextColor="grey"
      />

      <TextInput
        style={styles.txt}
        secureTextEntry
        placeholder="ਪਾਸਵਰਡ"
        autoCapitalize="none"
        onChangeText={setPassword}
        placeholderTextColor="grey"
      />
    </View>
  );
};
export default RegInput;
const styles = StyleSheet.create({
  txt: {
    width: width * 0.8,
    color: 'grey',
    height: 40,
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    bottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "grey"
  },
});
