import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { useProfile } from "../data/profile/query";
import { useFocusEffect } from "@react-navigation/native";

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
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Text>Profile</Text>
      <FlatList
        data={[data]}
        keyExtractor={(item) => item._id}
        renderItem={({ item }: any) =>
          <View style={styles.container}>
            <Text style={[styles.txt, { fontSize: 20, fontWeight: "bold" }]}>{item.fullName}</Text>
            <Text style={styles.txt}>{item.email}</Text>
            <Text style={styles.txt}>{item.phone}</Text>
            <Text style={styles.txt}>{item.address}</Text>
          </View>}
      />
    </View>
  );
};

export default GetProfile;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  txt: {
    color: "white",
    fontSize: 15
  }
});
