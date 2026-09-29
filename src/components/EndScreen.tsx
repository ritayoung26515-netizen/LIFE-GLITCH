import React, { useState } from 'react';
import { GameState, Language } from '../types/game';
import { isChinese, loc, languageButtonLabel } from '../utils/i18n';
import { generateEpitaph } from '../utils/epitaph';
import { Home, Globe, Share2, RotateCcw, Play, BookOpen } from 'lucide-react';
import { sounds } from '../utils/audio';

interface EndScreenProps {
  state: GameState;
  language: Language;
  onToggleLanguage: () => void;
  onPlayAgain: () => void;
  onRevive: () => void;
  onOpenTimeline: () => void;
  onReturnHome: () => void;
  canRegret: boolean;
  onRegret: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  state,
  language,
  onToggleLanguage,
  onPlayAgain,
  onRevive,
  onOpenTimeline,
  onReturnHome,
  canRegret,
  onRegret
}) => {
  const [copied, setCopied] = useState(false);
  const epitaph = generateEpitaph(state);
  const isVictory = state.age >= 100;

  const t = {
    victoryBanner: isChinese(language) ? '🎉 世紀存活者' : '🎉 CENTURY SURVIVOR',
    deathBanner: isChinese(language) ? '💀 生命終結' : '💀 LIFE TERMINATED',
    decisionsCount: isChinese(language) ? '做出決定數' : 'DECISIONS MADE',
    retiredAt: isChinese(language) ? `🎉 於 ${state.age} 歲圓滿退休` : `🎉 RETIRED AT AGE ${state.age}`,
    diedAt: isChinese(language) ? `💀 於 ${state.age} 歲離世` : `💀 DIED AT AGE ${state.age}`,
    officialTitle: isChinese(language) ? '官方人生稱號 / 墓誌銘' : 'OFFICIAL LIFE EPITAPH',
    causeOfEnd: isChinese(language) ? '終結原因：' : 'Cause of End:',
    finalWealth: isChinese(language) ? '最終財富' : 'Final Wealth',
    finalJoy: isChinese(language) ? '最終快樂' : 'Final Joy',
    finalJob: isChinese(language) ? '最終職業' : 'Final Career',
    traitsDiscovered: isChinese(language) ? '探索特質' : 'Traits Found',
    acquiredTraits: isChinese(language) ? '已獲特質標籤：' : 'Acquired Traits:',
    reviveBtn: isChinese(language) ? '📺 觀看廣告 (復活恢復50%HP)' : '📺 WATCH AD (REVIVE WITH 50% HP)',
    playAgainBtn: isChinese(language) ? '🔄 再活一次' : '🔄 PLAY AGAIN',
    timelineBtn: isChinese(language) ? '回顧整個人生時間軸' : 'Review Full Timeline',
    shareBtn: isChinese(language) ? '分享人生總結' : 'Share Epitaph',
    copiedText: isChinese(language) ? '已複製到剪貼簿！' : 'Copied to Clipboard!',
  };

  const handleShare = async () => {
    const text = `LIFE GLITCH Report\nAge: ${state.age}\nTitle: "${loc(epitaph.title, language)}"\nCareer: ${loc(state.job, language)}\nCause: ${state.deathReason ? loc(state.deathReason, language) : ''}\nWealth: $${state.money.toLocaleString()}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-[100dvh] max-w-lg mx-auto w-full p-4 flex flex-col gap-3 overflow-y-auto">
      <header className="flex items-center justify-between border-b border-[#2d3748] pb-2">
        <span className="text-xs font-mono-numbers text-slate-400">
          LIFE REPORT · {state.age} {isChinese(language) ? '歲' : 'YRS'}
        </span>
        <div className="flex items-center gap-1.5">
          <button type="button" onClick={onReturnHome} className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] px-2 py-1 rounded cursor-pointer">
            <Home size={13} />
            <span>{isChinese(language) ? '主頁' : 'Home'}</span>
          </button>
          <button type="button" onClick={onToggleLanguage} className="flex items-center gap-1 text-xs font-bold text-[#00e676] bg-[#1a1f2c] border border-[#2d3748] px-2 py-1 rounded cursor-pointer">
            <Globe size={13} />
            <span>{languageButtonLabel(language)}</span>
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-[#2d3748] bg-[#161a24] p-4 text-center">
        <div className="text-xs font-mono-numbers text-slate-500 mb-2">Life Glitch Game Over</div>
        <div className="flex justify-center gap-2 mb-3 text-[10px] font-mono-numbers">
          <span className="px-2 py-0.5 rounded border border-rose-800/50 text-rose-400 bg-rose-950/30">{t.deathBanner}</span>
          <span className="px-2 py-0.5 rounded border border-[#2d3748] text-slate-400">{t.decisionsCount}: {state.decisionsCount}</span>
        </div>
        <div className="text-xl font-display font-bold text-rose-400 mb-2">{isVictory ? t.retiredAt : t.diedAt}</div>
        <div className="text-[10px] text-slate-500 mb-1">{t.officialTitle}</div>
        <div className="text-lg font-bold text-[#00e676] mb-1">"{loc(epitaph.title, language)}"</div>
        <div className="text-sm text-slate-400 italic mb-3">"{loc(epitaph.tagline, language)}"</div>
        <div className="text-xs text-left text-slate-400 bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2.5">
          <strong className="text-rose-400">{t.causeOfEnd}</strong>{' '}
          {state.deathReason ? loc(state.deathReason, language) : ''}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#161a24] border border-[#2d3748] rounded-xl p-3 text-center">
          <div className="text-[10px] text-slate-500">{t.finalWealth}</div>
          <div className="text-sm font-mono-numbers font-bold text-[#00e676]">${state.money.toLocaleString()}</div>
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-xl p-3 text-center">
          <div className="text-[10px] text-slate-500">{t.finalJoy}</div>
          <div className="text-sm font-mono-numbers font-bold text-white">{state.happiness}%</div>
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-xl p-3 text-center">
          <div className="text-[10px] text-slate-500">{t.finalJob}</div>
          <div className="text-xs font-semibold text-slate-200 truncate" title={loc(state.job, language)}>{loc(state.job, language)}</div>
        </div>
        <div className="bg-[#161a24] border border-[#2d3748] rounded-xl p-3 text-center">
          <div className="text-[10px] text-slate-500">{t.traitsDiscovered}</div>
          <div className="text-sm font-mono-numbers font-bold text-[#00f0ff]">{state.flags.length}</div>
        </div>
      </div>

      {state.flags.length > 0 && (
        <div className="text-[10px] text-slate-400">
          <div className="mb-1">{t.acquiredTraits}</div>
          <div className="flex flex-wrap gap-1">
            {state.flags.map(f => (
              <span key={f} className="px-1.5 py-0.5 rounded bg-[#1a1f2c] border border-[#2d3748] text-slate-300">{f}</span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-auto pt-2">
        {!state.hasRevived && !isVictory && (
          <button type="button" onClick={() => { sounds.playClick(); onRevive(); }} className="w-full py-3 rounded-xl bg-[#00e676] text-[#0f1117] font-bold text-sm cursor-pointer">{t.reviveBtn}</button>
        )}
        {canRegret && (
          <button type="button" onClick={() => { sounds.playClick(); onRegret(); }} className="w-full py-2.5 rounded-xl border border-amber-700/50 text-amber-300 bg-amber-950/30 text-sm flex items-center justify-center gap-1.5 cursor-pointer">
            <RotateCcw size={14} />
            <span>{isChinese(language) ? '⏪ 後悔致命抉擇？(看廣告倒流時光)' : '⏪ REWIND FATAL CHOICE (WATCH AD)'}</span>
          </button>
        )}
        <button type="button" onClick={() => { sounds.playClick(); onOpenTimeline(); }} className="w-full py-2.5 rounded-xl border border-[#2d3748] text-slate-300 text-sm flex items-center justify-center gap-1.5 cursor-pointer">
          <BookOpen size={14} />{t.timelineBtn}
        </button>
        <button type="button" onClick={() => { sounds.playPositive(); onPlayAgain(); }} className="w-full py-3 rounded-xl border border-[#00e676]/40 text-[#00e676] font-bold text-sm flex items-center justify-center gap-1.5 cursor-pointer">
          <Play size={14} />{t.playAgainBtn}
        </button>
        <button type="button" onClick={handleShare} className="w-full py-2 rounded-xl text-slate-500 text-xs flex items-center justify-center gap-1 cursor-pointer">
          <Share2 size={12} />{copied ? t.copiedText : t.shareBtn}
        </button>
      </div>
    </div>
  );
};
