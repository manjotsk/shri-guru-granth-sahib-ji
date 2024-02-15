import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { Provider as PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import i18n from "./i18n";
import { useAtom } from "jotai";
import { fontScaleAtom } from "./store/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [fontScale, setFontScale] =useAtom(fontScaleAtom)
useEffect(()=>{
  i18n.changeLanguage('en');
  AsyncStorage.getItem('fontScale').then(item=>setFontScale(+(item||1)))

},[])
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </PaperProvider>
      </QueryClientProvider>
    );
  }
}
