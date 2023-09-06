import { TextInput, StyleSheet, Dimensions, View } from "react-native";
const { height, width } = Dimensions.get("window");
const RegInput = ({
  setFullName,
  setAddress,
  setPhone,
  setEmail,
  setPassword,
}: any) => {
  return (
    <View>
      <TextInput
        style={styles.txt}
        placeholder="ਪੂਰਾ ਨਾਮ"
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.txt}
        placeholder="ਪੂਰਾ ਪਤਾ"
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.txt}
        placeholder="Mobile Number"
        onChangeText={setPhone}
      />

      <TextInput
        style={styles.txt}
        placeholder=" ਈ - ਮੇਲ "
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.txt}
        secureTextEntry
        placeholder="ਪਾਸਵਰਡ"
        onChangeText={setPassword}
      />
    </View>
  );
};
export default RegInput;
const styles = StyleSheet.create({
  txt: {
    backgroundColor: "#fff",
    width: width * 0.8,
    height: 50,
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    bottom: 20
  },
});
