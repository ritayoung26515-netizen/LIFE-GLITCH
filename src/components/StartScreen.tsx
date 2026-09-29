import React, { useState } from 'react';
import { GlitchTitle } from './GlitchTitle';
import { PastRun, Language } from '../types/game';
import { Volume2, VolumeX, Play, Trophy, ShieldAlert, Sparkles, Globe } from 'lucide-react';
import { sounds } from '../utils/audio';
import { isChinese, languageButtonLabel, loc } from '../utils/i18n';

interface StartScreenProps {
  totalRuns: number;
  pastRuns: PastRun[];
  language: Language;
  onToggleLanguage: () => void;
  onStartGame: () => void;
  onInspectPastRun: (run: PastRun) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  totalRuns,
  pastRuns,
  language,
  onToggleLanguage,
  onStartGame,
  onInspectPastRun,
  isMuted,
  onToggleMute
}) => {
  const [showRules, setShowRules] = useState(false);

  const highestAge = pastRuns.length > 0 ? Math.max(...pastRuns.map(r => r.age)) : null;

  const t = {
    tagline: isChinese(language) 
      ? '經歷荒誕人生。做出最糟決定。看看會發生什麼。' 
      : 'Live a life. Make terrible decisions. See what happens.',
    totalLives: isChinese(language) ? '總遊玩人生數' : 'Total Lives Played',
    maxAge: isChinese(language) ? '最高年齡' : 'Max Age',
    howToSurvive: isChinese(language) ? '如何在這場代碼漏洞中存活' : 'HOW TO SURVIVE THE GLITCH',
    startBtn: isChinese(language) ? '開始新人生' : 'START LIFE',
    rule1: isChinese(language) ? '• 健康值 > 0%：肉身崩潰將立即終結人生。' : '• Health > 0%: Physical collapse causes immediate death.',
    rule2: isChinese(language) ? '• 壓力值 < 100%：達到 100% 將觸發過勞猝死！' : '• Stress < 100%: At 100%, fatal cardiac burnout triggers!',
    rule3: isChinese(language) ? '• 快樂值 > 0%：零快樂會導致隱入塵埃。' : '• Joy > 0%: Zero joy causes existential fading.',
    rule4: isChinese(language) ? '• 活到 100 歲：解鎖傳奇世紀存活者！' : '• Reach Age 100: Unlock the legendary Century Survivor!',
    hallOfFame: isChinese(language) ? '歷代人生名人堂' : 'PAST LIVES HALL OF FAME',
    initReady: isChinese(language) ? '點擊初始化現實矩陣（18歲）' : 'PRESS TO INITIALIZE REALITY MATRIX AT AGE 18',
  };

  return (
    <div
      id="screen-start"
      className="min-h-[100dvh] max-h-[100dvh] overflow-y-auto overscroll-contain flex flex-col p-3 sm:p-6 max-w-lg mx-auto w-full select-none"
    >
      <header className="flex items-center justify-between py-1.5 sm:py-2 border-b border-[#2d3748] shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00e676] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono-numbers text-slate-400 tracking-wider">
            LIFE GLITCH v0.1
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 text-[10px] sm:text-xs font-mono-numbers font-bold text-[#00e676] hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-md transition-colors cursor-pointer"
            title="Toggle Language EN / 繁 / 簡"
          >
            <Globe size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>{languageButtonLabel(language)}</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-1 sm:p-1.5 text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] rounded-md transition-colors cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center py-2 sm:py-4">
        <div className="w-full rounded-xl overflow-hidden border border-[#2d3748] relative mb-2 sm:mb-3 shadow-lg bg-[#1a1f2c]">
          <div className="flex items-center gap-3 px-3 py-2.5 sm:py-3 bg-gradient-to-br from-[#1a1f2c] to-[#12151c]">
            <Sparkles size={20} className="text-[#00e676] shrink-0 animate-pulse" />
            <div className="min-w-0 flex-1">
              <div className="font-display font-bold text-white text-xs sm:text-sm tracking-wide leading-tight">
                SIMULATION INITIALIZING
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[10px] sm:text-[11px] font-mono-numbers">
                <span className="text-[#00f0ff]">
                  {isChinese(language) ? '雙語事件庫：已就緒' : 'DATABASE: READY'}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">
                  {t.totalLives}: {totalRuns}
                </span>
              </div>
            </div>
          </div>
        </div>

        <GlitchTitle subtitle={t.tagline} />

        <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-2 text-[10px] sm:text-xs font-mono-numbers">
          <div className="bg-[#1a1f2c] border border-[#2d3748] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-slate-300 flex items-center gap-1.5">
            <span className="text-slate-400">{t.totalLives}:</span>
            <strong className="text-white text-xs sm:text-sm">{totalRuns}</strong>
          </div>
          {highestAge && (
            <div className="bg-[#1a1f2c] border border-[#2d3748] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg text-slate-300 flex items-center gap-1.5">
              <span className="text-slate-400">{t.maxAge}:</span>
              <strong className="text-[#00e676] text-xs sm:text-sm">{highestAge}</strong>
            </div>
          )}
        </div>

        <div className="w-full mt-2.5 sm:mt-4">
          <button
            onClick={() => {
              sounds.playClick();
              setShowRules(!showRules);
            }}
            className="w-full py-1.5 sm:py-2 px-3 text-[10px] sm:text-xs font-mono-numbers text-slate-400 hover:text-slate-200 bg-[#161a24] border border-[#2d3748] rounded-lg transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ShieldAlert size={13} className="text-amber-400" />
              <span>{t.howToSurvive}</span>
            </span>
            <span>{showRules ? "▲" : "▼"}</span>
          </button>

          {showRules && (
            <div className="mt-1.5 p-2.5 sm:p-3.5 bg-[#1a1f2c] border border-[#2d3748] rounded-lg text-[10px] sm:text-xs text-slate-300 space-y-1 animate-fade-in text-left">
              <p>{t.rule1}</p>
              <p>{t.rule2}</p>
              <p>{t.rule3}</p>
              <p>{t.rule4}</p>
            </div>
          )}
        </div>

        {pastRuns.length > 0 && (
          <div className="w-full mt-2.5 sm:mt-3 bg-[#161a24] border border-[#2d3748] rounded-xl p-2.5 sm:p-3 text-left shadow-lg">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono-numbers text-[#00f0ff] mb-1.5 sm:mb-2 font-semibold gap-2">
              <span className="flex items-center gap-1.5 shrink-0">
                <Trophy size={13} className="text-amber-400" />
                <span>{t.hallOfFame}</span>
              </span>
              <span className="text-slate-400 text-[9px] sm:text-[10px] font-normal truncate">
                {isChinese(language) ? '點擊存檔可預覽時間軸並分叉' : 'Click record to inspect & fork'}
              </span>
            </div>
            <div className="space-y-1.5 max-h-28 sm:max-h-32 overflow-y-auto pr-1">
              {pastRuns.slice().reverse().map((run, idx) => (
                <button
                  key={run.id || idx}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onInspectPastRun(run);
                  }}
                  className="w-full text-left text-[10px] sm:text-[11px] text-slate-300 flex items-center justify-between bg-[#1a1f2c] hover:bg-[#232c3f] border border-[#2d3748]/70 hover:border-[#00f0ff]/60 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg transition-all duration-150 cursor-pointer group shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 truncate pr-2 min-w-0">
                    <Trophy size={12} className="text-amber-400 group-hover:text-[#00f0ff] shrink-0 transition-colors" />
                    <span className="font-bold text-white group-hover:text-[#00f0ff] truncate transition-colors">
                      {loc(run.epitaph, language)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <span className="font-mono-numbers text-slate-400 text-[9px] sm:text-[10px]">
                      {isChinese(language) ? `${run.age} 歲` : `Age ${run.age}`} · ${run.money.toLocaleString()}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono-numbers font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-[#00f0ff] px-1.5 py-0.5 rounded transition-all">
                      {isChinese(language) ? '查看 ➜' : 'Inspect ➜'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 pb-3 sm:pb-2 shrink-0 sticky bottom-0 bg-[#0f1117]/95 backdrop-blur-sm">
        <button
          onClick={() => {
            sounds.playPositive();
            onStartGame();
          }}
          className="w-full py-3 sm:py-4 px-4 sm:px-6 bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] font-display font-black text-lg sm:text-2xl uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(0,230,118,0.4)] hover:shadow-[0_0_35px_rgba(0,230,118,0.6)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 active:scale-[0.98]"
        >
          <Play size={20} className="fill-current sm:w-[22px] sm:h-[22px]" />
          <span>{t.startBtn}</span>
        </button>
        <p className="text-[10px] sm:text-[11px] font-mono-numbers text-center text-slate-500 mt-1.5">
          {t.initReady}
        </p>
      </div>
    </div>
  );
};
