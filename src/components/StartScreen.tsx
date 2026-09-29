import React, { useState } from 'react';
import { GlitchTitle } from './GlitchTitle';
import { PastRun, Language } from '../types/game';
import { Volume2, VolumeX, Play, Trophy, ShieldAlert, Sparkles, Globe } from 'lucide-react';
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
  const [imageLoaded, setImageLoaded] = useState(true);

  const highestAge = pastRuns.length > 0 ? Math.max(...pastRuns.map(r => r.age)) : null;
  const highestMoney = pastRuns.length > 0 ? Math.max(...pastRuns.map(r => r.money)) : null;

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
    initReady: language === 'zh' ? '點擊初始化現實矩陣（18歲）' : 'PRESS TO INITIALIZE REALITY MATRIX AT AGE 18',
  };

  return (
    <div id="screen-start" className="min-h-screen flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto w-full select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between py-2 border-b border-[#2d3748]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00e676] animate-pulse" />
          <span className="text-xs font-mono-numbers text-slate-400 tracking-wider">
            LIFE GLITCH v0.1
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 text-xs font-mono-numbers font-bold text-[#00e676] hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            title="Toggle Language"
          >
            <Globe size={14} />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-1.5 text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] rounded-md transition-colors cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </header>

      {/* Hero Content */}
      <div className="py-4 my-auto flex flex-col items-center">
        {/* Thematic Hero Visual */}
        <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden border border-[#2d3748] relative mb-4 shadow-xl bg-[#1a1f2c] flex items-center justify-center">
          {imageLoaded ? (
            <img
              src="/src/assets/images/life_glitch_hero_1790649906002.jpg"
              alt="Life Glitch neon artwork"
              referrerPolicy="no-referrer"
              onError={() => setImageLoaded(false)}
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          ) : (
            <div className="text-center p-6 bg-gradient-to-br from-[#1a1f2c] to-[#12151c] w-full h-full flex flex-col items-center justify-center">
              <Sparkles size={36} className="text-[#00e676] mb-2 animate-bounce" />
              <div className="font-display font-bold text-white text-lg">SIMULATION INITIALIZING</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono-numbers">
            <span className="bg-[#12151c]/80 backdrop-blur-md px-2.5 py-1 rounded text-[#00f0ff] border border-[#2d3748]">
              {language === 'zh' ? '雙語事件庫：已就緒' : 'DATABASE: READY'}
            </span>
            <span className="bg-[#12151c]/80 backdrop-blur-md px-2.5 py-1 rounded text-slate-300 border border-[#2d3748]">
              {t.totalLives}: {totalRuns}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <GlitchTitle subtitle={t.tagline} />

        {/* Prominent Meta Info */}
        <div className="mt-3 flex items-center gap-3 text-xs font-mono-numbers">
          <div className="bg-[#1a1f2c] border border-[#2d3748] px-3 py-1.5 rounded-lg text-slate-300 flex items-center gap-2">
            <span className="text-slate-400">{t.totalLives}:</span>
            <strong className="text-white text-sm">{totalRuns}</strong>
          </div>
          {highestAge && (
            <div className="bg-[#1a1f2c] border border-[#2d3748] px-3 py-1.5 rounded-lg text-slate-300 flex items-center gap-2">
              <span className="text-slate-400">{t.maxAge}:</span>
              <strong className="text-[#00e676] text-sm">{highestAge}</strong>
            </div>
          )}
        </div>

        {/* Rules Accordion */}
        <div className="w-full mt-4">
          <button
            onClick={() => {
              sounds.playClick();
              setShowRules(!showRules);
            }}
            className="w-full py-2 px-3 text-xs font-mono-numbers text-slate-400 hover:text-slate-200 bg-[#161a24] border border-[#2d3748] rounded-lg transition-colors flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-amber-400" />
              <span>{t.howToSurvive}</span>
            </span>
            <span>{showRules ? "▲" : "▼"}</span>
          </button>

          {showRules && (
            <div className="mt-2 p-3.5 bg-[#1a1f2c] border border-[#2d3748] rounded-lg text-xs text-slate-300 space-y-1.5 animate-fade-in text-left">
              <p>{t.rule1}</p>
              <p>{t.rule2}</p>
              <p>{t.rule3}</p>
              <p>{t.rule4}</p>
            </div>
          )}
        </div>

        {/* Hall of Fame */}
        {pastRuns.length > 0 && (
          <div className="w-full mt-3 bg-[#161a24] border border-[#2d3748] rounded-xl p-3 text-left shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono-numbers text-[#00f0ff] mb-2 font-semibold">
              <span className="flex items-center gap-1.5">
                <Trophy size={14} className="text-amber-400" />
                <span>{t.hallOfFame}</span>
              </span>
              <span className="text-slate-400 text-[10px] font-normal">
                {language === 'zh' ? '點擊存檔可預覽時間軸並分叉' : 'Click record to inspect & fork'}
              </span>
            </div>
            <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
              {pastRuns.slice().reverse().map((run, idx) => (
                <button
                  key={run.id || idx}
                  type="button"
                  onClick={() => {
                    sounds.playClick();
                    onInspectPastRun(run);
                  }}
                  className="w-full text-left text-[11px] text-slate-300 flex items-center justify-between bg-[#1a1f2c] hover:bg-[#232c3f] border border-[#2d3748]/70 hover:border-[#00f0ff]/60 px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer group shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Trophy size={13} className="text-amber-400 group-hover:text-[#00f0ff] shrink-0 transition-colors" />
                    <span className="font-bold text-white group-hover:text-[#00f0ff] truncate transition-colors">
                      {run.epitaph[language]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono-numbers text-slate-400 text-[10px]">
                      {language === 'zh' ? `${run.age} 歲` : `Age ${run.age}`} · ${run.money.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono-numbers font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 group-hover:bg-[#00f0ff] group-hover:text-black group-hover:border-[#00f0ff] px-1.5 py-0.5 rounded transition-all">
                      {language === 'zh' ? '查看 ➜' : 'Inspect ➜'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Start Life CTA */}
      <div className="pt-3 pb-2">
        <button
          onClick={() => {
            sounds.playPositive();
            onStartGame();
          }}
          className="w-full py-4 px-6 bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] font-display font-black text-xl sm:text-2xl uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(0,230,118,0.4)] hover:shadow-[0_0_35px_rgba(0,230,118,0.6)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98]"
        >
          <Play size={22} className="fill-current" />
          <span>{t.startBtn}</span>
        </button>
        <p className="text-[11px] font-mono-numbers text-center text-slate-500 mt-2">
          {t.initReady}
        </p>
      </div>
    </div>
  );
};
