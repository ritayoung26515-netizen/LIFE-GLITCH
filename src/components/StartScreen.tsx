import React, { useState } from 'react';
import { GlitchTitle } from './GlitchTitle';
import { PastRun, Language } from '../types/game';
import { Volume2, VolumeX, Play, Trophy, ShieldAlert, Globe } from 'lucide-react';
import { sounds } from '../utils/audio';

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
      {/* Top Header — compact language and audio controls */}
      <header className="flex items-center justify-end py-1.5 sm:py-2 border-b border-[#2d3748] shrink-0">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-[#00e676] hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-md transition-colors cursor-pointer"
            title="Toggle Language"
          >
            <Globe size={12} className="sm:w-3.5 sm:h-3.5" />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
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

      {/* Scrollable main content */}
      <div className="flex-1 flex flex-col items-center py-2 sm:py-4">
        {/* Title & Tagline */}
        <GlitchTitle subtitle={t.tagline} />

        {/* Meta chips */}
        <div className="mt-2 sm:mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
          <div className="bg-[#1a1f2c] border border-[#2d3748] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-slate-300 flex items-center gap-1.5 font-medium">
            <span className="text-slate-400">{t.totalLives}:</span>
            <strong className="text-white text-xs sm:text-sm font-mono-numbers">{totalRuns}</strong>
          </div>
          {highestAge && (
            <div className="bg-[#1a1f2c] border border-[#2d3748] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-slate-300 flex items-center gap-1.5 font-medium">
              <span className="text-slate-400">{t.maxAge}:</span>
              <strong className="text-[#00e676] text-xs sm:text-sm font-mono-numbers">{highestAge}</strong>
            </div>
          )}
        </div>

        {/* Rules Accordion */}
        <div className="w-full mt-2.5 sm:mt-4">
          <button
            onClick={() => {
              sounds.playClick();
              setShowRules(!showRules);
            }}
            className="w-full py-2 px-3 text-[11px] sm:text-xs font-medium text-slate-300 hover:text-white bg-[#161a24] border border-[#2d3748] rounded-lg transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-1.5 font-semibold">
              <ShieldAlert size={14} className="text-amber-400" />
              <span>{t.howToSurvive}</span>
            </span>
            <span>{showRules ? "▲" : "▼"}</span>
          </button>

          {showRules && (
            <div className="mt-1.5 p-3 sm:p-4 bg-[#1a1f2c] border border-[#2d3748] rounded-lg text-[12px] sm:text-[13px] text-slate-200 space-y-1.5 font-medium animate-fade-in text-left leading-relaxed">
              <p>{t.rule1}</p>
              <p>{t.rule2}</p>
              <p>{t.rule3}</p>
              <p>{t.rule4}</p>
            </div>
          )}
        </div>

        {/* Hall of Fame */}
        {pastRuns.length > 0 && (
          <div className="w-full mt-2.5 sm:mt-3 bg-[#161a24] border border-[#2d3748] rounded-xl p-2.5 sm:p-3 text-left shadow-lg">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#00f0ff] mb-2 font-semibold gap-2">
              <span className="flex items-center gap-1.5 shrink-0">
                <Trophy size={14} className="text-amber-400" />
                <span>{t.hallOfFame} ({pastRuns.length})</span>
              </span>
              <span className="text-slate-400 text-[10px] sm:text-[11px] font-normal truncate">
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
                  className="w-full text-left bg-[#1a1f2c] hover:bg-[#222a3d] border border-[#2d3748]/80 hover:border-[#00f0ff]/70 p-3 rounded-xl transition-all duration-150 cursor-pointer group shadow-sm hover:shadow-[0_0_14px_rgba(0,240,255,0.15)] active:scale-[0.99] flex flex-col gap-1.5"
                >
                  {/* Row 1: Epitaph Title + Inspect Badge */}
                  <div className="flex items-center justify-between gap-2 w-full">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Trophy size={15} className="text-amber-400 group-hover:text-[#00f0ff] shrink-0 transition-colors" />
                      <span className="font-semibold text-white group-hover:text-[#00f0ff] text-[13px] sm:text-sm leading-snug tracking-normal line-clamp-1 transition-colors">
                        {run.epitaph[language]}
                      </span>
                    </div>
                    <span className="shrink-0 text-[11px] sm:text-xs font-semibold text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-[#00f0ff] px-2.5 py-0.5 rounded-md transition-all">
                      {language === 'zh' ? '查看 ➜' : 'Inspect ➜'}
                    </span>
                  </div>

                  {/* Row 2: Stats with Age, Net Worth, Date */}
                  <div className="flex items-center gap-2 text-slate-300 text-[11px] sm:text-xs font-medium pl-[23px] tracking-normal">
                    <span className="text-[#00e676] font-semibold">
                      {language === 'zh' ? `${run.age} 歲` : `Age ${run.age}`}
                    </span>
                    <span className="text-slate-500">·</span>
                    <span className="text-amber-300 font-semibold">
                      {language === 'zh' ? `淨資產 $${run.money.toLocaleString()}` : `$${run.money.toLocaleString()}`}
                    </span>
                    {run.date && (
                      <>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400 text-[10px] sm:text-[11px]">
                          {run.date}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom CTA */}
      <div className="pt-2 pb-3 sm:pb-2 shrink-0 sticky bottom-0 bg-[#0f1117]/95 backdrop-blur-sm">
        <button
          onClick={() => {
            sounds.playPositive();
            onStartGame();
          }}
          className="w-full py-3.5 sm:py-4 px-4 sm:px-6 bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] font-display font-black text-lg sm:text-2xl uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(0,230,118,0.4)] hover:shadow-[0_0_35px_rgba(0,230,118,0.6)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 sm:gap-3 active:scale-[0.98]"
        >
          <Play size={20} className="fill-current sm:w-[22px] sm:h-[22px]" />
          <span>{t.startBtn}</span>
        </button>
      </div>
    </div>
  );
};
