import { atom, useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export const authTokenAtom = atom<string | null>(null);
export const isTokenExpiredAtom = atom<boolean>(true);

export const checkTokenExpiration = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        isTokenExpiredAtom[1](true);
      } else {
        isTokenExpiredAtom[1](false);
      }
    }
  } catch (error) {
    console.error('Error checking token expiration:', error);
  }
};
