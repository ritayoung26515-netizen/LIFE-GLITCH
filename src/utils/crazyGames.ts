/**
 * CrazyGames SDK v2 helpers with safe local-dev / preview environment fallbacks.
 * Docs: https://docs.crazygames.com/sdk/html5-v2/
 */

export type AdCallbacks = {
  adStarted?: () => void;
  adFinished?: () => void;
  adError?: (error: unknown) => void;
};

type CrazyGamesAdModule = {
  requestAd: (
    type: 'midgame' | 'rewarded',
    callbacks: AdCallbacks
  ) => void;
};

type CrazyGamesGameModule = {
  gameplayStart: () => void;
  gameplayStop: () => void;
  happytime?: () => void;
};

type CrazyGamesSDK = {
  environment?: 'disabled' | 'local' | 'crazygames' | string;
  getEnvironment?: () => Promise<string>;
  ad?: CrazyGamesAdModule;
  game?: CrazyGamesGameModule;
  init?: () => Promise<void>;
};

declare global {
  interface Window {
    CrazyGames?: {
      SDK?: CrazyGamesSDK;
    };
  }
}

let cachedEnvironment: string | null = null;
let isDetectingEnvironment = false;

/** Check if running on an authentic CrazyGames platform domain or explicit local testing */
export function isCrazyGamesDomain(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const host = window.location.hostname || '';
    const ref = document.referrer || '';
    const search = window.location.search || '';

    // Only true when hosted on crazygames or running with explicit test parameter
    if (host.includes('crazygames.com') || host.includes('1001juegos.com')) return true;
    if (ref.includes('crazygames.com') || ref.includes('1001juegos.com')) return true;
    if (search.includes('useLocalSdk=true') || search.includes('crazygames=true')) return true;

    return false;
  } catch {
    return false;
  }
}

/** Initialize and cache environment safely */
export async function detectCrazyGamesEnvironment(): Promise<string> {
  if (cachedEnvironment !== null) return cachedEnvironment;
  if (typeof window === 'undefined' || !isCrazyGamesDomain()) {
    cachedEnvironment = 'disabled';
    if (typeof window !== 'undefined' && window.CrazyGames?.SDK) {
      window.CrazyGames.SDK.environment = 'disabled';
    }
    return 'disabled';
  }

  const sdk = window.CrazyGames?.SDK;
  if (!sdk) {
    cachedEnvironment = 'disabled';
    return 'disabled';
  }

  if (isDetectingEnvironment) return cachedEnvironment ?? 'disabled';
  isDetectingEnvironment = true;

  try {
    if (typeof sdk.getEnvironment === 'function') {
      const env = await sdk.getEnvironment();
      cachedEnvironment = env;
      sdk.environment = env;
      return env;
    } else if (sdk.environment) {
      cachedEnvironment = sdk.environment;
      return sdk.environment;
    }
  } catch {
    cachedEnvironment = 'disabled';
  } finally {
    isDetectingEnvironment = false;
  }

  return cachedEnvironment ?? 'disabled';
}

// Kick off detection if running in browser
if (typeof window !== 'undefined') {
  if (isCrazyGamesDomain()) {
    if (window.CrazyGames?.SDK) {
      detectCrazyGamesEnvironment();
    } else {
      window.addEventListener('load', () => {
        detectCrazyGamesEnvironment();
      });
    }
  } else {
    cachedEnvironment = 'disabled';
    if (window.CrazyGames?.SDK) {
      window.CrazyGames.SDK.environment = 'disabled';
    }
  }
}

/** True when the official CrazyGames SDK is active and not disabled on this domain. */
export function isCrazyGamesAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    if (!isCrazyGamesDomain()) return false;
    if (cachedEnvironment === 'disabled') return false;

    const sdk = window.CrazyGames?.SDK;
    if (!sdk) return false;
    if (sdk.environment === 'disabled') return false;
    return !!sdk.ad?.requestAd;
  } catch {
    return false;
  }
}

/**
 * Request a rewarded ad.
 * - On CrazyGames: uses the real SDK (revenue).
 * - Elsewhere: returns false so the caller can show the mock modal.
 */
export function requestRewardedAd(callbacks: AdCallbacks): boolean {
  if (!isCrazyGamesAvailable()) {
    return false;
  }

  try {
    const sdk = window.CrazyGames?.SDK;
    if (!sdk || sdk.environment === 'disabled' || !sdk.ad?.requestAd) {
      return false;
    }

    sdk.ad.requestAd('rewarded', {
      adStarted: () => {
        try {
          if (isCrazyGamesAvailable()) {
            sdk.game?.gameplayStop?.();
          }
        } catch {
          // ignore
        }
        callbacks.adStarted?.();
      },
      adFinished: () => {
        try {
          if (isCrazyGamesAvailable()) {
            sdk.game?.gameplayStart?.();
          }
        } catch {
          // ignore
        }
        callbacks.adFinished?.();
      },
      adError: (error) => {
        try {
          if (isCrazyGamesAvailable()) {
            sdk.game?.gameplayStart?.();
          }
        } catch {
          // ignore
        }
        callbacks.adError?.(error);
      },
    });
    return true;
  } catch (err) {
    callbacks.adError?.(err);
    return false;
  }
}

/** Signal that active gameplay has begun (new life / resume after ad). */
export function gameplayStart(): void {
  try {
    if (!isCrazyGamesAvailable()) return;
    const sdk = window.CrazyGames?.SDK;
    if (!sdk || sdk.environment === 'disabled' || cachedEnvironment === 'disabled') return;
    sdk.game?.gameplayStart?.();
  } catch {
    // ignore outside CrazyGames
  }
}

/** Signal that gameplay paused (game over, menu, or ad about to show). */
export function gameplayStop(): void {
  try {
    if (!isCrazyGamesAvailable()) return;
    const sdk = window.CrazyGames?.SDK;
    if (!sdk || sdk.environment === 'disabled' || cachedEnvironment === 'disabled') return;
    sdk.game?.gameplayStop?.();
  } catch {
    // ignore outside CrazyGames
  }
}

