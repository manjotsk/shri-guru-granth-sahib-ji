import { ActivityIndicator, Dimensions, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useProfile } from "../data/profile/query";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "../components/Themed";

const { height, width } = Dimensions.get("window");

const GetProfile = () => {
  const profile = useProfile();
  useFocusEffect(
    useCallback(() => {
      profile.refetch();
    }, [])
  );

  const data = profile?.data?.data
  if (profile.isLoading) {
    return <ActivityIndicator animating size={"large"} />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "rgb(74,74,74)", justifyContent: "center", alignContent: "center" }}>
      <FlatList
        data={[data]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }: any) =>
          <View style={styles.container}>
            <Ionicons name="person-circle-sharp" style={{ fontSize: 200, textAlign: "center", color: "grey" }} />
            <Text style={[styles.txt, { fontSize: 20, fontWeight: "bold" }]}>{item.fullName}</Text>
            <Text style={styles.txt}>{item.email}</Text>
            <Text style={styles.txt}>{item.phone}</Text>
            <Text style={styles.txt}>{item.address}</Text>
            <TouchableOpacity style={styles.btn} onPress={() => console.log("update profile")}>
              <Text style={[styles.txt, { color: "rgb(255,255,255)" }]} > Update Profile</Text>
            </TouchableOpacity>
          </View>}
      />
    </View>
  );
};

export default GetProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    height: height * 0.91
  },
  txt: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
    elevation: 20
  },
  btn: {
    backgroundColor: "rgb(22, 74,220)",
    borderRadius: 10,
    alignSelf: "center",
    width: 130,
  }
});
