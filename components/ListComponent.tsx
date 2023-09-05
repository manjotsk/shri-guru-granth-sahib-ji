import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDeleteBookmark } from "../data/bookmark/mutation";
import { ActivityIndicator } from "react-native";

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
  return (
    <View>
      <Animated.View style={styles.iconcontainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={[styles.modalText, { fontWeight: 'bold', }]}>Are You sure?</Text>
              <Text style={[styles.modalText, { fontSize: 14 }]}>You want to Delete</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonLine}></View>
                <View style={styles.buttonRow}>
                  <Pressable onPress={() => onDelete(item)}>
                    <Text style={[styles.textStyle, styles.yesButton]}>Yes</Text>
                  </Pressable>
                  <View style={styles.buttonLineVertical}></View>
                  <Pressable
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={[styles.textStyle, styles.noButton]}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

        </Modal>
        <Pressable onPress={() => setModalVisible(true)}>
          <FontAwesome5
            name={"trash-alt"}
            size={LIST_HEIGHT * 0.35}
            color={"white"}
          />
        </Pressable>
      </Animated.View>
      <PanGestureHandler onGestureEvent={panGesture}>
        <Animated.View style={[styles.insidecontainer, rStyle]}>
          <View style={{ flex: 1, flexDirection: "row", marginRight: 5 }}>
            <TouchableOpacity>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "rgba(74, 74, 74, 1)",
    width: 258,
    height: 140,
    borderRadius: 7,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    marginVertical: 10,
    color: 'white',
    fontSize: 16,
    fontFamily: "Rubik-Regular"
  },
  modalText: {
    textAlign: 'center',
    fontSize: 22,
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Rubik-Regular"
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18, // Adjust this value as needed for spacing
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonLine: {
    width: 258,
    height: 1,
    backgroundColor: 'rgba(65, 65, 65, 1)', // Line color
    marginTop: 9, // Adjust this value as needed for spacing
  },

  buttonLineVertical: {
    width: 1,
    height: 40,
    bottom: 4,
    backgroundColor: 'rgba(65, 65, 65, 1)', // Line color
    marginHorizontal: 30, // Adjust this value as needed for spacing
  },

  yesButton: {
    marginRight: 10, // Adjust this value for spacing between buttons
  },

  noButton: {
    marginLeft: 10, // Adjust this value for spacing between buttons
  }
});
