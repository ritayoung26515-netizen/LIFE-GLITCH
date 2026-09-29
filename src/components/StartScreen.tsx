import React, { useState } from 'react';
import { GlitchTitle } from './GlitchTitle';
import { PastRun, Language, Theme } from '../types/game';
import { Volume2, VolumeX, Play, Trophy, ShieldAlert, Globe, Sun, Moon } from 'lucide-react';
import { sounds } from '../utils/audio';

interface StartScreenProps {
  totalRuns: number;
  pastRuns: PastRun[];
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onStartGame: () => void;
  onInspectPastRun: (run: PastRun) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTrophyRoom?: () => void;
  unlockedCount?: number;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  totalRuns,
  pastRuns,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onStartGame,
  onInspectPastRun,
  isMuted,
  onToggleMute,
  onOpenTrophyRoom,
  unlockedCount
}) => {
  const [showRules, setShowRules] = useState(false);
  const isLight = theme === 'light';

  const highestAge = pastRuns.length > 0 ? Math.max(...pastRuns.map(r => r.age)) : null;

  const t = {
    tagline: language === 'zh'
      ? '經歷荒誕人生。做出最糟決定。看看會發生什麼。'
      : 'Live a life. Make terrible decisions. See what happens.',
    totalLives: language === 'zh' ? '總遊玩人生數' : 'Total Lives Played',
    maxAge: language === 'zh' ? '最高年齡' : 'Max Age',
    howToSurvive: language === 'zh' ? '如何在這場代碼漏洞中存活' : 'HOW TO SURVIVE THE GLITCH',
    startBtn: language === 'zh' ? '開始新人生' : 'START LIFE',
    rule1: language === 'zh' ? '• 健康值 > 0%：肉身崩潰將立即終結人生。' : '• Health > 0%: Physical collapse causes immediate death.',
    rule2: language === 'zh' ? '• 壓力值 < 100%：達到 100% 將觸發過勞猝死！' : '• Stress < 100%: At 100%, fatal cardiac burnout triggers!',
    rule3: language === 'zh' ? '• 快樂值 > 0%：零快樂會導致隱入塵埃。' : '• Joy > 0%: Zero joy causes existential fading.',
    rule4: language === 'zh' ? '• 活到 100 歲：解鎖傳奇世紀存活者！' : '• Reach Age 100: Unlock the legendary Century Survivor!',
    hallOfFame: language === 'zh' ? '歷代人生名人堂' : 'PAST LIVES HALL OF FAME',
  };

  return (
    <div
      id="screen-start"
      className="min-h-[100dvh] max-h-[100dvh] overflow-y-auto overscroll-contain flex flex-col p-3 sm:p-6 max-w-lg mx-auto w-full select-none"
    >
      <header className="flex items-center justify-between py-1.5 sm:py-2 border-b border-slate-300 dark:border-[#2d3748] shrink-0">
        <div>
          {onOpenTrophyRoom && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenTrophyRoom();
              }}
              className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-bold px-2 py-1 sm:px-2.5 sm:py-1 rounded-md transition-all cursor-pointer border active:scale-95 ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                  : 'bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border-amber-500/40'
              }`}
              title={language === 'zh' ? '🏆 獎章成就館' : '🏆 Trophy Room'}
            >
              <Trophy size={13} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
              <span>{language === 'zh' ? '成就館' : 'Trophies'}</span>
              {unlockedCount !== undefined && (
                <span className={`text-[10px] font-mono-numbers px-1 py-0.2 rounded font-bold ${
                  isLight ? 'bg-amber-200/80 text-amber-950' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {unlockedCount}
                </span>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleTheme();
            }}
            className={`flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300 shadow-sm'
                : 'text-amber-300 bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title={isLight ? "Switch to Dark Theme / 切換深色模式" : "Switch to Light Theme / 切換淺色模式"}
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={12} className="text-slate-600 sm:w-3.5 sm:h-3.5" /> : <Sun size={12} className="text-amber-400 sm:w-3.5 sm:h-3.5" />}
            <span>{isLight ? '🌙' : '☀️'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className={`flex items-center gap-1 text-[11px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-emerald-700 bg-white hover:bg-slate-100 border-slate-300 shadow-sm'
                : 'text-[#00e676] bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title="Toggle Language"
          >
            <Globe size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
          </button>

          <button
            onClick={onToggleMute}
            className={`p-1 sm:p-1.5 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-300 shadow-sm'
                : 'text-slate-400 hover:text-white bg-[#1a1f2c] border-[#2d3748]'
            }`}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center py-2 sm:py-4">
        <GlitchTitle subtitle={t.tagline} theme={theme} />

        {/* Instant Onboarding: High-visibility Start Button directly under title above the fold */}
        <div className="w-full mt-3 sm:mt-4 mb-2">
          <button
            onClick={() => {
              sounds.playPositive();
              onStartGame();
            }}
            className={`w-full py-4 px-6 font-display font-black text-xl sm:text-2xl tracking-wide rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.98] ${
              isLight
                ? 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_20px_rgba(5,150,105,0.35)] ring-2 ring-emerald-600/30'
                : 'bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] shadow-[0_0_30px_rgba(0,230,118,0.45)] ring-2 ring-[#00e676]/40'
            }`}
          >
            <Play size={22} className="fill-current" />
            <span>{t.startBtn}</span>
          </button>
        </div>

        <div className="mt-1 sm:mt-2 flex flex-wrap items-center justify-center gap-2 text-[12px] sm:text-sm font-mono-numbers">
          <div className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1.5 border ${
            isLight
              ? 'bg-white border-slate-300 text-slate-700 shadow-sm'
              : 'bg-[#1a1f2c] border-[#2d3748] text-slate-300'
          }`}>
            <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t.totalLives}:</span>
            <strong className={`text-sm sm:text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>{totalRuns}</strong>
          </div>
          {highestAge && (
            <div className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1.5 border ${
              isLight
                ? 'bg-white border-slate-300 text-slate-700 shadow-sm'
                : 'bg-[#1a1f2c] border-[#2d3748] text-slate-300'
            }`}>
              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>{t.maxAge}:</span>
              <strong className={`text-sm sm:text-base font-bold ${isLight ? 'text-emerald-600' : 'text-[#00e676]'}`}>{highestAge}</strong>
            </div>
          )}
        </div>

        <div className="w-full mt-2.5 sm:mt-4">
          <button
            onClick={() => {
              sounds.playClick();
              setShowRules(!showRules);
            }}
            className={`w-full py-2.5 px-3 text-[13px] sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-between cursor-pointer border ${
              isLight
                ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm'
                : 'bg-[#161a24] hover:bg-[#1a1f2c] border-[#2d3748] text-slate-200'
            }`}
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldAlert size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
              <span>{t.howToSurvive}</span>
            </span>
            <span>{showRules ? "▲" : "▼"}</span>
          </button>

          {showRules && (
            <div className={`mt-1.5 p-3 sm:p-4 rounded-lg text-[14px] sm:text-[15px] space-y-2 font-medium animate-fade-in text-left leading-relaxed border ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800 shadow-sm'
                : 'bg-[#1a1f2c] border-[#2d3748] text-slate-100'
            }`}>
              <p>{t.rule1}</p>
              <p>{t.rule2}</p>
              <p>{t.rule3}</p>
              <p>{t.rule4}</p>
            </div>
          )}
        </div>

        {pastRuns.length > 0 && (
          <div className={`w-full mt-2.5 sm:mt-3 rounded-xl p-2.5 sm:p-3 text-left border ${
            isLight
              ? 'bg-white border-slate-300 shadow-sm'
              : 'bg-[#161a24] border-[#2d3748] shadow-lg'
          }`}>
            <div className={`flex items-center justify-between text-[13px] sm:text-sm mb-2 font-semibold gap-2 ${
              isLight ? 'text-sky-700' : 'text-[#00f0ff]'
            }`}>
              <span className="flex items-center gap-1.5 shrink-0">
                <Trophy size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
                <span>{t.hallOfFame} ({pastRuns.length})</span>
              </span>
              <span className={`text-[12px] font-normal truncate ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}>
                {language === 'zh' ? '可上下捲動瀏覽全部存檔' : 'Scroll to view all past records'}
              </span>
            </div>
            <div className="space-y-2 max-h-56 sm:max-h-64 overflow-y-auto pr-1">
              {pastRuns.slice().reverse().map((run, idx) => (
                <button
                  key={run.id || idx}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onInspectPastRun(run);
                  }}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-150 cursor-pointer group flex flex-col gap-1.5 border active:scale-[0.99] ${
                    isLight
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 hover:border-sky-500 shadow-xs text-slate-900'
                      : 'bg-[#1a1f2c] hover:bg-[#222a3d] border-[#2d3748]/80 hover:border-[#00f0ff]/70 text-white shadow-sm hover:shadow-[0_0_14px_rgba(0,240,255,0.15)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Trophy size={16} className={`${isLight ? 'text-amber-600 group-hover:text-sky-600' : 'text-amber-400 group-hover:text-[#00f0ff]'} shrink-0 transition-colors`} />
                      <span className={`font-bold text-[15px] sm:text-base leading-snug tracking-normal line-clamp-1 transition-colors ${
                        isLight ? 'text-slate-900 group-hover:text-sky-700' : 'text-white group-hover:text-[#00f0ff]'
                      }`}>
                        {run.epitaph[language]}
                      </span>
                    </div>
                    <span className={`shrink-0 text-[12px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-md transition-all border ${
                      isLight
                        ? 'text-sky-700 bg-sky-50 border-sky-200 group-hover:bg-sky-600 group-hover:text-white'
                        : 'text-cyan-400 bg-cyan-950/70 border-cyan-800/60 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-[#00f0ff]'
                    }`}>
                      {language === 'zh' ? '查看 →' : 'Inspect →'}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2 text-[13px] sm:text-sm font-medium pl-[23px] tracking-normal ${
                    isLight ? 'text-slate-600' : 'text-slate-300'
                  }`}>
                    <span className={`font-semibold ${isLight ? 'text-emerald-700' : 'text-[#00e676]'}`}>
                      {language === 'zh' ? `${run.age} 歲` : `Age ${run.age}`}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className={`font-semibold ${isLight ? 'text-amber-700' : 'text-amber-300'}`}>
                      {language === 'zh' ? `淨資產 $${run.money.toLocaleString()}` : `$${run.money.toLocaleString()}`}
                    </span>
                    {run.date && (
                      <>
                        <span className="text-slate-400">·</span>
                        <span className={`text-[12px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>{run.date}</span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
