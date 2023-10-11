import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import ListComponent from "../components/ListComponent";
import { useBookmarks } from "../data/bookmark/query";
import { ActivityIndicator } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const white = "rgb(200,200,200)";
const Bookmark = () => {
  // useBookmarks
  const bookmarks = useBookmarks();
  useFocusEffect(
    useCallback(() => {
      bookmarks.refetch();
    }, [])
  );

  if (bookmarks.isLoading) {
    return <ActivityIndicator animating size={"large"} />;
  }
  const data = bookmarks?.data?.data;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredList, setFilteredList] = useState(data);

  useEffect(() => {
    const newList = data.filter((list: { english: string }) =>
      list.english.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(newList);
  }, [searchTerm]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="search keyword"
          placeholderTextColor="#fff"
          autoCapitalize="none"
          keyboardType="default"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <ListComponent data={filteredList || []} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232323",
  },
  input: {
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 15,
    width: width * 0.9,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: "rgba(145, 151, 167, 1)",
    color: white,
  },
});
