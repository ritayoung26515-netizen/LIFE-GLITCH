import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';
import { Zap, X, ShieldAlert, RotateCcw, GitFork } from 'lucide-react';
import { Language } from '../types/game';

interface MockAdModalProps {
  isOpen: boolean;
  language: Language;
  mode?: 'REVIVE' | 'REGRET' | 'FORK';
  targetAge?: number;
  onAdCompleted: () => void;
  onClose: () => void;
}

export const MockAdModal: React.FC<MockAdModalProps> = ({
  isOpen,
  language,
  mode = 'REVIVE',
  targetAge,
  onAdCompleted,
  onClose
}) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in select-none">
      <div className="bg-[#161a24] border-2 border-[#00e676] rounded-2xl max-w-md w-full p-5 shadow-[0_0_30px_rgba(0,230,118,0.25)] relative overflow-hidden text-center">
        {/* Ad Badge */}
        <div className="flex items-center justify-between border-b border-[#2d3748] pb-3 mb-4">
          <div className="flex items-center gap-1.5 text-xs font-mono-numbers text-amber-400 font-semibold uppercase tracking-wider">
            <ShieldAlert size={14} />
            <span>{t.adBadge}</span>
          </div>
          {canClaim && (
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Humorous Fake Game Ad Banner */}
        <div className="bg-[#0f1117] border border-[#2d3748] rounded-xl p-4 mb-5 text-left relative overflow-hidden">
          <div className="text-[10px] font-mono-numbers text-[#00f0ff] uppercase tracking-widest font-bold mb-1">
            {t.sponsoredBy}
          </div>
          <h3 className="text-xl font-display font-black text-white tracking-wide">
            {t.adTitle}
          </h3>
          <p className="text-xs text-slate-300 mt-2 leading-relaxed">
            {t.adDesc}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[11px] font-mono-numbers bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
              ★★★★★ 4.9 Rating
            </span>
            <span className="text-[11px] font-mono-numbers text-slate-400">
              100M+ Downloads
            </span>
          </div>
        </div>

        {/* Ad Progress / Claim Button */}
        <div className="space-y-3">
          {!canClaim ? (
            <div className="bg-[#1a1f2c] border border-[#2d3748] p-3 rounded-lg flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-[#00e676] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-mono-numbers text-slate-300">
                {t.unlockedIn} <strong className="text-[#00e676] text-base">{secondsRemaining}{t.seconds}</strong>...
              </span>
            </div>
          ) : (
            <button
              onClick={() => {
                sounds.playRevive();
                onAdCompleted();
              }}
              className="w-full py-3.5 px-4 bg-[#00e676] hover:bg-[#00c853] text-[#0f1117] font-display font-extrabold uppercase text-sm sm:text-base rounded-xl transition-all shadow-[0_0_20px_rgba(0,230,118,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              {isFork ? <GitFork size={18} /> : isRegret ? <RotateCcw size={18} /> : <Zap size={18} className="fill-current" />}
              {t.claimBtn}
            </button>
          )}

          <p className="text-[11px] text-slate-500">
            {t.footer}
          </p>
        </div>
      </div>
    </div>
  );
};
