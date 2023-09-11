import { TextInput, StyleSheet, Dimensions, View } from "react-native";
const { height, width } = Dimensions.get("window");
interface input {
  setFullName: string;
  setAddress: string;
  setPhone: number;
  setEmail: string;
  setPassword: string
}
const RegInput = ({ setFullName, setAddress, setPhone, setEmail, setPassword }: input) => {
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
        onChangeText={setEmail}
        placeholderTextColor="grey"
      />
      <TextInput
        style={styles.txt}
        secureTextEntry
        placeholder="ਪਾਸਵਰਡ"
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
