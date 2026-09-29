import React from 'react';
import { GameEvent, EventChoice, TurnFeedback, Language, Theme } from '../types/game';
import { Sparkles } from 'lucide-react';
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
      border: isLight ? 'border-rose-200' : 'border-rose-500/20' 
    },
  };

  const currentTheme = categoryLabels[event.category] || categoryLabels.WEIRD;

  const rarityInfo = (() => {
    const cat = String(event.category || '').toUpperCase();
    if (cat === 'CHAIN' || cat === 'WEIRD') {
      return {
        label: language === 'zh' ? '系統漏洞 [GLITCH]' : 'SYSTEM GLITCH',
        badge: isLight ? 'text-purple-800 bg-purple-100 border-purple-300' : 'text-purple-300 bg-purple-500/15 border-purple-400/40'
      };
    }
    return {
      label: language === 'zh' ? '常規日常 [COMMON]' : 'COMMON',
      badge: isLight ? 'text-slate-600 bg-slate-100 border-slate-300' : 'text-slate-400 bg-slate-500/10 border-slate-500/30'
    };
  })();

  const isButtonsDisabled = disabled || localDebounced;

  const handleChoiceClick = (choice: EventChoice) => {
    if (isButtonsDisabled) return;
    setLocalDebounced(true);
    sounds.playClick();
    onSelectChoice(choice);
    setTimeout(() => setLocalDebounced(false), 400);
  };

  return (
    <div className="flex-1 flex flex-col justify-start px-3 sm:px-4 pt-1 pb-3 gap-3">
      {/* Feedback block removed – deltas now shown inline in StatusHUD */}

      <div className={`rounded-2xl border-2 p-4 sm:p-5 transition-all duration-200 shrink-0 ${
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
          <span className={`text-xs sm:text-sm font-mono-numbers shrink-0 font-bold px-2 py-0.5 rounded-md ${
            isLight ? 'text-slate-700 bg-slate-100' : 'text-slate-200 bg-slate-800'
          }`}>
            {language === 'zh' ? `${currentAge} 歲` : `AGE ${currentAge}`}
          </span>
        </div>

        <div className="py-1">
          <p className={`event-text text-[17px] sm:text-[18px] leading-[1.55] select-text font-semibold ${
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

      <div className="space-y-2.5 shrink-0 mt-1">
        {event.choices.map((choice, idx) => (
          <button
            key={idx}
            disabled={isButtonsDisabled}
            onClick={() => handleChoiceClick(choice)}
            className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-150 cursor-pointer group relative overflow-hidden flex items-center gap-2.5 active:scale-[0.99] ${
              isButtonsDisabled
                ? (isLight ? 'bg-slate-100 border-slate-200 opacity-60' : 'bg-[#1a1f2c] border-[#2d3748] opacity-50')
                : (isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-300 hover:border-emerald-600 shadow-2xs hover:shadow-xs'
                    : 'bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748] hover:border-[#00e676]/60')
            }`}
          >
            <div className="flex-1 pr-1.5 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`text-[10px] font-mono-numbers font-bold px-1.5 py-0.5 rounded ${
                  idx === 0
                    ? (isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300')
                    : (isLight ? 'bg-sky-100 text-sky-800' : 'bg-sky-500/20 text-sky-300')
                }`}>
                  {language === 'zh' ? `選項 ${idx === 0 ? 'A' : 'B'}` : `Option ${idx === 0 ? 'A' : 'B'}`}
                </span>
              </div>
              <p className={`text-[15px] sm:text-[16px] leading-snug font-medium ${
                isLight ? 'text-slate-800' : 'text-slate-100'
              }`}>
                {choice.text[language]}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
