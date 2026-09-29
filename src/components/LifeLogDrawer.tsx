import React, { useState } from 'react';
import { LifeLogEntry, Language, PastRun } from '../types/game';
import { X, Award, History, GitFork, Trophy, Skull, ArrowUpDown } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LifeLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  history?: LifeLogEntry[];
  timeline?: LifeLogEntry[];
  flags: string[];
  pastRun?: PastRun | null;
  onForkTimeline?: (entry: LifeLogEntry) => void;
}

export const LifeLogDrawer: React.FC<LifeLogDrawerProps> = ({
  isOpen,
  onClose,
  language,
  history,
  timeline,
  flags,
  pastRun,
  onForkTimeline
}) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (!isOpen) return null;

  const isPastLifeInspection = !!pastRun;

  // Resolve timeline from timeline prop, pastRun.timeline, pastRun.history, or history prop
  const timelineEntries: LifeLogEntry[] = 
    (timeline && timeline.length > 0)
      ? timeline
      : (pastRun?.timeline && pastRun.timeline.length > 0)
        ? pastRun.timeline
        : (pastRun?.history && pastRun.history.length > 0)
          ? pastRun.history
          : history || [];

  const sortedEntries = sortOrder === 'asc'
    ? [...timelineEntries].sort((a, b) => a.age - b.age)
    : [...timelineEntries].sort((a, b) => b.age - a.age);

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full max-w-md bg-[#161a24] border-l border-[#2d3748] h-full flex flex-col p-4 sm:p-5 shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#2d3748] pb-3 mb-3">
          <div className="flex items-center gap-2">
            {isPastLifeInspection ? (
              <Trophy size={18} className="text-amber-400" />
            ) : (
              <History size={18} className="text-[#00e676]" />
            )}
            <h3 className="font-display font-bold text-white text-base sm:text-lg">
              {isPastLifeInspection 
                ? (language === 'zh' ? '名人堂存檔：完整時間軸' : 'Hall of Fame: Life Timeline')
                : (language === 'zh' ? '人生履歷與時間軸' : 'Life Log & Timeline')}
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] rounded-md transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Past Life Summary Banner (Shown when inspecting a Hall of Fame record) */}
        {isPastLifeInspection && (
          <div className="mb-3 bg-gradient-to-br from-[#1a1f2c] to-[#121620] border-2 border-amber-400/40 rounded-xl p-3.5 shadow-md">
            <div className="text-[11px] text-[#00f0ff] font-semibold mb-1 flex items-center justify-between tracking-normal">
              <span>{language === 'zh' ? '⭐ 歷史傳奇墓誌銘' : '⭐ HISTORICAL EPITAPH'}</span>
              <span className="text-amber-300 font-mono-numbers">{pastRun.date}</span>
            </div>
            <h4 className="text-lg font-bold text-amber-300 mb-2 tracking-normal">
              "{pastRun.epitaph[language]}"
            </h4>

            {/* Quick 3-Stat Grid */}
            <div className="grid grid-cols-3 gap-1.5 mb-2.5 text-center text-xs">
              <div className="bg-[#12151c] p-2 rounded border border-[#2d3748]">
                <span className="text-[10px] text-slate-400 block">{language === 'zh' ? '最終年齡' : 'Final Age'}</span>
                <span className="font-mono-numbers font-bold text-[#00e676]">{pastRun.age} {language === 'zh' ? '歲' : 'YRS'}</span>
              </div>
              <div className="bg-[#12151c] p-2 rounded border border-[#2d3748]">
                <span className="text-[10px] text-slate-400 block">{language === 'zh' ? '累積資產' : 'Wealth'}</span>
                <span className="font-mono-numbers font-bold text-amber-300">${pastRun.money.toLocaleString()}</span>
              </div>
              <div className="bg-[#12151c] p-2 rounded border border-[#2d3748]">
                <span className="text-[10px] text-slate-400 block">{language === 'zh' ? '最終頭銜' : 'Career'}</span>
                <span className="font-semibold text-slate-200 truncate block text-[11px]" title={pastRun.job[language]}>
                  {pastRun.job[language]}
                </span>
              </div>
            </div>

            {/* Cause of Death */}
            <div className="text-[11px] text-slate-300 bg-[#12151c]/80 p-2 rounded border border-[#2d3748] leading-relaxed flex items-start gap-1.5 font-medium">
              <Skull size={13} className="text-[#ff1744] shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-400 mr-1">{language === 'zh' ? '終局原因：' : 'Cause of End: '}</strong>
                <span>{pastRun.deathReason[language]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Life Flags / Discovered Traits */}
        {flags.length > 0 && (
          <div className="mb-3 bg-[#1a1f2c] border border-[#2d3748] rounded-lg p-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono-numbers text-[#00f0ff] font-semibold mb-1.5">
              <Award size={13} />
              <span>{language === 'zh' ? `探索特質標籤 (${flags.length})` : `DISCOVERED TRAITS (${flags.length})`}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {flags.map((flag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono-numbers bg-[#12151c] text-slate-300 border border-[#2d3748] px-2 py-0.5 rounded capitalize"
                >
                  {flag.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Header with Count & Sort Toggle */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-0.5">
          <span className="font-mono-numbers font-medium text-[#00e676]">
            {language === 'zh' 
              ? `全年代抉擇記錄 (${timelineEntries.length} 歲次)` 
              : `All Recorded Years (${timelineEntries.length} Ages)`}
          </span>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
            }}
            className="flex items-center gap-1 text-[10px] font-mono-numbers text-cyan-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] hover:border-cyan-500/50 px-2 py-1 rounded cursor-pointer transition-colors"
          >
            <ArrowUpDown size={11} />
            <span>
              {sortOrder === 'asc' 
                ? (language === 'zh' ? '18歲 ➜ 終局' : 'Age 18 ➜ Death') 
                : (language === 'zh' ? '終局 ➜ 18歲' : 'Death ➜ Age 18')}
            </span>
          </button>
        </div>

        {/* Timeline Entries List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {sortedEntries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              {language === 'zh' ? '人生剛剛啟程，請做出第一個決定！' : 'Life has just begun. Make your first choice!'}
            </div>
          ) : (
            sortedEntries.map((entry, index) => (
              <div 
                key={`${entry.age}-${index}`}
                className="bg-[#1a1f2c] border border-[#2d3748] hover:border-[#3b475f] rounded-lg p-3 text-left relative transition-colors shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold text-[#00e676] bg-[#00e676]/10 border border-[#00e676]/20 px-2 py-0.5 rounded tracking-normal">
                    {language === 'zh' ? `${entry.age} 歲歷史節點` : `AGE ${entry.age} CHECKPOINT`}
                  </span>

                  {entry.snapshot && (
                    <span className="text-[11px] font-mono-numbers text-slate-300">
                      ${entry.snapshot.money.toLocaleString()} · ♥ {entry.snapshot.health}%
                    </span>
                  )}
                </div>
                
                <div className="text-xs sm:text-sm text-slate-100 mb-1.5 leading-relaxed font-medium tracking-normal">
                  {entry.eventText[language]}
                </div>

                <div className="text-xs sm:text-sm text-cyan-300 bg-[#12151c] p-2.5 rounded border border-[#2d3748]/60 leading-relaxed mb-1.5 font-medium tracking-normal">
                  <strong className="text-slate-400 font-semibold">{language === 'zh' ? '當時抉擇：' : 'Chosen: '}</strong>
                  {entry.choiceText[language]}
                </div>

                {entry.effectsSummary && (
                  <div className="text-[11px] text-slate-300 font-medium tracking-normal">
                    {entry.effectsSummary[language]}
                  </div>
                )}

                {/* Fork / Branch Timeline Rewarded Ad Action */}
                {onForkTimeline && (
                  <div className="pt-2 mt-2 border-t border-[#2d3748]/60">
                    <button
                      type="button"
                      onClick={() => {
                        sounds.playClick();
                        onForkTimeline(entry);
                      }}
                      className="w-full py-2 px-3 bg-gradient-to-r from-[#1c2333] via-[#24334a] to-[#1c2333] hover:from-[#253956] hover:to-[#253956] border border-[#00f0ff]/50 hover:border-[#00f0ff] text-[#00f0ff] hover:text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_0_12px_rgba(0,240,255,0.12)] hover:shadow-[0_0_18px_rgba(0,240,255,0.25)] cursor-pointer active:scale-98"
                    >
                      <GitFork size={13} className="text-[#00f0ff]" />
                      <span>
                        {language === 'zh'
                          ? `🔀 從 ${entry.age} 歲分叉重練 (看廣告)`
                          : `🔀 Branch Life from Age ${entry.age} (Watch Ad)`}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 mt-2 border-t border-[#2d3748] text-center">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="w-full py-2.5 bg-[#1a1f2c] hover:bg-[#242b3d] text-slate-200 text-xs font-semibold rounded-lg border border-[#2d3748] transition-colors cursor-pointer"
          >
            {language === 'zh' ? '關閉履歷' : 'Close Timeline'}
          </button>
        </div>
      </div>
    </div>
  );
};
