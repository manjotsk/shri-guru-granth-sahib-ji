import { useCallback, useMemo, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import InfinitePager, {
  InfinitePagerImperativeApi,
} from "react-native-infinite-pager";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  State,
  TapGestureHandler,
} from "react-native-gesture-handler";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useAng, useKosh } from "../data/ang/query";
import { RootTabScreenProps } from "../types";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginFlag } from "../store/auth";
import { useAtom } from "jotai";
import { useAddBookmark } from "../data/bookmark/mutation";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { DataTable } from "react-native-paper";

function keyExtractor(page: CreatePage) {
  return `${page.key}`;
}

function Ang({ page, setAngId }: RootTabScreenProps<"TabOne">) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const [words, setWords] = useState([]);

  const handlePresentModalPress = useCallback((line) => {
    setWords(line?.split(" "))
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [, setIsLoggedIn] = useAtom(loginFlag);
  useEffect(() => {
    AsyncStorage.getItem("authToken").then((a) => {
      if (a) {
        setIsLoggedIn(true);
      }
    });

    return () => {};
  }, []);

  const ang = useAng(
    { angId: page },
    {
      enabled: page > 0 && page <= 1431,
    }
  );
  const [visible, setVisible] = useState(false);
  const [angValue, setAngValue] = useState(page);
  const doubleTapRef = useRef(null);
  const addBookmark = useAddBookmark();
  const kosh = useKosh(words);

  const onDoubleTapEvent = (event: any, data) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("double tap 1");
      addBookmark.mutateAsync(data);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Portal>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            {/* <View style={styles.contentContainer}> */}
              <ScrollView>

              <DataTable >
                <DataTable.Header>
                  <DataTable.Title>Word</DataTable.Title>
                  <DataTable.Title numeric>Meaning</DataTable.Title>
                  {/* <DataTable.Title numeric>Fat</DataTable.Title> */}
                </DataTable.Header>

                {kosh?.data?.map(({ _id, word, meaning , otherFaces}) => (
                  <DataTable.Row key={_id}>

                    <DataTable.Cell>
                      <View style={{display:'flex'}}>
                        <Text>{word}</Text>
                        {otherFaces?.length ?<Text style={{color:'grey', fontSize:10}}>({
                          otherFaces?.map?.(({word})=>word)?.join()
                        })</Text>:undefined}
                      </View>

                    </DataTable.Cell>
                    <DataTable.Cell >
                      <View style={{display:'flex'}}>
                        <Text>{meaning}</Text>
                      </View>
                    </DataTable.Cell>
                    {/* <DataTable.Cell numeric>{item.fat}</DataTable.Cell> */}
                  </DataTable.Row>
                ))}
              </DataTable>
                </ScrollView>
            {/* </View> */}
          </BottomSheetModal>
        </BottomSheetModalProvider>
        <Dialog visible={visible}>
          <TextInput
            label="Ang ID"
            focusable
            autoFocus
            keyboardType="number-pad"
            value={`${angValue}`}
            onChangeText={(value) => {
              const parsedQty = Number.parseInt(value);
              if (Number.isNaN(parsedQty)) {
                setAngValue(0); //setter for state
              } else if (parsedQty > 1431 || parsedQty < 1) {
                setAngValue(angValue);
              } else {
                setAngValue(parsedQty);
              }
            }}
          />
          <Button
            onPress={() => {
              setAngId(+angValue);
              setVisible(false);
            }}
          >
            OK
          </Button>
        </Dialog>
      </Portal>
      <Button
        onPress={() => {
          setVisible(true);
        }}
      >
        <Text style={{ textAlign: "right", padding: 5 }}>
          Ang: {ang.data?.pageno}
        </Text>
      </Button>
      <FlatList
        style={styles.container}
        data={ang.data?.page}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        renderItem={(page) => (
          <View>
            <TapGestureHandler
              ref={doubleTapRef}
              onHandlerStateChange={(e) => {
                onDoubleTapEvent(e, {
                  title: page.item.line.gurmukhi.unicode,
                  engAkhar: page.item.line.gurmukhi.akhar,
                  arth: page.item.line.translation.punjabi.default.unicode,
                  ang: page.item.line.pageno,
                  lineno: page.item.line.lineno,
                  hindi: page.item.line.transliteration.devanagari.text,
                  english: page.item.line.translation.english.default,
                });
              }}
              numberOfTaps={2}
            >
              <Pressable>
                <TouchableOpacity
                  onLongPress={() => {
                    handlePresentModalPress(page.item.line.gurmukhi.unicode);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "600",
                      textAlign: "center",
                    }}
                  >
                    {page.item.line.gurmukhi.unicode}
                  </Text>
                </TouchableOpacity>
              </Pressable>
            </TapGestureHandler>
            <Text style={{ fontSize: 20 }}>
              {page.item.line.translation.punjabi.default.unicode}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
const NUM_ITEMS = 50;

const Page = ({ index, setAngId }: { index: number }) => {
  return <Ang page={index} setAngId={setAngId} />;
};

const slide1 = () => {
  return <Text>First page</Text>;
};
const slide2 = () => {
  return <Text>Second page</Text>;
};
const slide3 = () => {
  return <Text>Third page</Text>;
};

const slides = [slide1, slide2, slide3];
const firstSlide = slides[0];
const lastSlide = slides[slides.length - 1];

const loopingSlides = [lastSlide, ...slides, firstSlide];

export default function TabOneScreen() {
  const infinitePager = useRef<InfinitePagerImperativeApi>();

  const [displayPage, setDisplayPage] = useState(false);
  const [displayPortal, setDisplayPortal] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setDisplayPortal(false);
    }, 4000);
    setTimeout(async () => {
      let lastang = await AsyncStorage.getItem("lastAng");

      infinitePager.current?.setPage(+lastang, {
        animated: false,
      });
      setDisplayPage(true);
    }, 1000);
    return () => {};
  }, [infinitePager.current]);

  return (
    <View style={styles.flex}>
      <View
        style={{
          display: displayPage ? "flex" : "none",
          flex: 1,
        }}
      >
        <InfinitePager
          ref={infinitePager}
          // PageComponent={Page}
          renderPage={(props) => (
            <Page
              {...props}
              setAngId={async (angId) => {
                infinitePager.current?.setPage(+angId, {
                  animated: false,
                });
              }}
            />
          )}
          style={styles.flex}
          pageWrapperStyle={styles.flex}
          minIndex={1}
          pageBuffer={1}
          onPageChange={(page) => {
            if (page != 0) {
              AsyncStorage.setItem("lastAng", `${page}`);
            }
          }}
        />
      </View>
      {displayPortal && (
        <Portal>
          <Animatable.View
            duration={4000}
            animation={{
              0: {
                opacity: 0,
                backgroundColor: "rgba(0,0,0,1)",
              },
              0.1: {
                opacity: 1,
                backgroundColor: "rgba(0,0,0,1)",
              },
              0.9: {
                opacity: 1,
                backgroundColor: "rgba(0,0,0,1)",
              },
              1: {
                opacity: 0,
                backgroundColor: "rgba(0,0,0,1)",
              },
            }}
            style={{
              flex: 1,
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "600",
                textAlign: "center",
                alignSelf: "center",
                color: "white",
              }}
            >
              ਵਾਹਿਗੁਰੂ ਜੀ ਦਾ ਖਾਲਸਾ{"\n"}
              ਵਾਹਿਗੁਰੂ ਜੀ ਦੀ ਫਤਿਹ
            </Text>
          </Animatable.View>
        </Portal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 10,
    alignContent: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
  container1: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  flex: { flex: 1 },
});
