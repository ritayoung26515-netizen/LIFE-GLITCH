import React from 'react';
import { LifeLogEntry, Language, PastRun } from '../types/game';
import { isChinese, loc, languageButtonLabel } from '../utils/i18n';
import { X, Trophy, GitFork } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LifeLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: LifeLogEntry[];
  language: Language;
  pastRun?: PastRun | null;
  onFork: (entry: LifeLogEntry) => void;
}

export const LifeLogDrawer: React.FC<LifeLogDrawerProps> = ({
  isOpen,
  onClose,
  history,
  language,
  pastRun,
  onFork
}) => {
  if (!isOpen) return null;

  const title = pastRun
    ? (isChinese(language) ? '名人堂存檔：完整時間軸' : 'Hall of Fame: Life Timeline')
    : (isChinese(language) ? '人生履歷與時間軸' : 'Life Log & Timeline');

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-lg max-h-[90dvh] bg-[#12151c] border border-[#2d3748] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3748] shrink-0">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy size={16} className="text-amber-400" />
            {title}
          </h2>
          <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-white cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pastRun && (
            <div className="rounded-xl border border-amber-700/40 bg-amber-950/20 p-3">
              <div className="flex items-center justify-between text-[10px] text-amber-400 mb-1">
                <span>{isChinese(language) ? '⭐ 歷史傳奇墓誌銘' : '⭐ HISTORICAL EPITAPH'}</span>
                <span className="text-slate-500">{pastRun.date}</span>
              </div>
              <div className="text-base font-bold text-[#00e676] mb-2">"{loc(pastRun.epitaph, language)}"</div>
              <div className="grid grid-cols-3 gap-2 text-center mb-2">
                <div className="bg-[#1a1f2c] rounded-lg p-2">
                  <span className="text-[10px] text-slate-400 block">{isChinese(language) ? '最終年齡' : 'Final Age'}</span>
                  <span className="font-mono-numbers font-bold text-[#00e676]">{pastRun.age} {isChinese(language) ? '歲' : 'YRS'}</span>
                </div>
                <div className="bg-[#1a1f2c] rounded-lg p-2">
                  <span className="text-[10px] text-slate-400 block">{isChinese(language) ? '累積資產' : 'Wealth'}</span>
                  <span className="font-mono-numbers font-bold text-white">${pastRun.money.toLocaleString()}</span>
                </div>
                <div className="bg-[#1a1f2c] rounded-lg p-2 min-w-0">
                  <span className="text-[10px] text-slate-400 block">{isChinese(language) ? '最終頭銜' : 'Career'}</span>
                  <span className="font-semibold text-slate-200 truncate block text-[11px]" title={loc(pastRun.job, language)}>
                    {loc(pastRun.job, language)}
                  </span>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                <strong className="text-slate-400 mr-1">{isChinese(language) ? '終局原因：' : 'Cause of End: '}</strong>
                {loc(pastRun.deathReason, language)}
              </div>
            </div>
          )}

          <div className="text-[10px] font-mono-numbers text-[#00f0ff] flex items-center justify-between">
            <span>{isChinese(language) ? `全年代抉擇記錄（${history.length} 歲次）` : `Full decision log (${history.length} turns)`}</span>
            <span className="text-slate-500">{isChinese(language) ? '18歲 → 終局' : 'Age 18 → End'}</span>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">
              {isChinese(language) ? '尚無人生紀錄' : 'No life log yet'}
            </p>
          ) : (
            history.map((entry, idx) => (
              <div key={idx} className="rounded-xl border border-[#2d3748] bg-[#161a24] p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono-numbers text-[#00e676]">
                    {isChinese(language) ? `${entry.age} 歲歷史節點` : `Age ${entry.age} checkpoint`}
                  </span>
                  {entry.snapshot && (
                    <span className="text-[10px] font-mono-numbers text-slate-500">
                      ${entry.snapshot.money.toLocaleString()} · ♥ {entry.snapshot.health}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mb-1">{loc(entry.eventText, language)}</p>
                <p className="text-[11px] text-slate-400 mb-1">
                  <span className="text-slate-500">{isChinese(language) ? '當時抉擇：' : 'Choice: '}</span>
                  {loc(entry.choiceText, language)}
                </p>
                {entry.effectsSummary && (
                  <p className="text-[10px] font-mono-numbers text-slate-500 mb-2">
                    {loc(entry.effectsSummary, language)}
                  </p>
                )}
                {entry.snapshot && entry.event && (
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onFork(entry);
                    }}
                    className="w-full flex items-center justify-center gap-1.5 text-[11px] font-mono-numbers text-cyan-300 border border-cyan-800/50 bg-cyan-950/30 hover:bg-cyan-900/40 rounded-lg py-1.5 cursor-pointer"
                  >
                    <GitFork size={12} />
                    <span>
                      {isChinese(language)
                        ? `從 ${entry.age} 歲分叉重練 (看廣告)`
                        : `Fork from age ${entry.age} (watch ad)`}
                    </span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-t border-[#2d3748] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#1a1f2c] border border-[#2d3748] text-slate-300 text-sm cursor-pointer"
          >
            {isChinese(language) ? '關閉履歷' : 'Close Log'}
          </button>
        </div>
      </div>
    </div>
  );
};
