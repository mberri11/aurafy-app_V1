import AsyncStorage from '@react-native-async-storage/async-storage';

/** All AsyncStorage calls go through this module — never use AsyncStorage directly. */

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silent
  }
}

export async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // silent
  }
}

export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {
    // silent
  }
}
