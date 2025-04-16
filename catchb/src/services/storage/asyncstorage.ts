import AsyncStorage from "@react-native-async-storage/async-storage";

export async function removeStorage(key: string) {
  try {
    await AsyncStorage.removeItem(key);

    return "SUCCESS";
  } catch {
    return "ERROR";
  }
}

export async function saveStorage(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value);

    return "SUCCESS";
  } catch {
    return "ERROR";
  }
}

export async function getStorage(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
}
