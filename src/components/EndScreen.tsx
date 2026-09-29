import React, { useState } from 'react';
import { GameState, Language } from '../types/game';
import { generateEpitaph } from '../utils/epitaph';
import { RotateCcw, Tv, Share2, Check, Sparkles, Skull, Globe, Home } from 'lucide-react';
import { sounds } from '../utils/audio';

interface EndScreenProps {
  state: GameState;
  language: Language;
  onToggleLanguage: () => void;
  onRestart: () => void;
  onOpenAdRevive: () => void;
  canRewindFatal?: boolean;
  onRewindFatalChoice?: () => void;
  onOpenHistory: () => void;
  onReturnHome?: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  state,
  language,
  onToggleLanguage,
  onRestart,
  onOpenAdRevive,
  canRewindFatal = false,
  onRewindFatalChoice,
  onOpenHistory,
  onReturnHome
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const epitaph = generateEpitaph(state);
  const isCenturyVictory = state.age >= 100;

  const t = {
    victoryBanner: language === 'zh' ? '🎉 世紀存活者' : '🎉 CENTURY SURVIVOR',
    deathBanner: language === 'zh' ? '💀 生命終結' : '💀 LIFE TERMINATED',
    decisionsCount: language === 'zh' ? '做出決定數' : 'DECISIONS MADE',
    retiredAt: language === 'zh' ? `🎉 於 ${state.age} 歲圓滿退休` : `🎉 RETIRED AT AGE ${state.age}`,
    diedAt: language === 'zh' ? `💀 於 ${state.age} 歲離世` : `💀 DIED AT AGE ${state.age}`,
    officialTitle: language === 'zh' ? '官方人生稱號 / 墓誌銘' : 'OFFICIAL LIFE EPITAPH',
    causeOfEnd: language === 'zh' ? '終結原因：' : 'Cause of End:',
    finalWealth: language === 'zh' ? '最終財富' : 'Final Wealth',
    finalJoy: language === 'zh' ? '最終快樂' : 'Final Joy',
    finalJob: language === 'zh' ? '最終職業' : 'Final Career',
    traitsDiscovered: language === 'zh' ? '探索特質' : 'Traits Found',
    acquiredTraits: language === 'zh' ? '已獲特質標籤：' : 'Acquired Traits:',
    reviveBtn: language === 'zh' ? '📺 觀看廣告 (復活恢復50%HP)' : '📺 WATCH AD (REVIVE WITH 50% HP)',
    playAgainBtn: language === 'zh' ? '🔄 再活一次' : '🔄 PLAY AGAIN',
    timelineBtn: language === 'zh' ? '回顧整個人生時間軸' : 'Review Full Timeline',
    shareBtn: language === 'zh' ? '分享人生總結' : 'Share Epitaph',
    copiedText: language === 'zh' ? '已複製到剪貼簿！' : 'Copied to Clipboard!',
  };

