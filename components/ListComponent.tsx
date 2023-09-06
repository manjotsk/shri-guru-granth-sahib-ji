import { FlatList, Pressable, StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDeleteBookmark } from "../data/bookmark/mutation";
import { ActivityIndicator } from "react-native";
import ConfirmModal from "./confirmModal";

const LIST_HEIGHT = 60;
const TRANSLATE_X_THRESHOLD = 20;
const ListComponent = ({ data }: any) => {
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = async (id) => deleteBookmark.mutateAsync(id);
  if (deleteBookmark.isLoading)
    return <ActivityIndicator animating size={"large"} />;

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <ListItem
          item={item}
          onDelete={() => {
            handleDelete(item._id);
          }}
        />
      )}
    />
  );
};

const ListItem = ({ item, onDelete }: any) => {
  const translateX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: () => {
      if (translateX.value < -TRANSLATE_X_THRESHOLD) {
        translateX.value = withSpring(-LIST_HEIGHT);
      } else {
        translateX.value = withSpring(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  return (
    <View>
      <Pressable onPress={() => setModalVisible(true)}>
        <Animated.View style={styles.iconcontainer}>
          <FontAwesome5
            name={"trash-alt"}
            size={LIST_HEIGHT * 0.35}
            color={"white"}
          />
        </Animated.View>
      </Pressable>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.insidecontainer, rStyle]}>
          <ConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} onDelete={onDelete} />
          <View style={{ flex: 1, flexDirection: "row", marginRight: 5 }}>
            <Modal animationType="slide" transparent={false} visible={modalVisible1}>
              <View style={{ flex: 1, margin: 10, }}>
                {/* <View style={{
                  backgroundColor: "rgba(74, 74, 74, 1)",
                  width: 258,
                  height: 140,
                  borderRadius: 7,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                }}> */}
                <Text style={{ fontSize: 25 }}>{item.title}</Text>
                <Text style={{ fontFamily: "GurbaniAkhar", fontSize: 20, textAlign: 'justify' }}>{item.arth}</Text>
                <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={{ backgroundColor: 'rgb(120,50,200)', borderRadius: 10, width: 70, height: 30, alignSelf: 'center' }}>
                  <Text style={{ color: "white", fontSize: 20, textAlign: 'center' }}>close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisible1(true)}>
              <Text
                style={{
                  fontSize: 20,

                  color: "rgb(255,255,255)",
                  fontFamily: "GurbaniAkharHeavy",
                  alignItems: "center",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: "rgb(200, 200, 200)",
            }}
          >
            ANG: {item.ang}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default ListComponent;
const styles = StyleSheet.create({
  insidecontainer: {
    width: "100%",
    height: 60,
    paddingHorizontal: 12,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#232323",
    alignItems: "center",
  },
  iconcontainer: {
    height: 60,
    width: 60,
    padding: 5,
    backgroundColor: "red",
    justifyContent: "center",
    position: "absolute",
    right: 0.1,
    alignItems: "center",
  },
});