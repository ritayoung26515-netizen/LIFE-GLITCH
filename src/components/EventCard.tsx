import React from 'react';
import { GameEvent, EventChoice, TurnFeedback, Language, Theme } from '../types/game';
import { Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface EventCardProps {
  event: GameEvent;
  language: Language;
  theme?: Theme;
  currentAge: number;
  feedback: TurnFeedback | null;
  canRegret: boolean;
  regretsRemaining?: number;
  onRegretClick: () => void;
  onSelectChoice: (choice: EventChoice) => void;
  disabled?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  language,
  theme = 'light',
  currentAge,
  feedback,
  canRegret,
  onRegretClick,
  onSelectChoice,
  disabled = false
}) => {
  const isLight = theme === 'light';
  const [localDebounced, setLocalDebounced] = React.useState(false);

  const categoryLabels: Record<string, { en: string; zh: string; badge: string; border: string }> = {
    WORK: { 
      en: 'CAREER', 
      zh: '職場工作', 
      badge: isLight ? 'text-amber-800 bg-amber-100 border-amber-300' : 'text-amber-400 bg-amber-400/10 border-amber-400/30', 
      border: isLight ? 'border-amber-200' : 'border-amber-500/20' 
    },
    SOCIAL: { 
      en: 'SOCIAL', 
      zh: '社交生活', 
      badge: isLight ? 'text-blue-800 bg-blue-100 border-blue-300' : 'text-blue-400 bg-blue-400/10 border-blue-400/30', 
      border: isLight ? 'border-blue-200' : 'border-blue-500/20' 
    },
    MONEY: { 
      en: 'FINANCE', 
      zh: '金錢投資', 
      badge: isLight ? 'text-emerald-800 bg-emerald-100 border-emerald-300' : 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30', 
      border: isLight ? 'border-emerald-200' : 'border-emerald-500/20' 
    },
    LOVE: { 
      en: 'ROMANCE', 
      zh: '戀愛情感', 
      badge: isLight ? 'text-pink-800 bg-pink-100 border-pink-300' : 'text-pink-400 bg-pink-400/10 border-pink-400/30', 
      border: isLight ? 'border-pink-200' : 'border-pink-500/20' 
    },
    HEALTH: { 
      en: 'HEALTH', 
      zh: '身心健康', 
      badge: isLight ? 'text-cyan-800 bg-cyan-100 border-cyan-300' : 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30', 
      border: isLight ? 'border-cyan-200' : 'border-cyan-500/20' 
    },
    WEIRD: { 
      en: 'GLITCH', 
      zh: '荒誕異事', 
      badge: isLight ? 'text-purple-800 bg-purple-100 border-purple-300' : 'text-purple-400 bg-purple-400/10 border-purple-400/30', 
      border: isLight ? 'border-purple-200' : 'border-purple-500/20' 
    },
    CHAIN: { 
      en: 'CHAIN', 
      zh: '命運連鎖', 
      badge: isLight ? 'text-rose-800 bg-rose-100 border-rose-300' : 'text-rose-400 bg-rose-400/10 border-rose-400/30', 
      border: isLight ? 'border-rose-300' : 'border-rose-500/30' 
    },
  };

  const currentTheme = categoryLabels[event.category] || categoryLabels.WEIRD;

  const rarityInfo = event.category === 'CHAIN'
    ? {
        label: language === 'zh' ? '⚡ 命運連鎖 [CHAIN]' : '⚡ CHAIN EVENT',
        badge: isLight ? 'text-rose-800 bg-rose-100 border-rose-300' : 'text-rose-400 bg-rose-500/10 border-rose-500/30'
      }
    : event.category === 'WEIRD'
      ? {
          label: language === 'zh' ? '👾 系統漏洞 [GLITCH]' : '👾 GLITCH EVENT',
          badge: isLight ? 'text-purple-800 bg-purple-100 border-purple-300' : 'text-purple-400 bg-purple-500/10 border-purple-500/30'
        }
      : {
          label: language === 'zh' ? '✨ 常規日常 [COMMON]' : '✨ COMMON EVENT',
          badge: isLight ? 'text-slate-700 bg-slate-100 border-slate-300' : 'text-slate-300 bg-slate-800/80 border-slate-700'
        };

  const isButtonsDisabled = disabled || localDebounced;

  const handleChoiceClick = (choice: EventChoice) => {
    if (isButtonsDisabled) return;
    setLocalDebounced(true);
    sounds.playClick();
    onSelectChoice(choice);
    setTimeout(() => setLocalDebounced(false), 400);
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-3 sm:px-4 pt-1 pb-3 gap-2.5">
      {feedback && (
        <div className={`rounded-xl border px-3.5 py-2 shrink-0 animate-fade-in ${
          isLight
            ? 'bg-white border-slate-300 shadow-xs'
            : 'bg-[#161a24] border-[#2d3748]'
        }`}>
          <div className="flex items-start justify-between gap-2">
            <div className={`text-xs leading-relaxed flex-1 min-w-0 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              <span className={`font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {language === 'zh' ? '上輪選擇：' : 'Last choice: '}
              </span>
              <span className="font-semibold break-words">
                {feedback.choiceText[language]}
              </span>
            </div>
            {canRegret && (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onRegretClick();
                }}
                className={`shrink-0 flex items-center gap-1 text-[11px] font-mono-numbers rounded-md px-2 py-0.5 transition-colors cursor-pointer border ${
                  isLight
                    ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 border-amber-300'
                    : 'text-amber-300 bg-amber-950/30 hover:bg-amber-900/40 border-amber-700/50'
                }`}
              >
                <RotateCcw size={10} />
                <span>{language === 'zh' ? '後悔了？' : 'Regret?'}</span>
              </button>
            )}
          </div>
          {feedback.deltas.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-200/80 dark:border-slate-800/80 mt-1.5">
              {feedback.deltas.map((ch, i) => (
                <span
                  key={i}
                  className={`text-[11px] font-mono-numbers font-semibold px-2 py-0.5 rounded border inline-flex items-center ${
                    ch.positive
                      ? (isLight ? 'text-emerald-800 border-emerald-300 bg-emerald-50' : 'text-emerald-400 border-emerald-800/60 bg-emerald-950/40')
                      : (isLight ? 'text-red-800 border-red-300 bg-red-50' : 'text-rose-400 border-rose-800/60 bg-rose-950/40')
                  }`}
                >
                  {ch.value} {ch.label[language]}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Event Narrative Card (Highlighted Glowing Border for Visual Focus) */}
      <div className={`rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 ${
        isLight
          ? 'bg-white border-[#10b981] shadow-[0_4px_24px_rgba(16,185,129,0.22)] ring-1 ring-emerald-500/25'
          : 'bg-[#161a24] border-[#00e676] shadow-[0_0_24px_rgba(0,230,118,0.25)] ring-1 ring-[#00e676]/30'
      }`}>
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-mono-numbers font-bold px-2 py-0.5 rounded border ${currentTheme.badge}`}>
              {currentTheme[language]}
            </span>
            <span className={`text-[10px] font-mono-numbers font-semibold px-2 py-0.5 rounded border ${rarityInfo.badge}`}>
              {rarityInfo.label}
            </span>
          </div>
          <span className={`text-[11px] font-mono-numbers shrink-0 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            {language === 'zh' ? `${currentAge} 歲` : `AGE ${currentAge}`}
          </span>
        </div>

        {/* 18px Razor-sharp body narrative with 1.6 line height and zero overlapping */}
        <div className="py-1">
          <p className={`event-text text-[18px] sm:text-[19px] leading-[1.6] select-text font-semibold ${
            isLight ? 'text-[#0f172a]' : 'text-[#f8fafc]'
          }`}>
            {event.text[language]}
          </p>
        </div>

        <div className={`mt-3 pt-2.5 border-t flex items-center justify-between text-xs ${
          isLight ? 'border-slate-100 text-slate-500' : 'border-[#2d3748]/60 text-slate-400'
        }`}>
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className={isLight ? 'text-emerald-600' : 'text-[#00e676]'} />
            {language === 'zh' ? '慎重抉擇，或承受系統漏洞' : 'Choose wisely or embrace the glitch'}
          </span>
          <span className="font-mono-numbers font-medium">{language === 'zh' ? '2 個選項' : '2 Choices'}</span>
        </div>
      </div>

      {/* Choice Buttons */}
      <div className="space-y-2.5 shrink-0">
        {event.choices.map((choice, idx) => (
          <button
            key={idx}
            disabled={isButtonsDisabled}
            onClick={() => handleChoiceClick(choice)}
            className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer group relative overflow-hidden flex items-center gap-2.5 active:scale-[0.99] ${
              isButtonsDisabled
                ? 'opacity-60 cursor-not-allowed pointer-events-none'
                : isLight
                  ? idx === 0
                    ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-emerald-600 shadow-2xs hover:shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-300 hover:border-sky-600 shadow-2xs hover:shadow-xs'
                  : idx === 0
                    ? 'bg-[#1e2536] hover:bg-[#252f45] border-[#3b475f] hover:border-[#00e676]'
                    : 'bg-[#191d28] hover:bg-[#222736] border-[#2d3748] hover:border-[#00f0ff]'
            }`}
          >
            <div className="flex-1 pr-1.5 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[10px] font-mono-numbers font-bold px-1.5 py-0.5 rounded ${
                  idx === 0 
                    ? (isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-[#00e676]/20 text-[#00e676]') 
                    : (isLight ? 'bg-sky-100 text-sky-800' : 'bg-[#00f0ff]/20 text-[#00f0ff]')
                }`}>
                  {language === 'zh' ? `選項 ${idx === 0 ? 'A' : 'B'}` : `CHOICE ${idx === 0 ? 'A' : 'B'}`}
                </span>
              </div>
              <div className={`text-[16px] sm:text-[17px] font-bold leading-[1.5] transition-colors break-words ${
                isLight 
                  ? idx === 0 ? 'text-[#0f172a] group-hover:text-emerald-700' : 'text-[#0f172a] group-hover:text-sky-700'
                  : 'text-[#f8fafc] group-hover:text-[#00e676]'
              }`}>
                {choice.text[language]}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