  const handleShare = () => {
    sounds.playClick();
    const shareText = `💀 LIFE GLITCH SUMMARY:\nTitle / 稱號: "${epitaph.title[language]}"\nAge / 年齡: ${state.age}\nFinal Wealth / 財富: $${state.money.toLocaleString()}\nCareer / 職業: ${state.job[language]}\nCause / 原因: ${state.deathReason ? state.deathReason[language] : ''}\nPlay LIFE GLITCH on CrazyGames!`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <div id="screen-end" className="min-h-screen flex flex-col justify-between p-4 sm:p-6 max-w-lg mx-auto w-full select-none animate-fade-in">
      <header className="flex items-center justify-between py-1 mb-2 border-b border-[#2d3748]">
        <span className="text-sm font-mono-numbers text-slate-300">
          LIFE REPORT · {state.age} {language === 'zh' ? '歲' : 'YRS'}
        </span>
        <div className="flex items-center gap-1.5">
          {onReturnHome && (
            <button
              onClick={() => {
                sounds.playClick();
                onReturnHome();
              }}
              className="flex items-center gap-1 text-xs font-mono-numbers text-slate-300 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border border-[#2d3748] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
              title={language === 'zh' ? '返回主頁 / Home' : 'Return Home'}
            >
              <Home size={13} className="text-amber-400" />
              <span>{language === 'zh' ? '主頁' : 'Home'}</span>
            </button>
          )}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 text-xs font-mono-numbers font-bold text-[#00e676] bg-[#1a1f2c] border border-[#2d3748] px-2.5 py-1 rounded-md transition-colors cursor-pointer"
          >
            <Globe size={13} />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
          </button>
        </div>
      </header>

      <div>
        <div className="w-full h-36 sm:h-44 rounded-2xl overflow-hidden border border-[#2d3748] relative mb-3 bg-[#1a1f2c] flex items-center justify-center shadow-lg">
          {!imageError ? (
            <img
              src="./assets/life_glitch_game_over.jpg"
              alt="Life Glitch Game Over"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover opacity-75"
            />
          ) : (
            <div className="p-4 text-center">
              <Skull size={32} className="text-[#ff1744] mx-auto mb-1 animate-pulse" />
              <div className="font-display font-bold text-white text-base">
                {language === 'zh' ? '生命終結協議' : 'TERMINATION EXCEPTION'}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12151c] via-[#12151c]/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[13px] font-mono-numbers font-semibold">
            <span className={`px-2.5 py-1 rounded border font-bold tracking-normal ${
              isCenturyVictory
                ? 'bg-emerald-500/20 text-[#00e676] border-emerald-500/40'
                : 'bg-rose-500/20 text-[#ff1744] border-rose-500/40'
            }`}>
              {isCenturyVictory ? t.victoryBanner : t.deathBanner}
            </span>
            <span className="bg-[#12151c]/80 backdrop-blur-md px-2.5 py-1 rounded text-slate-300 border border-[#2d3748]">
              {t.decisionsCount}: {state.decisionsCount}
            </span>
          </div>
        </div>

        <div className="text-center mb-3">
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-normal">
            {isCenturyVictory ? (
              <span className="text-[#00e676]">{t.retiredAt}</span>
            ) : (
              <span className="text-[#ff1744]">{t.diedAt}</span>
            )}
          </h1>
        </div>

        <div className="bg-[#1a1f2c] border-2 border-[#2d3748] rounded-xl p-4 sm:p-5 mb-4 text-center shadow-xl relative overflow-hidden">
          <div className="text-[13px] font-semibold text-[#00f0ff] uppercase tracking-normal mb-1">
            {t.officialTitle}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#00e676] mb-1.5 tracking-normal">
            "{epitaph.title[language]}"
          </h2>
          <p className="text-[15px] sm:text-base text-slate-200 font-medium italic mb-3 leading-relaxed">
            "{epitaph.tagline[language]}"
          </p>
          <div className="bg-[#12151c] p-3.5 rounded-lg border border-[#2d3748] text-[15px] sm:text-base text-slate-100 font-medium leading-relaxed text-left">
            <strong className="text-[#ff1744] block mb-1 font-semibold">{t.causeOfEnd}</strong>
            {state.deathReason ? state.deathReason[language] : ''}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
          <div className="bg-[#1a1f2c] border border-[#2d3748] p-2.5 rounded-lg text-center">
            <span className="text-[12px] sm:text-[13px] text-slate-300 block font-medium">{t.finalWealth}</span>
            <span className={`text-sm sm:text-base font-mono-numbers font-bold ${
              state.money >= 0 ? 'text-[#00e676]' : 'text-[#ff1744]'
            }`}>
              ${state.money.toLocaleString()}
            </span>
          </div>

          <div className="bg-[#1a1f2c] border border-[#2d3748] p-2.5 rounded-lg text-center">
            <span className="text-[12px] sm:text-[13px] text-slate-300 block font-medium">{t.finalJoy}</span>
            <span className="text-sm sm:text-base font-mono-numbers font-bold text-cyan-400">
              {state.happiness}%
            </span>
          </div>

          <div className="bg-[#1a1f2c] border border-[#2d3748] p-2.5 rounded-lg text-center">
            <span className="text-[12px] sm:text-[13px] text-slate-300 block font-medium">{t.finalJob}</span>
            <span className="text-sm sm:text-base font-semibold text-slate-100 truncate block" title={state.job[language]}>
              {state.job[language]}
            </span>
          </div>

          <div className="bg-[#1a1f2c] border border-[#2d3748] p-2.5 rounded-lg text-center">
            <span className="text-[12px] sm:text-[13px] text-slate-300 block font-medium">{t.traitsDiscovered}</span>
            <span className="text-sm sm:text-base font-mono-numbers font-bold text-amber-400">
              {state.flags.length}
            </span>
          </div>
        </div>

        {state.flags.length > 0 && (
          <div className="mb-3 bg-[#161a24] border border-[#2d3748] p-2.5 rounded-lg">
            <span className="text-[13px] font-semibold text-slate-300 block mb-1.5 tracking-normal">
              {t.acquiredTraits}
            </span>
            <div className="flex flex-wrap gap-1">
              {state.flags.map((f, i) => (
                <span key={i} className="text-[12px] font-medium bg-[#1a1f2c] border border-[#2d3748] px-2 py-1 rounded text-slate-200 tracking-normal">
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2.5 pt-1">
        {!state.hasRevived && !isCenturyVictory && (
          <button
            onClick={() => {
              sounds.playClick();
              onOpenAdRevive();
            }}
            className="w-full py-3 px-4 bg-[#1a1f2c] hover:bg-[#252c3d] border-2 border-[#00f0ff] hover:border-[#00e676] text-white font-display font-bold text-base sm:text-lg tracking-normal rounded-xl transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Tv size={18} className="text-[#00f0ff]" />
            <span>{t.reviveBtn}</span>
          </button>
        )}

        {canRewindFatal && !isCenturyVictory && onRewindFatalChoice && (
          <button
            onClick={() => {
              sounds.playClick();
              onRewindFatalChoice();
            }}
            className="w-full py-3 px-4 bg-gradient-to-r from-[#1c2333] via-[#263147] to-[#1c2333] hover:from-[#25304a] hover:to-[#25304a] border-2 border-amber-400/70 hover:border-amber-300 text-amber-300 hover:text-amber-100 font-display font-bold text-base sm:text-lg tracking-normal rounded-xl transition-all shadow-[0_0_18px_rgba(251,191,36,0.18)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw size={18} className="text-amber-400" />
            <span>{language === 'zh' ? '⏪ 後悔致命抉擇？(看廣告倒流時光)' : '⏪ REWIND FATAL CHOICE (WATCH AD)'}</span>
          </button>
        )}

        <button
          onClick={() => {
            sounds.playPositive();
            onRestart();
          }}
          className="w-full py-3.5 px-4 bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] font-display font-black text-lg sm:text-xl tracking-normal rounded-xl transition-all shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <RotateCcw size={20} />
          <span>{t.playAgainBtn}</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenHistory}
            className="py-2.5 px-3 bg-[#161a24] hover:bg-[#1e2330] border border-[#2d3748] text-slate-200 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles size={14} className="text-[#00f0ff]" />
            <span>{t.timelineBtn}</span>
          </button>

          <button
            onClick={handleShare}
            className="py-2.5 px-3 bg-[#161a24] hover:bg-[#1e2330] border border-[#2d3748] text-slate-200 text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check size={14} className="text-[#00e676]" />
                <span className="text-[#00e676]">{t.copiedText}</span>
              </>
            ) : (
              <>
                <Share2 size={14} />
                <span>{t.shareBtn}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
