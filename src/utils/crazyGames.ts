/**
 * CrazyGames SDK v2 helpers with safe local-dev / GitHub Pages fallbacks.
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

/** Check if running on a CrazyGames platform domain or testing environment */
export function isCrazyGamesDomain(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const host = window.location.hostname;
    const ref = document.referrer || '';
    const search = window.location.search || '';

    if (host.includes('crazygames') || host.includes('1001juegos')) return true;
    if (ref.includes('crazygames') || ref.includes('1001juegos')) return true;
    if (search.includes('useLocalSdk') || search.includes('crazygames')) return true;

    return false;
  } catch {
    return false;
  }
}

/** True when the official CrazyGames SDK is active and not disabled on this domain. */
export function isCrazyGamesAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false;
    if (!isCrazyGamesDomain()) return false;

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
          if (sdk.environment !== 'disabled') {
            sdk.game?.gameplayStop?.();
          }
        } catch {
          // ignore
        }
        callbacks.adStarted?.();
      },
      adFinished: () => {
        try {
          if (sdk.environment !== 'disabled') {
            sdk.game?.gameplayStart?.();
          }
        } catch {
          // ignore
        }
        callbacks.adFinished?.();
      },
      adError: (error) => {
        try {
          if (sdk.environment !== 'disabled') {
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
    const sdk = window.CrazyGames?.SDK;
    if (!sdk || sdk.environment === 'disabled') return;
    sdk.game?.gameplayStart?.();
  } catch {
    // ignore outside CrazyGames
  }
}

/** Signal that gameplay paused (game over, menu, or ad about to show). */
export function gameplayStop(): void {
  try {
    const sdk = window.CrazyGames?.SDK;
    if (!sdk || sdk.environment === 'disabled') return;
    sdk.game?.gameplayStop?.();
  } catch {
    // ignore outside CrazyGames
  }
}
