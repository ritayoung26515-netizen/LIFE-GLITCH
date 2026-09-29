import React from 'react';
import { GameState, Language } from '../types/game';
import { Volume2, VolumeX, BookOpen, AlertTriangle, Globe, Home } from 'lucide-react';
import { sounds } from '../utils/audio';
import { isChinese, loc, languageButtonLabel } from '../utils/i18n';

interface StatusHUDProps {
  state: GameState;
  language: Language;
  onToggleLanguage: () => void;
  onOpenLog: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleFlagsDrawer?: () => void;
  onReturnHome?: () => void;
}

export const StatusHUD: React.FC<StatusHUDProps> = ({
  state,
  language,
  onToggleLanguage,
  onOpenLog,
  isMuted,
  onToggleMute,
  onToggleFlagsDrawer,
  onReturnHome
}) => {
  const isHighStress = state.stress >= 70;
  const isCriticalHealth = state.health <= 25;

  const formattedMoney = new Intl.NumberFormat(isChinese(language) ? 'zh-TW' : 'en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(state.money);

  const t = {
    age: isChinese(language) ? '歲數' : 'AGE',
    money: isChinese(language) ? '💵 資產' : '💵 Cash',
    health: isChinese(language) ? '❤️ 健康' : '❤️ Health',
    happiness: isChinese(language) ? '😄 快樂' : '😄 Joy',
    stress: isChinese(language) ? '⚡ 壓力' : '⚡ Stress',
    fame: isChinese(language) ? '⭐ 聲望' : '⭐ Fame',
    job: isChinese(language) ? '💼 職業' : '💼 Job',
    relationship: isChinese(language) ? '💍 關係' : '💍 Status',
    log: isChinese(language) ? '履歷' : 'Log',
    traits: isChinese(language) ? '特質' : 'Traits',
  };

  return (
    <header className="sticky top-0 z-20 bg-[#12151c]/95 backdrop-blur-md border-b border-[#2d3748] px-3 py-2.5 shadow-lg select-none">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-[#1a1f2c] border border-[#2d3748] px-3 py-1 rounded-md flex items-center">
            <span className="text-lg sm:text-xl font-bold text-white tracking-tight">
              {isChinese(language) ? `${state.age} 歲` : `Age ${state.age}`}
            </span>
          </div>

          {state.flags.length > 0 && onToggleFlagsDrawer && (
            <button
              onClick={() => {
                sounds.playClick();
                onToggleFlagsDrawer();
              }}
              title="Discovered flags"
              className="text-xs bg-[#1a1f2c] hover:bg-[#252b3d] text-[#00f0ff] border border-[#2d3748] px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer font-semibold tracking-normal"
            >
              <span>🚩</span>
              <span>{state.flags.length} {t.traits}</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onReturnHome && (
            <button
              onClick={() => {
                sounds.playClick();
                onReturnHome();
              }}
              className="flex items-center gap-1 text-xs font-semibold text-slate-200 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] hover:border-amber-400/60 px-2 sm:px-2.5 py-1.5 rounded-md transition-colors cursor-pointer tracking-normal"
              title={isChinese(language) ? '返回主頁 / Home' : 'Return to Home'}
              aria-label="Home"
            >
              <Home size={14} className="text-amber-400" />
              <span className="hidden sm:inline font-semibold">{isChinese(language) ? '主頁' : 'Home'}</span>
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 text-xs font-semibold text-[#00e676] hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] hover:border-[#00e676]/60 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer tracking-normal"
            title="Toggle Language EN / 繁 / 簡"
          >
            <Globe size={14} />
            <span>{languageButtonLabel(language)}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenLog();
            }}
            className="flex items-center gap-1 text-xs font-semibold text-slate-200 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            title="View Life Log"
          >
            <BookOpen size={14} />
            <span className="hidden sm:inline">{t.log}</span>
          </button>

          <button
            onClick={onToggleMute}
            className="p-1.5 text-slate-300 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] rounded-md transition-colors cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Audio"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        <div className="bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2 flex flex-col justify-between">
          <div className="text-[11px] sm:text-xs text-slate-300 font-medium">{t.money}</div>
          <div
            className={`font-mono-numbers text-xs sm:text-sm font-bold truncate mt-1 ${
              state.money < 0 ? 'text-[#ff1744]' : 'text-[#00e676]'
            }`}
            title={formattedMoney}
          >
            {formattedMoney}
          </div>
        </div>

        <div className={`bg-[#1a1f2c] border rounded-lg p-2 flex flex-col justify-between transition-colors ${
          isCriticalHealth ? 'border-[#ff1744] bg-[#ff1744]/15' : 'border-[#2d3748]'
        }`}>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-0.5">
              {t.health}
              {isCriticalHealth && <AlertTriangle size={11} className="text-[#ff1744]" />}
            </span>
            <span className="font-mono-numbers text-xs sm:text-[13px] font-bold text-slate-100">{state.health}%</span>
          </div>
          <div className="w-full bg-[#12151c] h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className={`h-full transition-all duration-300 ${
                state.health <= 25 ? 'bg-[#ff1744]' : state.health <= 50 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, state.health))}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300 font-medium">
            <span>{t.happiness}</span>
            <span className="font-mono-numbers text-xs sm:text-[13px] font-bold text-cyan-300">{state.happiness}%</span>
          </div>
          <div className="w-full bg-[#12151c] h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${Math.max(0, Math.min(100, state.happiness))}%` }}
            />
          </div>
        </div>

        <div className={`bg-[#1a1f2c] border rounded-lg p-2 flex flex-col justify-between transition-colors ${
          isHighStress ? 'border-[#ff1744] bg-[#ff1744]/20 danger-pulse' : 'border-[#2d3748]'
        }`}>
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300 font-medium">
            <span className={isHighStress ? 'text-[#ff1744] font-bold' : ''}>{t.stress}</span>
            <span className={`font-mono-numbers text-xs sm:text-[13px] font-bold ${isHighStress ? 'text-[#ff1744]' : 'text-slate-100'}`}>
              {state.stress}%
            </span>
          </div>
          <div className="w-full bg-[#12151c] h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className={`h-full transition-all duration-300 ${
                isHighStress ? 'bg-[#ff1744]' : state.stress > 40 ? 'bg-amber-400' : 'bg-slate-400'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, state.stress))}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-300 font-medium">
            <span>{t.fame}</span>
            <span className="font-mono-numbers text-xs sm:text-[13px] font-bold text-amber-300">{state.fame}%</span>
          </div>
          <div className="w-full bg-[#12151c] h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-amber-400 transition-all duration-300"
              style={{ width: `${Math.max(0, Math.min(100, state.fame))}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2 flex flex-col justify-between col-span-1">
          <div className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">{t.job}</div>
          <div className="text-xs sm:text-[13px] font-semibold text-[#e2e8f0] truncate mt-1" title={loc(state.job, language)}>
            {loc(state.job, language)}
          </div>
        </div>

        <div className="bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2 flex flex-col justify-between col-span-2">
          <div className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">{t.relationship}</div>
          <div className="text-xs sm:text-[13px] font-semibold text-[#e2e8f0] truncate mt-1" title={loc(state.relationship, language)}>
            {loc(state.relationship, language)}
          </div>
        </div>
      </div>
    </header>
  );
};
