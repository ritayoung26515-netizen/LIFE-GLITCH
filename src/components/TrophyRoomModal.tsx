import React, { useState } from 'react';
import { ALL_MEDALS, Medal, MedalRarity } from '../utils/traits';
import { Language, Theme } from '../types/game';
import { X, Trophy, Lock, Sparkles, Shield, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TrophyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedMedalIds: string[];
  language: Language;
  theme: Theme;
}

export const TrophyRoomModal: React.FC<TrophyRoomModalProps> = ({
  isOpen,
  onClose,
  unlockedMedalIds,
  language,
  theme
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'rarePlus'>('all');
  const [selectedMedal, setSelectedMedal] = useState<Medal | null>(null);

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const unlockedSet = new Set(unlockedMedalIds);
  const totalCount = ALL_MEDALS.length;
  const unlockedCount = ALL_MEDALS.filter(m => unlockedSet.has(m.id)).length;
  const percentage = Math.round((unlockedCount / totalCount) * 100);

  const filteredMedals = ALL_MEDALS.filter(medal => {
    const isUnlocked = unlockedSet.has(medal.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'rarePlus') return medal.rarity === 'legendary' || medal.rarity === 'epic';
    return true;
  });

  const getRarityBadge = (rarity: MedalRarity) => {
    switch (rarity) {
      case 'legendary':
        return {
          label: language === 'zh' ? '傳奇' : 'LEGENDARY',
          classes: isLight
            ? 'bg-amber-100 text-amber-900 border-amber-400'
            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
        };
      case 'epic':
        return {
          label: language === 'zh' ? '史詩' : 'EPIC',
          classes: isLight
            ? 'bg-purple-100 text-purple-900 border-purple-400'
            : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
        };
      case 'rare':
        return {
          label: language === 'zh' ? '稀有' : 'RARE',
          classes: isLight
            ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        };
      default:
        return {
          label: language === 'zh' ? '普通' : 'COMMON',
          classes: isLight
            ? 'bg-slate-100 text-slate-800 border-slate-300'
            : 'bg-slate-800/60 text-slate-300 border-slate-600'
        };
    }
  };

  const getMedalBorderStyles = (rarity: MedalRarity, isUnlocked: boolean) => {
    if (!isUnlocked) {
      return isLight
        ? 'bg-slate-100/80 border-slate-300 opacity-60 text-slate-400'
        : 'bg-[#12151c]/60 border-[#242b3a] opacity-50 text-slate-500';
    }

    switch (rarity) {
      case 'legendary':
        return isLight
          ? 'bg-gradient-to-br from-amber-50 to-yellow-50/50 border-2 border-amber-400 shadow-[0_4px_16px_rgba(251,191,36,0.25)] ring-1 ring-amber-400/40'
          : 'bg-gradient-to-br from-[#1e1b12] to-[#2a220e] border-2 border-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.3)] ring-1 ring-amber-400/30';
      case 'epic':
        return isLight
          ? 'bg-gradient-to-br from-purple-50 to-cyan-50/40 border-2 border-cyan-500 shadow-[0_4px_16px_rgba(6,182,212,0.22)] ring-1 ring-cyan-500/30'
          : 'bg-gradient-to-br from-[#181424] to-[#111e2b] border-2 border-cyan-400 shadow-[0_0_16px_rgba(6,182,212,0.28)] ring-1 ring-cyan-400/30';
      case 'rare':
        return isLight
          ? 'bg-gradient-to-br from-emerald-50 to-teal-50/40 border-2 border-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.2)]'
          : 'bg-gradient-to-br from-[#121c17] to-[#10241e] border-2 border-emerald-400 shadow-[0_0_14px_rgba(16,185,129,0.25)]';
      default:
        return isLight
          ? 'bg-white border-2 border-slate-300 shadow-2xs'
          : 'bg-[#161a24] border-2 border-[#2d3748] shadow-sm';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className={`relative w-full max-w-xl max-h-[92vh] flex flex-col rounded-2xl border-2 shadow-2xl overflow-hidden ${
        isLight
          ? 'bg-white border-slate-300 text-slate-900'
          : 'bg-[#12151c] border-[#2d3748] text-white'
      }`}>
        {/* Modal Top Header */}
        <div className={`p-4 border-b flex items-center justify-between shrink-0 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#161a24] border-[#2d3748]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl border ${
              isLight ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-amber-500/20 border-amber-500/40 text-amber-300'
            }`}>
              <Trophy size={20} />
            </div>
            <div>
              <h2 className={`text-lg sm:text-xl font-display font-black tracking-normal leading-tight ${
                isLight ? 'text-[#0f172a]' : 'text-white'
              }`}>
                {language === 'zh' ? '🏆 獎章成就館' : '🏆 TROPHY ROOM'}
              </h2>
              <p className={`text-xs font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                {language === 'zh' ? '歷代人生所蒐集的所有荒誕傳奇成就' : 'Collectible achievements earned across all lives'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border-slate-300'
                : 'text-slate-400 hover:text-white bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748]'
            }`}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Collection Progress Bar */}
        <div className={`px-4 py-3 border-b shrink-0 ${
          isLight ? 'bg-white border-slate-200' : 'bg-[#161a24]/60 border-[#2d3748]'
        }`}>
          <div className="flex items-center justify-between text-xs font-bold mb-1.5">
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              <Sparkles size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
              <span>{language === 'zh' ? '總收集進度' : 'Collection Progress'}</span>
            </span>
            <span className={`font-mono-numbers text-sm font-bold ${
              isLight ? 'text-emerald-700' : 'text-[#00e676]'
            }`}>
              {language === 'zh' ? `已解鎖 ${unlockedCount} / ${totalCount}` : `${unlockedCount} / ${totalCount} Unlocked`} ({percentage}%)
            </span>
          </div>

          <div className={`w-full h-2 rounded-full overflow-hidden ${
            isLight ? 'bg-slate-200' : 'bg-[#0f1117]'
          }`}>
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isLight
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  : 'bg-gradient-to-r from-[#00e676] to-[#00f0ff]'
              }`}
              style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
            />
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className={`px-4 py-2 border-b flex items-center justify-between gap-1.5 shrink-0 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#12151c] border-[#2d3748]'
        }`}>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sounds.playClick();
                setFilter('all');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                filter === 'all'
                  ? (isLight ? 'bg-white border-slate-400 text-[#0f172a] shadow-xs' : 'bg-[#1e2536] border-slate-400 text-white')
                  : (isLight ? 'border-transparent text-slate-600 hover:text-slate-900' : 'border-transparent text-slate-400 hover:text-white')
              }`}
            >
              {language === 'zh' ? `全部 (${totalCount})` : `All (${totalCount})`}
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setFilter('unlocked');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                filter === 'unlocked'
                  ? (isLight ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs' : 'bg-emerald-950/40 border-emerald-500 text-[#00e676]')
                  : (isLight ? 'border-transparent text-slate-600 hover:text-slate-900' : 'border-transparent text-slate-400 hover:text-white')
              }`}
            >
              {language === 'zh' ? `已解鎖 (${unlockedCount})` : `Unlocked (${unlockedCount})`}
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setFilter('rarePlus');
              }}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                filter === 'rarePlus'
                  ? (isLight ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs' : 'bg-amber-950/40 border-amber-500 text-amber-300')
                  : (isLight ? 'border-transparent text-slate-600 hover:text-slate-900' : 'border-transparent text-slate-400 hover:text-white')
              }`}
            >
              {language === 'zh' ? '傳奇與史詩' : 'Rare & Above'}
            </button>
          </div>
        </div>

        {/* Selected Medal Detail Spotlight (if tapped) */}
        {selectedMedal && (
          <div className={`p-3.5 mx-4 mt-3 rounded-xl border flex items-start gap-3 shrink-0 animate-fade-in ${
            unlockedSet.has(selectedMedal.id)
              ? (isLight ? 'bg-emerald-50/70 border-emerald-300' : 'bg-emerald-950/20 border-emerald-500/40')
              : (isLight ? 'bg-slate-100 border-slate-300' : 'bg-[#1a1f2c] border-[#2d3748]')
          }`}>
            <div className="text-3xl shrink-0 p-1">
              {unlockedSet.has(selectedMedal.id) ? selectedMedal.icon : '🔒'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className={`font-bold text-sm sm:text-base ${isLight ? 'text-[#0f172a]' : 'text-white'}`}>
                  {unlockedSet.has(selectedMedal.id) ? selectedMedal.name[language] : (language === 'zh' ? '未解鎖成就' : 'Locked Achievement')}
                </h3>
                <span className={`text-[10px] font-mono-numbers font-bold px-1.5 py-0.2 rounded border ${getRarityBadge(selectedMedal.rarity).classes}`}>
                  {getRarityBadge(selectedMedal.rarity).label}
                </span>
                {unlockedSet.has(selectedMedal.id) && (
                  <span className={`flex items-center gap-0.5 text-[11px] font-bold ${isLight ? 'text-emerald-700' : 'text-[#00e676]'}`}>
                    <CheckCircle2 size={13} />
                    <span>{language === 'zh' ? '已獲得' : 'Unlocked'}</span>
                  </span>
                )}
              </div>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                {unlockedSet.has(selectedMedal.id) ? selectedMedal.desc[language] : (language === 'zh' ? '在人生抉擇中探索特殊命運路線以解鎖此獎章。' : 'Make specific life choices to discover and unlock this medal.')}
              </p>
            </div>
            <button
              onClick={() => setSelectedMedal(null)}
              className={`p-1 rounded text-xs opacity-60 hover:opacity-100 cursor-pointer ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              ✕
            </button>
          </div>
        )}

        {/* Medals Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 overscroll-contain">
          {filteredMedals.length === 0 ? (
            <div className="py-12 text-center text-sm font-medium opacity-60">
              {language === 'zh' ? '沒有符合篩選條件的獎章' : 'No medals match this filter'}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {filteredMedals.map(medal => {
                const isUnlocked = unlockedSet.has(medal.id);
                const rarityBadge = getRarityBadge(medal.rarity);
                const isSelected = selectedMedal?.id === medal.id;

                return (
                  <button
                    key={medal.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedMedal(medal);
                    }}
                    className={`relative p-3 rounded-xl text-left transition-all duration-150 cursor-pointer flex flex-col justify-between overflow-hidden active:scale-[0.98] ${
                      getMedalBorderStyles(medal.rarity, isUnlocked)
                    } ${isSelected ? 'ring-2 ring-emerald-500' : ''}`}
                  >
                    {/* Top Row: Circular Shield Medallion & Rarity Badge */}
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl sm:text-2xl shrink-0 transition-transform ${
                        isUnlocked
                          ? (medal.rarity === 'legendary'
                              ? 'border-2 border-amber-400 bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)] ring-1 ring-amber-300 text-amber-950'
                              : medal.rarity === 'epic'
                                ? 'border-2 border-cyan-400 bg-gradient-to-br from-cyan-100 via-sky-200 to-purple-300 shadow-[0_0_10px_rgba(6,182,212,0.5)] ring-1 ring-cyan-300 text-slate-900'
                                : medal.rarity === 'rare'
                                  ? 'border-2 border-emerald-400 bg-gradient-to-br from-emerald-100 via-teal-200 to-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.4)] ring-1 ring-emerald-300 text-emerald-950'
                                  : 'border-2 border-slate-300 dark:border-slate-500 bg-gradient-to-br from-slate-100 to-slate-200 shadow-2xs text-slate-800')
                          : 'border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-200/50 dark:bg-slate-800/50 text-slate-400'
                      }`}>
                        <span className="drop-shadow-sm select-none">{isUnlocked ? medal.icon : '🔒'}</span>
                      </div>
                      <span className={`text-[9px] font-mono-numbers font-bold px-1.5 py-0.2 rounded border ${rarityBadge.classes}`}>
                        {rarityBadge.label}
                      </span>
                    </div>

                    {/* Medal Name */}
                    <div className="min-w-0 mb-1">
                      <div className={`text-xs sm:text-sm font-bold truncate leading-tight ${
                        isUnlocked
                          ? (isLight ? 'text-[#0f172a]' : 'text-white')
                          : (isLight ? 'text-slate-500' : 'text-slate-500')
                      }`}>
                        {isUnlocked ? medal.name[language] : (language === 'zh' ? '🔒 未解鎖' : '🔒 Locked')}
                      </div>
                    </div>

                    {/* Brief Hint / Lore */}
                    <div className={`text-[11px] leading-tight line-clamp-2 ${
                      isUnlocked
                        ? (isLight ? 'text-slate-600' : 'text-slate-300')
                        : (isLight ? 'text-slate-400' : 'text-slate-600')
                    }`}>
                      {isUnlocked ? medal.desc[language] : (language === 'zh' ? '探索特殊人生路線解鎖' : 'Explore choices to unlock')}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-3 border-t flex items-center justify-between text-xs shrink-0 ${
          isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-[#161a24] border-[#2d3748] text-slate-400'
        }`}>
          <span className="flex items-center gap-1.5 font-medium">
            <Shield size={13} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
            {language === 'zh' ? '點擊獎章可查看其解鎖傳說與細節' : 'Click any medal to view full lore and details'}
          </span>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className={`px-3 py-1 font-semibold rounded-lg border transition-colors cursor-pointer ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748] text-slate-200'
            }`}
          >
            {language === 'zh' ? '關閉' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
