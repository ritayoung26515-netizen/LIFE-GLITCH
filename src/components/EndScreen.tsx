import React, { useState } from 'react';
import { GameState, Language, Theme } from '../types/game';
import { generateEpitaph } from '../utils/epitaph';
import { RotateCcw, Tv, Share2, Check, Sparkles, Globe, Home, Sun, Moon, Trophy } from 'lucide-react';
import { sounds } from '../utils/audio';
import { getMedalById, ALL_MEDALS } from '../utils/traits';

interface EndScreenProps {
  state: GameState;
  language: Language;
  onToggleLanguage: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  onRestart: () => void;
  onOpenAdRevive: () => void;
  canRewindFatal?: boolean;
  onRewindFatalChoice?: () => void;
  onOpenHistory: () => void;
  onReturnHome?: () => void;
  onOpenTrophyRoom?: () => void;
  totalUnlockedCount?: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({
  state,
  language,
  onToggleLanguage,
  theme,
  onToggleTheme,
  onRestart,
  onOpenAdRevive,
  canRewindFatal = false,
  onRewindFatalChoice,
  onOpenHistory,
  onReturnHome,
  onOpenTrophyRoom,
  totalUnlockedCount
}) => {
  const [copied, setCopied] = useState(false);
  const isLight = theme === 'light';

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
    <div id="screen-end" className="flex-1 flex flex-col justify-between p-3.5 sm:p-5 max-w-lg mx-auto w-full select-none animate-fade-in">
      {/* Top Header */}
      <header className={`flex items-center justify-between py-1.5 mb-2.5 border-b ${
        isLight ? 'border-slate-300' : 'border-[#2d3748]'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-xs sm:text-sm font-mono-numbers font-bold ${isLight ? 'text-[#0f172a]' : 'text-slate-200'}`}>
            LIFE SUMMARY · {state.age} {language === 'zh' ? '歲' : 'YRS'}
          </span>
          <span className={`text-[11px] font-mono-numbers font-semibold px-2 py-0.5 rounded border ${
            isCenturyVictory
              ? (isLight ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-[#00e676] border-emerald-500/40')
              : (isLight ? 'bg-red-50 text-red-800 border-red-300' : 'bg-rose-500/20 text-[#ff1744] border-rose-500/40')
          }`}>
            {isCenturyVictory ? t.victoryBanner : t.deathBanner}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReturnHome && (
            <button
              onClick={() => {
                sounds.playClick();
                onReturnHome();
              }}
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer border ${
                isLight
                  ? 'text-slate-800 bg-white hover:bg-slate-100 border-slate-300 shadow-2xs'
                  : 'text-slate-300 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
              }`}
              title={language === 'zh' ? '返回主頁 / Home' : 'Return Home'}
            >
              <Home size={13} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
              <span>{language === 'zh' ? '主頁' : 'Home'}</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleTheme();
            }}
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-slate-800 bg-white hover:bg-slate-100 border-slate-300 shadow-2xs'
                : 'text-amber-300 bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            title={isLight ? "Switch to Dark Theme / 切換深色模式" : "Switch to Light Theme / 切換淺色模式"}
          >
            {isLight ? <Moon size={13} className="text-slate-600" /> : <Sun size={13} className="text-amber-400" />}
            <span>{isLight ? '🌙' : '☀️'}</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onToggleLanguage();
            }}
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer border ${
              isLight
                ? 'text-emerald-700 bg-white hover:bg-slate-100 border-slate-300 shadow-2xs'
                : 'text-[#00e676] bg-[#1a1f2c] border-[#2d3748]'
            }`}
          >
            <Globe size={13} />
            <span>{language === 'en' ? '中文' : 'EN'}</span>
          </button>
        </div>
      </header>

      {/* Main Body: Compact Summary & Epitaph */}
      <div>
        {/* Compact Epitaph & Cause of Death */}
        <div className={`rounded-xl p-3 sm:p-4 mb-2.5 border transition-all ${
          isLight
            ? 'bg-white border-slate-300 shadow-xs'
            : 'bg-[#161a24] border-[#2d3748] shadow-md'
        }`}>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${
              isLight ? 'text-sky-700' : 'text-[#00f0ff]'
            }`}>
              {t.officialTitle}
            </span>
            <span className={`text-[11px] font-mono-numbers font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {t.decisionsCount}: <strong>{state.decisionsCount}</strong>
            </span>
          </div>

          <h1 className={`text-xl sm:text-2xl font-black tracking-normal leading-tight mb-0.5 ${
            isLight ? 'text-[#0f172a]' : 'text-white'
          }`}>
            "{epitaph.title[language]}"
          </h1>
          <p className={`text-[13px] sm:text-sm font-medium italic mb-2 leading-snug ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            "{epitaph.tagline[language]}"
          </p>

          {/* Compact Cause of Death banner */}
          <div className={`py-1.5 px-2.5 rounded-lg border text-xs sm:text-[13px] font-semibold leading-normal ${
            isLight
              ? 'bg-red-50/90 border-red-200 text-[#0f172a]'
              : 'bg-[#1a1520] border-rose-900/60 text-slate-100'
          }`}>
            <span className={`mr-1 font-bold ${isLight ? 'text-red-700' : 'text-rose-400'}`}>
              {isCenturyVictory ? '🎉 退休結局：' : '💀 終結原因：'}
            </span>
            <span>{state.deathReason ? state.deathReason[language] : (isCenturyVictory ? (language === 'zh' ? '享受百歲長壽與圓滿人生' : 'Lived a full century') : '')}</span>
          </div>
        </div>

        {/* Primary Action Buttons (Prominently Placed Above the Fold!) */}
        <div className="space-y-2 mb-2.5">
          {/* Play Again (Main Hero Button) */}
          <button
            onClick={() => {
              sounds.playPositive();
              onRestart();
            }}
            className={`w-full py-3 sm:py-3.5 px-4 font-display font-black text-base sm:text-lg tracking-normal rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md ${
              isLight
                ? 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_16px_rgba(5,150,105,0.35)]'
                : 'bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] shadow-[0_0_20px_rgba(0,230,118,0.3)]'
            }`}
          >
            <RotateCcw size={18} />
            <span>{t.playAgainBtn}</span>
          </button>

          {/* Revive via Rewarded Ad (if eligible) */}
          {!state.hasRevived && !isCenturyVictory && (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenAdRevive();
              }}
              className={`w-full py-2.5 px-4 font-display font-bold text-sm sm:text-base tracking-normal rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-2 ${
                isLight
                  ? 'bg-sky-50 hover:bg-sky-100 border-sky-600 text-sky-900 shadow-2xs'
                  : 'bg-[#1a1f2c] hover:bg-[#252c3d] border-[#00f0ff] hover:border-[#00e676] text-white shadow-[0_0_12px_rgba(0,240,255,0.2)]'
              }`}
            >
              <Tv size={16} className={isLight ? 'text-sky-700' : 'text-[#00f0ff]'} />
              <span>{t.reviveBtn}</span>
            </button>
          )}

          {/* Rewind Fatal Choice (if eligible) */}
          {canRewindFatal && !isCenturyVictory && onRewindFatalChoice && (
            <button
              onClick={() => {
                sounds.playClick();
                onRewindFatalChoice();
              }}
              className={`w-full py-2.5 px-4 font-display font-bold text-sm sm:text-base tracking-normal rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-2 ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 border-amber-400 text-amber-900 shadow-2xs'
                  : 'bg-gradient-to-r from-[#1c2333] via-[#263147] to-[#1c2333] hover:from-[#25304a] hover:to-[#25304a] border-amber-400/70 hover:border-amber-300 text-amber-300'
              }`}
            >
              <RotateCcw size={16} className={isLight ? 'text-amber-700' : 'text-amber-400'} />
              <span>{language === 'zh' ? '⏪ 後悔致命抉擇？(看廣告倒流時光)' : '⏪ REWIND FATAL CHOICE (WATCH AD)'}</span>
            </button>
          )}
        </div>

        {/* 4 Compact Stat Chips */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-2.5">
          <div className={`p-2 rounded-lg text-center border ${
            isLight ? 'bg-white border-slate-300 shadow-2xs' : 'bg-[#161a24] border-[#2d3748]'
          }`}>
            <span className={`text-[10px] sm:text-[11px] block font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.finalWealth}
            </span>
            <span className={`text-xs sm:text-sm font-mono-numbers font-bold truncate block ${
              state.money >= 0 ? (isLight ? 'text-emerald-700' : 'text-[#00e676]') : (isLight ? 'text-red-600' : 'text-[#ff1744]')
            }`}>
              ${state.money.toLocaleString()}
            </span>
          </div>

          <div className={`p-2 rounded-lg text-center border ${
            isLight ? 'bg-white border-slate-300 shadow-2xs' : 'bg-[#161a24] border-[#2d3748]'
          }`}>
            <span className={`text-[10px] sm:text-[11px] block font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.finalJoy}
            </span>
            <span className={`text-xs sm:text-sm font-mono-numbers font-bold block ${
              isLight ? 'text-sky-700' : 'text-cyan-400'
            }`}>
              {state.happiness}%
            </span>
          </div>

          <div className={`p-2 rounded-lg text-center border ${
            isLight ? 'bg-white border-slate-300 shadow-2xs' : 'bg-[#161a24] border-[#2d3748]'
          }`}>
            <span className={`text-[10px] sm:text-[11px] block font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.finalJob}
            </span>
            <span className={`text-xs sm:text-sm font-bold truncate block ${
              isLight ? 'text-[#0f172a]' : 'text-slate-100'
            }`} title={state.job[language]}>
              {state.job[language]}
            </span>
          </div>

          <div className={`p-2 rounded-lg text-center border ${
            isLight ? 'bg-white border-slate-300 shadow-2xs' : 'bg-[#161a24] border-[#2d3748]'
          }`}>
            <span className={`text-[10px] sm:text-[11px] block font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {t.traitsDiscovered}
            </span>
            <span className={`text-xs sm:text-sm font-mono-numbers font-bold block ${
              isLight ? 'text-amber-700' : 'text-amber-400'
            }`}>
              {state.flags.length}
            </span>
          </div>
        </div>

        {/* Collectible Medals Showcase (Horizontal Medals Showcase - No Text Wall) */}
        <div className={`mb-2.5 p-2.5 sm:p-3 rounded-xl border ${
          isLight ? 'bg-white border-slate-300 shadow-2xs' : 'bg-[#161a24] border-[#2d3748]'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold flex items-center gap-1.5 ${
              isLight ? 'text-[#0f172a]' : 'text-slate-200'
            }`}>
              <span>🎖️</span>
              <span>{language === 'zh' ? '本世解鎖榮譽獎章' : 'Medals Earned This Life'}</span>
            </span>
            <span className={`text-[11px] font-mono-numbers font-semibold ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}>
              {state.flags.length > 0 ? `${state.flags.length} ${language === 'zh' ? '枚' : 'Medals'}` : ''}
            </span>
          </div>

          {state.flags.length > 0 ? (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-0.5">
              {state.flags.map((flag, idx) => {
                const medal = getMedalById(flag);
                const isLegendary = medal.rarity === 'legendary';
                const isEpic = medal.rarity === 'epic';
                const isRare = medal.rarity === 'rare';

                const rarityMeta = isLegendary
                  ? {
                      label: language === 'zh' ? '傳奇' : 'LEGEND',
                      container: isLight ? 'bg-amber-50/90 border-amber-300 shadow-xs hover:bg-amber-100' : 'bg-[#221c10] border-amber-500/50 shadow-[0_0_12px_rgba(251,191,36,0.2)] hover:bg-[#2c2314]',
                      medalBorder: 'border-2 border-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.55)] ring-1 ring-amber-300',
                      medalBg: isLight ? 'bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 text-amber-950' : 'bg-gradient-to-br from-amber-300/40 via-yellow-400/20 to-amber-600/40',
                      tagColor: isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    }
                  : isEpic
                    ? {
                        label: language === 'zh' ? '史詩' : 'EPIC',
                        container: isLight ? 'bg-cyan-50/90 border-cyan-300 shadow-xs hover:bg-cyan-100' : 'bg-[#101b26] border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)] hover:bg-[#162433]',
                        medalBorder: 'border-2 border-cyan-400 shadow-[0_0_14px_rgba(6,182,212,0.55)] ring-1 ring-cyan-300',
                        medalBg: isLight ? 'bg-gradient-to-br from-cyan-100 via-sky-200 to-purple-300 text-slate-900' : 'bg-gradient-to-br from-cyan-400/40 via-sky-400/20 to-purple-600/40',
                        tagColor: isLight ? 'bg-cyan-100 text-cyan-900 border-cyan-300' : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      }
                    : isRare
                      ? {
                          label: language === 'zh' ? '稀有' : 'RARE',
                          container: isLight ? 'bg-emerald-50/90 border-emerald-300 shadow-xs hover:bg-emerald-100' : 'bg-[#0f1d18] border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.18)] hover:bg-[#152922]',
                          medalBorder: 'border-2 border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.45)] ring-1 ring-emerald-300',
                          medalBg: isLight ? 'bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-300 text-emerald-950' : 'bg-gradient-to-br from-emerald-400/40 via-teal-400/20 to-emerald-600/40',
                          tagColor: isLight ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-500/20 text-[#00e676] border-emerald-500/40'
                        }
                      : {
                          label: language === 'zh' ? '普通' : 'COMMON',
                          container: isLight ? 'bg-slate-50 border-slate-300 hover:bg-slate-100' : 'bg-[#181d2a] border-[#2d3748] hover:bg-[#202738]',
                          medalBorder: 'border-2 border-slate-300 dark:border-slate-500 shadow-2xs',
                          medalBg: isLight ? 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800' : 'bg-gradient-to-br from-slate-700/60 to-slate-800/80',
                          tagColor: isLight ? 'bg-slate-100 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-600'
                        };

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onOpenTrophyRoom?.();
                    }}
                    className={`shrink-0 flex flex-col items-center p-2 rounded-2xl border transition-all cursor-pointer hover:scale-105 active:scale-95 ${rarityMeta.container}`}
                    title={medal.name[language]}
                  >
                    {/* Circular Shield Collectible Medal */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-1.5 transition-transform ${rarityMeta.medalBorder} ${rarityMeta.medalBg}`}>
                      <span className="drop-shadow-sm select-none">{medal.icon}</span>
                    </div>

                    {/* Localized Medal Title */}
                    <span className={`text-xs font-bold truncate max-w-[80px] text-center leading-tight mb-1 ${
                      isLight ? 'text-[#0f172a]' : 'text-white'
                    }`}>
                      {medal.name[language]}
                    </span>

                    {/* Rarity Pill */}
                    <span className={`text-[9px] font-mono-numbers font-bold px-1.5 py-0.2 rounded-full border ${rarityMeta.tagColor}`}>
                      {rarityMeta.label}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={`py-2 text-center text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {language === 'zh' ? '本世度過平凡低調一生，未獲特殊獎章' : 'Lived a modest life with no special medals'}
            </div>
          )}

          {/* Trophy Room Button */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenTrophyRoom?.();
            }}
            className={`w-full mt-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 border active:scale-[0.98] ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900 shadow-2xs'
                : 'bg-amber-950/30 hover:bg-amber-900/40 border-amber-500/40 text-amber-300'
            }`}
          >
            <Trophy size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
            <span>
              {language === 'zh' ? '🏆 獎章成就館 (查看全部收集)' : '🏆 Trophy Room (View All Medals)'}
            </span>
            {totalUnlockedCount !== undefined && (
              <span className={`ml-1 px-1.5 py-0.2 rounded font-mono-numbers text-[10px] font-bold border ${
                isLight ? 'bg-amber-200/80 text-amber-950 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              }`}>
                {language === 'zh' ? `已解鎖 ${totalUnlockedCount} / ${ALL_MEDALS.length}` : `${totalUnlockedCount} / ${ALL_MEDALS.length}`}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-2 mt-auto pt-1">
        <button
          onClick={onOpenHistory}
          className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 border ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-2xs'
              : 'bg-[#161a24] hover:bg-[#1e2330] border-[#2d3748] text-slate-200'
          }`}
        >
          <Sparkles size={14} className={isLight ? 'text-sky-600' : 'text-[#00f0ff]'} />
          <span>{t.timelineBtn}</span>
        </button>

        <button
          onClick={handleShare}
          className={`py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5 border ${
            isLight
              ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-2xs'
              : 'bg-[#161a24] hover:bg-[#1e2330] border-[#2d3748] text-slate-200'
          }`}
        >
          {copied ? (
            <>
              <Check size={14} className={isLight ? 'text-emerald-700' : 'text-[#00e676]'} />
              <span className={isLight ? 'text-emerald-700' : 'text-[#00e676]'}>{t.copiedText}</span>
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
  );
};

