import React from 'react';
import { GameState, Language } from '../types/game';
import { isChinese, languageButtonLabel, loc } from '../utils/i18n';
import { BookOpen, Volume2, VolumeX, Home, Flag, Globe } from 'lucide-react';
import { sounds } from '../utils/audio';

interface StatusHUDProps {
  state: GameState;
  language: Language;
  onToggleLanguage: () => void;
  onOpenLog: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onToggleFlagsDrawer: () => void;
  onReturnHome: () => void;
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

  const bar = (value: number, dangerHigh = false) => {
    const danger = dangerHigh ? value >= 80 : value <= 25;
    const color = dangerHigh
      ? (value >= 80 ? 'bg-rose-500' : value >= 50 ? 'bg-amber-400' : 'bg-emerald-400')
      : (value <= 25 ? 'bg-rose-500' : value <= 50 ? 'bg-amber-400' : 'bg-emerald-400');
    return (
      <div className="h-1.5 w-full rounded-full bg-[#0f1117] overflow-hidden">
        <div className={`h-full ${color} transition-all duration-300`} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-20 bg-[#0f1117]/95 backdrop-blur-md border-b border-[#2d3748] px-3 pt-2 pb-2.5">
      <div className="flex items-center justify-between mb-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono-numbers font-bold text-white shrink-0">
            {isChinese(language) ? `${state.age} 歲` : `Age ${state.age}`}
          </span>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onToggleFlagsDrawer();
            }}
            className="flex items-center gap-1 text-[10px] font-mono-numbers text-slate-400 hover:text-[#00f0ff] bg-[#1a1f2c] border border-[#2d3748] px-1.5 py-0.5 rounded cursor-pointer"
          >
            <Flag size={11} />
            <span>{state.flags.length} {t.traits}</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onReturnHome();
            }}
            className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] px-1.5 py-1 rounded cursor-pointer"
            title={isChinese(language) ? '返回主頁 / Home' : 'Return to Home'}
          >
            <Home size={13} />
            <span className="hidden sm:inline font-semibold">{isChinese(language) ? '主頁' : 'Home'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 text-[10px] font-mono-numbers font-bold text-[#00e676] hover:text-white bg-[#1a1f2c] border border-[#2d3748] px-1.5 py-1 rounded cursor-pointer"
            title="EN / 繁 / 簡"
          >
            <Globe size={12} />
            <span>{languageButtonLabel(language)}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onOpenLog();
            }}
            className="p-1 text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] rounded cursor-pointer"
            title={t.log}
          >
            <BookOpen size={14} />
          </button>

          <button
            type="button"
            onClick={onToggleMute}
            className="p-1 text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] rounded cursor-pointer"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-1.5">
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1.5">
          <div className="text-[9px] text-slate-500 font-mono-numbers">{t.money}</div>
          <div className="text-xs sm:text-sm font-mono-numbers font-bold text-[#00e676] truncate">{formattedMoney}</div>
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1.5">
          <div className="text-[9px] text-slate-500 font-mono-numbers flex justify-between">
            <span>{t.health}</span><span>{state.health}%</span>
          </div>
          {bar(state.health)}
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1.5">
          <div className="text-[9px] text-slate-500 font-mono-numbers flex justify-between">
            <span>{t.happiness}</span><span>{state.happiness}%</span>
          </div>
          {bar(state.happiness)}
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1.5">
          <div className="text-[9px] text-slate-500 font-mono-numbers flex justify-between">
            <span>{t.stress}</span><span>{state.stress}%</span>
          </div>
          {bar(state.stress, true)}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1">
          <div className="text-[9px] text-slate-500">{t.fame}</div>
          <div className="text-xs font-mono-numbers text-slate-200">{state.fame}%</div>
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1 min-w-0">
          <div className="text-[9px] text-slate-500">{t.job}</div>
          <div className="text-xs sm:text-[13px] font-semibold text-[#e2e8f0] truncate mt-0.5" title={loc(state.job, language)}>
            {loc(state.job, language)}
          </div>
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-lg px-2 py-1 min-w-0">
          <div className="text-[9px] text-slate-500">{t.relationship}</div>
          <div className="text-xs sm:text-[13px] font-semibold text-[#e2e8f0] truncate mt-0.5" title={loc(state.relationship, language)}>
            {loc(state.relationship, language)}
          </div>
        </div>
      </div>
    </div>
  );
};
