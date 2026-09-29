import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';
import { Zap, X, ShieldAlert, RotateCcw, GitFork } from 'lucide-react';
import { Language, Theme } from '../types/game';

interface MockAdModalProps {
  isOpen: boolean;
  language: Language;
  theme?: Theme;
  mode?: 'REVIVE' | 'REGRET' | 'FORK';
  targetAge?: number;
  onAdCompleted?: () => void;
  onComplete?: () => void;
  onClose: () => void;
}

export const MockAdModal: React.FC<MockAdModalProps> = ({
  isOpen,
  language,
  theme = 'light',
  mode = 'REVIVE',
  targetAge,
  onAdCompleted,
  onComplete,
  onClose
}) => {
  const isLight = theme === 'light';
  const [secondsRemaining, setSecondsRemaining] = useState(3);
  const [canClaim, setCanClaim] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsRemaining(3);
      setCanClaim(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClaim(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const isRegret = mode === 'REGRET';
  const isFork = mode === 'FORK';

  const t = {
    adBadge: isFork
      ? (language === 'zh' ? 'CRAZYGAMES 模擬激勵廣告 · 時間線分叉' : 'CRAZYGAMES REWARDED AD · TIMELINE FORK')
      : isRegret
        ? (language === 'zh' ? 'CRAZYGAMES 模擬激勵廣告 · 時光倒流' : 'CRAZYGAMES REWARDED AD · TIME REWIND')
        : (language === 'zh' ? 'CRAZYGAMES 模擬激勵廣告 · 瀕死急救' : 'CRAZYGAMES REWARDED AD · REVIVE'),
    sponsoredBy: language === 'zh' ? '贊助廠商' : 'SPONSORED BY',
    adTitle: language === 'zh' ? '暗黑割草之王 3000' : 'RAID: SHADOW LAWN-MOWER 3000',
    adDesc: language === 'zh' 
      ? '「割除獸人軍閥領地的黑暗草皮！蒐集超過 500 款傳奇刀片，升級草屑能量，征服庭院地下城！」' 
      : '"Mow the dark lawns of legendary orc warlords! Collect over 500 blades, upgrade grass clippings, and conquer the backyard dungeon!"',
    unlockedIn: language === 'zh' ? '獎勵倒數：' : 'Reward unlocks in ',
    seconds: language === 'zh' ? ' 秒' : 's',
    claimBtn: isFork
      ? (language === 'zh' ? `🔀 領取獎勵：重返 ${targetAge ?? ''} 歲開啟平行人生` : `🔀 CLAIM REWARD: FORK LIFE AT AGE ${targetAge ?? ''}`)
      : isRegret
        ? (language === 'zh' ? '⏪ 領取獎勵：回到上一輪重新選擇' : '⏪ CLAIM REWARD: REWIND TIME & RE-CHOOSE')
        : (language === 'zh' ? '⚡ 領取獎勵：恢復 50% 生命 & 減少 30 壓力' : '⚡ CLAIM REWARD: +50 HP & -30 STRESS'),
    footer: isFork
      ? (language === 'zh' ? '模擬 CrazyGames 激勵廣告回調（高價值平行時空）' : 'Simulating CrazyGames rewarded ad callback (High-value Timeline Fork)')
      : isRegret
        ? (language === 'zh' ? '模擬 CrazyGames 激勵廣告回調（無限次倒流重選）' : 'Simulating CrazyGames rewarded ad callback (Unlimited Rewinds)')
        : (language === 'zh' ? '模擬 CrazyGames 激勵廣告回調（每局限一次）' : 'Simulating CrazyGames rewarded ad callback (Once per run)'),
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in select-none ${
      isLight ? 'bg-slate-900/50' : 'bg-black/85'
    }`}>
      <div className={`border-2 rounded-2xl max-w-md w-full p-5 relative overflow-hidden text-center shadow-2xl ${
        isLight
          ? 'bg-white border-emerald-600 shadow-[0_4px_30px_rgba(5,150,105,0.25)] text-[#0f172a]'
          : 'bg-[#161a24] border-[#00e676] shadow-[0_0_30px_rgba(0,230,118,0.25)] text-white'
      }`}>
        {/* Ad Badge */}
        <div className={`flex items-center justify-between border-b pb-3 mb-4 ${
          isLight ? 'border-slate-200' : 'border-[#2d3748]'
        }`}>
          <div className={`flex items-center gap-1.5 text-xs font-mono-numbers font-semibold uppercase tracking-wider ${
            isLight ? 'text-amber-700' : 'text-amber-400'
          }`}>
            <ShieldAlert size={14} />
            <span>{t.adBadge}</span>
          </div>
          {canClaim && (
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className={`p-1 rounded transition-colors cursor-pointer ${
                isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Humorous Fake Game Ad Banner */}
        <div className={`border rounded-xl p-4 mb-5 text-left relative overflow-hidden ${
          isLight
            ? 'bg-slate-50 border-slate-200'
            : 'bg-[#0f1117] border-[#2d3748]'
        }`}>
          <div className={`text-[10px] font-mono-numbers uppercase tracking-widest font-bold mb-1 ${
            isLight ? 'text-sky-700' : 'text-[#00f0ff]'
          }`}>
            {t.sponsoredBy}
          </div>
          <h3 className={`text-xl font-display font-black tracking-wide ${
            isLight ? 'text-[#0f172a]' : 'text-white'
          }`}>
            {t.adTitle}
          </h3>
          <p className={`text-xs mt-2 leading-relaxed ${
            isLight ? 'text-slate-700' : 'text-slate-300'
          }`}>
            {t.adDesc}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className={`text-[11px] font-mono-numbers px-2 py-0.5 rounded border ${
              isLight
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              ★★★★★ 4.9 Rating
            </span>
            <span className={`text-[11px] font-mono-numbers ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              100M+ Downloads
            </span>
          </div>
        </div>

        {/* Ad Progress / Claim Button */}
        <div className="space-y-3">
          {!canClaim ? (
            <div className={`border p-3 rounded-lg flex items-center justify-center gap-2 ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-800'
                : 'bg-[#1a1f2c] border-[#2d3748] text-slate-300'
            }`}>
              <div className={`w-4 h-4 border-2 border-t-transparent rounded-full animate-spin ${
                isLight ? 'border-emerald-600' : 'border-[#00e676]'
              }`} />
              <span className="text-sm font-mono-numbers font-medium">
                {t.unlockedIn} <strong className={`text-base ${isLight ? 'text-emerald-700' : 'text-[#00e676]'}`}>{secondsRemaining}{t.seconds}</strong>...
              </span>
            </div>
          ) : (
            <button
              onClick={() => {
                sounds.playRevive();
                if (onAdCompleted) {
                  onAdCompleted();
                } else if (onComplete) {
                  onComplete();
                }
              }}
              className={`w-full py-3.5 px-4 font-display font-extrabold uppercase text-sm sm:text-base rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-md ${
                isLight
                  ? 'bg-[#059669] hover:bg-[#047857] text-white shadow-[0_4px_20px_rgba(5,150,105,0.35)]'
                  : 'bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] shadow-[0_0_20px_rgba(0,230,118,0.4)]'
              }`}
            >
              {isFork ? <GitFork size={18} /> : isRegret ? <RotateCcw size={18} /> : <Zap size={18} className="fill-current" />}
              {t.claimBtn}
            </button>
          )}

          <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  );
};
