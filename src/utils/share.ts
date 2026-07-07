import { Platform, Share } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { logger } from './logger';

/**
 * Share plain text via the native share sheet (the text-only fallback — images go
 * through shareImage below). Share.share on purpose, NOT expo-sharing:
 * Sharing.shareAsync needs a real file URI and Android silently rejects data:
 * URIs, so the old base64 text path never actually shared anything.
 * On web, falls back to navigator.share when available.
 */
export async function shareResult(text: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ text });
        return true;
      }
      return false;
    }
    await Share.share({ message: text });
    return true;
  } catch (err) {
    logger.error('Share failed:', err);
    return false;
  }
}

/**
 * Share a captured image (the react-native-view-shot tmpfile from ShareCard).
 * Returns false when sharing is unavailable so callers can fall back to text.
 */
export async function shareImage(uri: string, dialogTitle: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web') return false;
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      logger.warn('Sharing not available on this device');
      return false;
    }
    await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle });
    return true;
  } catch (err) {
    logger.error('Image share failed:', err);
    return false;
  }
}

/**
 * Save a captured card image to the device gallery (write-only permission).
 * Returns false when permission is denied / unavailable so callers can hint.
 */
export async function saveImageToGallery(uri: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web') return false;
    const { status } = await MediaLibrary.requestPermissionsAsync(true);
    if (status !== 'granted') return false;
    await MediaLibrary.saveToLibraryAsync(uri);
    return true;
  } catch (err) {
    logger.error('Save to gallery failed:', err);
    return false;
  }
}

/** Share the app itself. The message comes from the caller (i18n'd — utils can't hook
 *  useTranslation), e.g. `t('settings.shareMessage')`. */
export async function shareAppLink(message: string): Promise<boolean> {
  return shareResult(message);
}
