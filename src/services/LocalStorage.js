import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeDataLocal(chave, value) {
  try {
    await AsyncStorage.setItem(chave, value);
  } catch (e) {
    console.error(e);
  }
}

export async function getDataLocal(chave) {
  try {
    const value = await AsyncStorage.getItem(chave);
    if (value !== null) {
      return value;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
  }
}

export function clearDataLocal() {
  AsyncStorage.clear();
}
