import { Pressable, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { Gesture, FlatList, PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDeleteBookmark } from "../data/bookmark/mutation";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import ConfirmModal from "./confirmModal";
const { width, height } = Dimensions.get('window')

const White = "rgb(255, 255, 255)"
const LIST_HEIGHT = 60;
const TRANSLATE_X_THRESHOLD = 20;
const ListComponent = ({ data }: any) => {
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = async (id) => deleteBookmark.mutateAsync(id);
  if (deleteBookmark.isLoading)
    return <ActivityIndicator animating size={"large"} />;
  const nativeGesture = Gesture.Native().shouldActivateOnStart(true);

  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
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
      <PanGestureHandler failOffsetY={[-5, 5]} activeOffsetX={[-5, 5]} onGestureEvent={panGesture}>
        <Animated.View style={[styles.insidecontainer, rStyle]}>
          <ConfirmModal modalVisible={modalVisible} setModalVisible={setModalVisible} onDelete={onDelete} />
          <View style={{ flex: 1, flexDirection: "row", marginRight: 5 }}>
            <Modal style={{ margin: 0 }} animationIn="slideInUp" swipeDirection={'down'} onSwipeCancel={() => setModalVisible1(false)} isVisible={modalVisible1} customBackdrop={
              <TouchableOpacity onPress={() => setModalVisible1(false)}>
                <View style={{ flex: 1 }} />
              </TouchableOpacity>}>
              <View >
                <View style={{
                  backgroundColor: "rgba(24,24,24, 1)",
                  width: width,
                  height: height * 0.5,
                  borderTopStartRadius: 15,
                  borderTopRightRadius: 15,
                  padding: 10,
                  top: height * 0.3
                }}>
                  <Text style={{ fontSize: 25, color: White, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={{ fontFamily: "GurbaniAkhar", fontSize: 17, textAlign: 'justify', color: "green", fontWeight: "bold" }}>ਭਾਵ ਅਰਥ:</Text>
                  <Text style={{ fontFamily: "GurbaniAkhar", fontSize: 17, textAlign: 'justify', color: White }}>{item.arth}</Text>
                  <Text style={{ fontFamily: "Lora-Regular", fontSize: 17, textAlign: 'justify', color: "orange", fontWeight: "bold" }}>English:</Text>
                  <Text style={{ fontFamily: "Lora-Regular", fontSize: 17, textAlign: 'justify', color: White }}>{item.english}</Text>
                  <Text style={{ fontFamily: "GurbaniAkharHeavy", fontSize: 20, textAlign: 'right', color: White }}>AMg: {item.ang}</Text>
                </View>
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
    </View >
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