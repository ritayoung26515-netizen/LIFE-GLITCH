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

/** True when the official CrazyGames SDK ad module is available. */
export function isCrazyGamesAvailable(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.CrazyGames?.SDK?.ad?.requestAd;
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
    window.CrazyGames!.SDK!.ad!.requestAd('rewarded', {
      adStarted: () => {
        try {
          window.CrazyGames?.SDK?.game?.gameplayStop?.();
        } catch {
          // ignore
        }
        callbacks.adStarted?.();
      },
      adFinished: () => {
        try {
          window.CrazyGames?.SDK?.game?.gameplayStart?.();
        } catch {
          // ignore
        }
        callbacks.adFinished?.();
      },
      adError: (error) => {
        try {
          window.CrazyGames?.SDK?.game?.gameplayStart?.();
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
    window.CrazyGames?.SDK?.game?.gameplayStart?.();
  } catch {
    // ignore outside CrazyGames
  }
}

/** Signal that gameplay paused (game over, menu, or ad about to show). */
export function gameplayStop(): void {
  try {
    window.CrazyGames?.SDK?.game?.gameplayStop?.();
  } catch {
    // ignore outside CrazyGames
  }
}
