import React from 'react';
import { LifeLogEntry, Language, PastRun, Theme } from '../types/game';
import { X, Trophy, GitFork } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LifeLogDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: LifeLogEntry[];
  language: Language;
  theme?: Theme;
  pastRun?: PastRun | null;
  onForkTimeline?: (entry: LifeLogEntry) => void;
}

export const LifeLogDrawer: React.FC<LifeLogDrawerProps> = ({
  isOpen,
  onClose,
  history,
  language,
  theme = 'light',
  pastRun,
  onForkTimeline
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  const timeline =
    history && history.length > 0
      ? history
      : (pastRun?.timeline && pastRun.timeline.length > 0)
        ? pastRun.timeline
        : (pastRun?.history && pastRun.history.length > 0)
          ? pastRun.history
          : [];

  const title = pastRun
    ? (language === 'zh' ? '名人堂存檔：完整時間軸' : 'Hall of Fame: Life Timeline')
    : (language === 'zh' ? '人生履歷與時間軸' : 'Life Log & Timeline');

  return (
    <div className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm ${
      isLight ? 'bg-slate-900/40' : 'bg-black/75'
    }`}>
      <div className={`w-full max-w-lg max-h-[90dvh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border ${
        isLight
          ? 'bg-white border-slate-300 text-[#0f172a]'
          : 'bg-[#12151c] border-[#2d3748] text-white'
      }`}>
        <div className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-[#2d3748] bg-[#161a24]'
        }`}>
          <h2 className={`text-sm font-bold flex items-center gap-2 ${
            isLight ? 'text-slate-900' : 'text-white'
          }`}>
            <Trophy size={16} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
            {title}
          </h2>
          <button 
            type="button" 
            onClick={onClose} 
            className={`p-1.5 rounded-md cursor-pointer transition-colors ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pastRun && (
            <div className={`rounded-xl border p-3 ${
              isLight
                ? 'border-amber-300 bg-amber-50/70 text-slate-800'
                : 'border-amber-700/40 bg-amber-950/20 text-slate-200'
            }`}>
              <div className={`flex items-center justify-between text-[11px] font-semibold mb-1 ${
                isLight ? 'text-amber-800' : 'text-amber-400'
              }`}>
                <span>{language === 'zh' ? '⭐ 歷史傳奇墓誌銘' : '⭐ HISTORICAL EPITAPH'}</span>
                <span className={isLight ? 'text-slate-600' : 'text-slate-500'}>{pastRun.date}</span>
              </div>
              <div className={`text-base font-bold mb-2 ${
                isLight ? 'text-emerald-700' : 'text-[#00e676]'
              }`}>
                "{pastRun.epitaph[language]}"
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-2">
                <div className={`rounded-lg p-2 border ${
                  isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#1a1f2c] border-[#2d3748]'
                }`}>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'zh' ? '最終年齡' : 'Final Age'}
                  </span>
                  <span className={`font-mono-numbers font-bold ${
                    isLight ? 'text-emerald-700' : 'text-[#00e676]'
                  }`}>
                    {pastRun.age} {language === 'zh' ? '歲' : 'YRS'}
                  </span>
                </div>
                <div className={`rounded-lg p-2 border ${
                  isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#1a1f2c] border-[#2d3748]'
                }`}>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'zh' ? '累積資產' : 'Wealth'}
                  </span>
                  <span className={`font-mono-numbers font-bold ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}>
                    ${pastRun.money.toLocaleString()}
                  </span>
                </div>
                <div className={`rounded-lg p-2 border min-w-0 ${
                  isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#1a1f2c] border-[#2d3748]'
                }`}>
                  <span className={`text-[10px] block ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'zh' ? '最終頭銜' : 'Career'}
                  </span>
                  <span className={`font-semibold truncate block text-[11px] ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`} title={pastRun.job[language]}>
                    {pastRun.job[language]}
                  </span>
                </div>
              </div>
              <div className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                <strong className={`mr-1 ${isLight ? 'text-slate-800' : 'text-slate-400'}`}>
                  {language === 'zh' ? '終局原因：' : 'Cause of End: '}
                </strong>
                {pastRun.deathReason[language]}
              </div>
            </div>
          )}

          <div className={`text-[11px] font-mono-numbers font-semibold flex items-center justify-between ${
            isLight ? 'text-sky-700' : 'text-[#00f0ff]'
          }`}>
            <span>{language === 'zh' ? `全年代抉擇記錄（${timeline.length} 歲次）` : `Full decision log (${timeline.length} turns)`}</span>
            <span className={isLight ? 'text-slate-600' : 'text-slate-500'}>
              {language === 'zh' ? '18歲 → 終局' : 'Age 18 → End'}
            </span>
          </div>

          {timeline.length === 0 ? (
            <p className={`text-sm text-center py-8 ${isLight ? 'text-slate-600' : 'text-slate-500'}`}>
              {language === 'zh' ? '尚無人生紀錄' : 'No life log yet'}
            </p>
          ) : (
            timeline.map((entry, idx) => (
              <div key={idx} className={`rounded-xl border p-3 ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-[#0f172a]'
                  : 'bg-[#161a24] border-[#2d3748] text-white'
              }`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[11px] font-mono-numbers font-bold ${
                    isLight ? 'text-emerald-700' : 'text-[#00e676]'
                  }`}>
                    {language === 'zh' ? `${entry.age} 歲歷史節點` : `Age ${entry.age} checkpoint`}
                  </span>
                  {entry.snapshot && (
                    <span className={`text-[11px] font-mono-numbers ${
                      isLight ? 'text-slate-600' : 'text-slate-500'
                    }`}>
                      ${entry.snapshot.money.toLocaleString()} · ♥ {entry.snapshot.health}%
                    </span>
                  )}
                </div>
                <p className={`text-sm font-semibold mb-1 ${
                  isLight ? 'text-[#0f172a]' : 'text-slate-200'
                }`}>{entry.eventText[language]}</p>
                <p className={`text-xs mb-1 ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  <span className={`font-semibold ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {language === 'zh' ? '當時抉擇：' : 'Choice: '}
                  </span>
                  {entry.choiceText[language]}
                </p>
                {entry.effectsSummary && (
                  <p className={`text-[11px] font-mono-numbers mb-2 ${
                    isLight ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    {entry.effectsSummary[language]}
                  </p>
                )}
                {entry.snapshot && entry.event && onForkTimeline && (
                  <button
                    type="button"
                    onClick={() => {
                      sounds.playClick();
                      onForkTimeline(entry);
                    }}
                    className={`w-full flex items-center justify-center gap-1.5 text-xs font-mono-numbers font-semibold rounded-lg py-1.5 cursor-pointer border transition-colors ${
                      isLight
                        ? 'text-sky-800 border-sky-300 bg-sky-50 hover:bg-sky-100'
                        : 'text-cyan-300 border-cyan-800/50 bg-cyan-950/30 hover:bg-cyan-900/40'
                    }`}
                  >
                    <GitFork size={12} />
                    <span>
                      {language === 'zh'
                        ? `從 ${entry.age} 歲分叉重練 (看廣告)`
                        : `Fork from age ${entry.age} (watch ad)`}
                    </span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className={`p-3 border-t shrink-0 ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-[#2d3748] bg-[#161a24]'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`w-full py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-colors ${
              isLight
                ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-2xs'
                : 'bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748] text-slate-200'
            }`}
          >
            {language === 'zh' ? '關閉履歷' : 'Close Log'}
          </button>
        </div>
      </div>
    </div>
  );
};
