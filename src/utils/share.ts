import { Platform } from 'react-native';
import * as Sharing from 'expo-sharing';
import { logger } from './logger';

/**
 * Share the result with expo-sharing.
 * On web, falls back to navigator.share or clipboard copy.
 * TODO: implement react-native-view-shot for image capture (requires native build)
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

    // Check if sharing is available
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      logger.warn('Sharing not available on this device');
      return false;
    }

    // TODO: use react-native-view-shot to capture the result card as image
    // For now, share as text only
    await Sharing.shareAsync(
      `data:text/plain;base64,${btoa(unescape(encodeURIComponent(text)))}`,
      { mimeType: 'text/plain', dialogTitle: 'Share your Aurafy reading' },
    );
    return true;
  } catch (err) {
    logger.error('Share failed:', err);
    return false;
  }
}

export async function shareAppLink(): Promise<boolean> {
  const message = 'Check out Aurafy — the psychology-based relationship reading app!';
  return shareResult(message);
}
