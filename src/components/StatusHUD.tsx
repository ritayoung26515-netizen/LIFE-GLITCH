import React from 'react';
import { GameState, Language, Theme, TurnFeedback } from '../types/game';
import { Volume2, VolumeX, BookOpen, AlertTriangle, Globe, Home, Sun, Moon, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';
import { calculateJobSalary } from '../utils/economy';

interface StatusHUDProps {
  state: GameState;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onOpenLog: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleFlagsDrawer?: () => void;
  onReturnHome?: () => void;
  /** Last turn deltas – shown inline next to the relevant stats (does not auto-hide) */
  feedback?: TurnFeedback | null;
  canRegret?: boolean;
  onRegretClick?: () => void;
}

export const StatusHUD: React.FC<StatusHUDProps> = ({
  state,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onOpenLog,
  isMuted,
  onToggleMute,
  onToggleFlagsDrawer,
  onReturnHome,
  feedback,
  canRegret,
  onRegretClick
}) => {
  const isLight = theme === 'light';
  const isHighStress = state.stress >= 70;
  const isCriticalHealth = state.health <= 25;

  const formattedMoney = new Intl.NumberFormat(language === 'zh' ? 'zh-TW' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(state.money);

  const salaryInfo = calculateJobSalary(state.job, state);

  const salaryBadge = salaryInfo.salary > 0 
    ? (language === 'zh' 
        ? `(+${salaryInfo.salary >= 1000 ? Math.round(salaryInfo.salary / 1000) + 'k' : salaryInfo.salary}/年)` 
        : `(+$${salaryInfo.salary >= 1000 ? Math.round(salaryInfo.salary / 1000) + 'k' : salaryInfo.salary}/yr)`)
    : '';

  // Extract persistent deltas for inline display
  const getDelta = (keys: string[]) => {
    if (!feedback?.deltas?.length) return null;
    return feedback.deltas.find(d => 
      keys.some(k => 
        d.label.zh.includes(k) || 
        d.label.en.toLowerCase().includes(k.toLowerCase())
      )
    ) || null;
  };

  const healthDelta = getDelta(['健康', 'Health']);
  const stressDelta = getDelta(['壓力', 'Stress']);
  const joyDelta = getDelta(['快樂', 'Joy', 'Happiness']);
  const moneyDelta = getDelta(['收支', '年薪', 'Cash', 'Salary', 'Event Cash', 'Wealth']);
  const fameDelta = getDelta(['聲望', 'Fame']);

  const renderDelta = (delta: { value: string; positive: boolean } | null) => {
    if (!delta) return null;
    return (
      <span
        className={`ml-1.5 text-[11px] font-mono-numbers font-bold px-1.5 py-0.5 rounded border ${
          delta.positive
            ? (isLight ? 'text-emerald-700 bg-emerald-50 border-emerald-300' : 'text-emerald-400 bg-emerald-950/50 border-emerald-700/50')
            : (isLight ? 'text-red-700 bg-red-50 border-red-300' : 'text-rose-400 bg-rose-950/50 border-rose-700/50')
        }`}
      >
        {delta.value}
      </span>
    );
  };

  const t = {
    log: language === 'zh' ? '履歷' : 'Log',
  };

  return (
    <header className={`sticky top-0 z-20 backdrop-blur-md px-3 py-2 select-none transition-colors border-b ${
      isLight
        ? 'bg-white/95 border-slate-300 shadow-sm text-slate-800'
        : 'bg-[#12151c]/95 border-[#2d3748] shadow-lg text-white'
    }`}>
      {/* Top Bar: Age badge & Utility controls */}
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-0.5 rounded-lg flex items-center border shadow-2xs ${
            isLight
              ? 'bg-slate-100 border-slate-300 text-slate-900'
              : 'bg-[#1a1f2c] border-[#2d3748] text-white'
          }`}>
            <span className="text-sm sm:text-base font-bold font-mono-numbers">
              {language === 'zh' ? `${state.age} 歲` : `Age ${state.age}`}
            </span>
          </div>
          {state.fame > 0 && (
            <span className={`text-[11px] font-mono-numbers font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${
              isLight
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
            }`}>
              ⭐ {state.fame}%
              {renderDelta(fameDelta)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Prominent Regret button */}
          {canRegret && onRegretClick && (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onRegretClick();
              }}
              className={`shrink-0 flex items-center gap-1 text-[12px] font-bold rounded-lg px-2.5 py-1.5 transition-all cursor-pointer border shadow-sm ${
                isLight
                  ? 'text-amber-900 bg-amber-100 hover:bg-amber-200 border-amber-400 ring-1 ring-amber-300'
                  : 'text-amber-200 bg-amber-900/50 hover:bg-amber-800/60 border-amber-500/70 ring-1 ring-amber-500/40'
              }`}
            >
              <RotateCcw size={13} />
              <span>{language === 'zh' ? '後悔了？' : 'Regret?'}</span>
            </button>
          )}

          {onReturnHome && (
            <button
              onClick={() => {
                sounds.playClick();
                onReturnHome();
              }}
              className={`flex items-center gap-1 text-xs font-semibold px-2 sm:px-2.5 py-1.5 rounded-md transition-colors cursor-pointer tracking-normal border ${
                isLight
                  ? 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300 hover:border-amber-500 shadow-xs'
                  : 'text-slate-200 bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748] hover:border-amber-400/60'
              }`}
              title={language === 'zh' ? '返回主頁 / Home' : 'Return to Home'}
              aria-label="Home"
            >
              <Home size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
              <span className="hidden sm:inline font-semibold">{language === 'zh' ? '主頁' : 'Home'}</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onToggleTheme();
            }}
            className={`flex items-center gap-1 text-xs font-semibold px-2 sm:px-2.5 py-1.5 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300 shadow-xs'
                : 'text-amber-300 bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title={isLight ? "Switch to Dark Theme / 切換深色模式" : "Switch to Light Theme / 切換淺色模式"}
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={14} className="text-slate-600" /> : <Sun size={14} className="text-amber-400" />}
            <span className="hidden sm:inline">{isLight ? '暗黑' : '亮色'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer tracking-normal border ${
              isLight
                ? 'text-emerald-700 bg-white hover:bg-slate-100 border-slate-300 shadow-xs'
                : 'text-[#00e676] bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title="Toggle Language / 切換語言"
          >
            <Globe size={14} />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenLog();
            }}
            className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-slate-700 bg-white hover:bg-slate-100 border-slate-300 shadow-xs'
                : 'text-slate-200 bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title="View Life Log"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">{t.log}</span>
          </button>

          <button
            onClick={onToggleMute}
            className={`p-1.5 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-300 shadow-xs'
                : 'text-slate-300 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* Frameless 2-Column Status Dashboard */}
      <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1.5 pt-0.5">
        {/* Left Column: Core Survival Meters */}
        <div className="flex flex-col justify-between space-y-1.5">
          {/* Health Meter */}
          <div>
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold mb-0.5">
              <span className={`flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <span>❤️</span>
                <span>{language === 'zh' ? '健康' : 'Health'}</span>
                {isCriticalHealth && <AlertTriangle size={11} className={isLight ? 'text-red-600' : 'text-[#ff1744]'} />}
              </span>
              <span className={`font-mono-numbers text-[12px] sm:text-xs font-bold flex items-center ${
                isCriticalHealth 
                  ? (isLight ? 'text-red-600' : 'text-[#ff1744]') 
                  : (isLight ? 'text-slate-900' : 'text-white')
              }`}>
                {state.health}%
                {renderDelta(healthDelta)}
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-[#1e2330]'}`}>
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  state.health <= 25 
                    ? (isLight ? 'bg-red-600' : 'bg-[#ff1744]') 
                    : state.health <= 50 
                      ? 'bg-amber-500' 
                      : (isLight ? 'bg-emerald-600' : 'bg-[#00e676]')
                }`}
                style={{ width: `${Math.max(0, Math.min(100, state.health))}%` }}
              />
            </div>
          </div>

          {/* Stress Meter */}
          <div>
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold mb-0.5">
              <span className={`flex items-center gap-1 ${
                isHighStress 
                  ? (isLight ? 'text-red-700 font-bold' : 'text-[#ff1744] font-bold') 
                  : (isLight ? 'text-slate-700' : 'text-slate-300')
              }`}>
                <span>⚡</span>
                <span>{language === 'zh' ? '壓力' : 'Stress'}</span>
                {isHighStress && <AlertTriangle size={11} className={isLight ? 'text-red-600' : 'text-[#ff1744]'} />}
              </span>
              <span className={`font-mono-numbers text-[12px] sm:text-xs font-bold flex items-center ${
                isHighStress 
                  ? (isLight ? 'text-red-700' : 'text-[#ff1744]') 
                  : (isLight ? 'text-slate-900' : 'text-white')
              }`}>
                {state.stress}%
                {renderDelta(stressDelta)}
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-[#1e2330]'}`}>
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isHighStress 
                    ? (isLight ? 'bg-red-600' : 'bg-[#ff1744]') 
                    : state.stress > 40 
                      ? 'bg-amber-500' 
                      : (isLight ? 'bg-slate-400' : 'bg-slate-500')
                }`}
                style={{ width: `${Math.max(0, Math.min(100, state.stress))}%` }}
              />
            </div>
          </div>

          {/* Joy / Happiness Meter */}
          <div>
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-semibold mb-0.5">
              <span className={`flex items-center gap-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <span>😄</span>
                <span>{language === 'zh' ? '快樂' : 'Joy'}</span>
              </span>
              <span className={`font-mono-numbers text-[12px] sm:text-xs font-bold flex items-center ${
                isLight ? 'text-sky-700' : 'text-cyan-400'
              }`}>
                {state.happiness}%
                {renderDelta(joyDelta)}
              </span>
            </div>
            <div className={`w-full h-1.5 rounded-full overflow-hidden ${isLight ? 'bg-slate-200' : 'bg-[#1e2330]'}`}>
              <div
                className={`h-full transition-all duration-300 rounded-full ${isLight ? 'bg-sky-500' : 'bg-cyan-400'}`}
                style={{ width: `${Math.max(0, Math.min(100, state.happiness))}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Status Details */}
        <div className="flex flex-col justify-between space-y-1.5 min-w-0">
          {/* Wealth */}
          <div className="flex items-center text-[12px] sm:text-[13px] leading-tight min-w-0">
            <span className={`shrink-0 font-medium mr-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh' ? '💵' : '💵'}
            </span>
            <span
              className={`font-mono-numbers font-bold truncate tracking-tight text-[13px] sm:text-[14px] flex items-center gap-1 ${
                state.money < 0 
                  ? (isLight ? 'text-red-600' : 'text-[#ff1744]') 
                  : (isLight ? 'text-emerald-700' : 'text-[#00e676]')
              }`}
              title={formattedMoney}
            >
              {formattedMoney}
              {renderDelta(moneyDelta)}
            </span>
          </div>

          {/* Career */}
          <div className="flex items-baseline text-[12px] sm:text-[13px] leading-tight min-w-0">
            <span className={`shrink-0 font-medium mr-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh' ? '💼' : '💼'}
            </span>
            <span className="font-bold truncate min-w-0 flex-1" title={`${state.job[language]} ${salaryBadge}`}>
              <span className={isLight ? 'text-[#0f172a]' : 'text-white'}>{state.job[language]}</span>
              {salaryBadge && (
                <span className={`ml-1 font-mono-numbers text-[11px] font-bold ${
                  isLight ? 'text-emerald-700' : 'text-[#00e676]'
                }`}>
                  {salaryBadge}
                </span>
              )}
            </span>
          </div>

          {/* Relationship */}
          <div className="flex items-baseline text-[12px] sm:text-[13px] leading-tight min-w-0">
            <span className={`shrink-0 font-medium mr-1.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {language === 'zh' ? '💍' : '💍'}
            </span>
            <span className={`font-bold truncate ${isLight ? 'text-[#0f172a]' : 'text-white'}`} title={state.relationship[language]}>
              {state.relationship[language]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
