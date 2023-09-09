import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
const ConfirmModal = ({ modalVisible, item, setModalVisible, onDelete }: any) => {
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
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonLine}></View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={() => onDelete(item)}>
                                <Text style={[styles.textStyle, styles.yesButton]}>Yes</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonLineVertical}></View>
                            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={[styles.textStyle, styles.noButton]}>Cancel</Text>
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
        marginTop: 22,
    },
    modalView: {
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
    },
    textStyle: {
        marginVertical: 10,
        color: "white",
        fontSize: 16,
        fontFamily: "Rubik-Regular",
    },
    modalText: {
        textAlign: "center",
        fontSize: 22,
        color: "rgba(255, 255, 255, 1)",
        fontFamily: "Rubik-Regular",
    },
    buttonContainer: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },

    buttonRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    buttonLine: {
        width: 258,
        height: 1,
        backgroundColor: "rgba(65, 65, 65, 1)",
        marginTop: 20,
    },

    buttonLineVertical: {
        width: 1,
        height: 40,
        bottom: 2,
        justifyContent:'center',
        backgroundColor: "rgba(65, 65, 65, 1)",
        marginHorizontal: 30,
    },

    yesButton: {
        marginRight: 10,
    },

    noButton: {
        marginLeft: 10,
    },
});
export default ConfirmModal;
