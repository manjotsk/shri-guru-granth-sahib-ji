import { Dimensions, Keyboard, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { View, Text } from '../components/Themed';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get("window");

const forgetpassword = () => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <View style={styles.verification}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>Forget Password</Text>
                        <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Email</Text>
                        <TextInput placeholder='abc@example.com' keyboardType="email-address"
                            autoCapitalize="none" onChangeText={setEmail} />
                    </View>
                    <View style={{ flexDirection: "row", paddingTop: 15, justifyContent: "flex-end" }}>
                        <View style={{ justifyContent: "space-evenly", margin: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Loginscreen")}>
                                <Text style={{ fontSize: 15, textAlign: "center", color: "rgb(25, 75, 220)" }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => console.log("send Btn")} style={styles.btn}>
                            <Text style={{ fontSize: 15, textAlign: "center", color: "rgb(255,255,255)" }}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    )
}

export default forgetpassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'rgb(74,74,74)'
    },
    verification: {
        borderRadius: 10,
        width: width * 0.9,
        height: height * 0.25,
        padding: 10,
        elevation: 10,
    },
    btn: {
        backgroundColor: "rgb(25,75,220)",
        borderWidth: 1,
        borderColor: "white",
        width: width * 0.2,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 10,
    },
})