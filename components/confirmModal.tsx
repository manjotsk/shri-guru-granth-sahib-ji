import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
const ConfirmModal = ({
  modalVisible,
  item,
  setModalVisible,
  onDelete,
}: any) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[styles.modalText, { fontWeight: "bold" }]}>
            Are You sure?
          </Text>
          <Text style={[styles.modalText, { fontSize: 14 }]}>
            You want to Delete
          </Text>
          <View style={styles.buttonRow}>
            <View
              style={[
                styles.btn,
                Platform.OS === "android"
                  ? styles.androidMargin
                  : styles.iosMargin,
              ]}
            >
              <TouchableOpacity onPress={() => onDelete(item)}>
                <Text style={styles.textStyle}>Yes</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.btn,
                Platform.OS === "android"
                  ? styles.androidMargin
                  : styles.iosMargin,
              ]}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "rgba(74, 74, 74, 1)",
    width: width * 0.71,
    height: height * 0.2,
    borderRadius: 7,
    shadowColor: "#000",
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
    color: "white",
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textAlign: "center",
  },
  modalText: {
    padding: 5,
    textAlign: "center",
    fontSize: 22,
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Rubik-Regular",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    flex: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,

    borderColor: "rgb(54,54,54)",
    backgroundColor: "rgba(74, 74, 74, 1)",
  },
  androidMargin: {
    marginTop: width * 0.15,
  },
  iosMargin: {
    marginTop: width * 0.17,
  },
});
export default ConfirmModal;
