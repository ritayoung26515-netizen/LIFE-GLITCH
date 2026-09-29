import React from 'react';
import { GameEvent, EventChoice, TurnFeedback, Language } from '../types/game';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';

interface EventCardProps {
  event: GameEvent;
  language: Language;
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
  currentAge,
  feedback,
  canRegret,
  onRegretClick,
  onSelectChoice,
  disabled = false
}) => {
  const [localDebounced, setLocalDebounced] = React.useState(false);

  const categoryLabels: Record<string, { en: string; zh: string; badge: string; border: string }> = {
    WORK: { en: 'CAREER', zh: '職場工作', badge: 'text-amber-400 bg-amber-400/10 border-amber-400/30', border: 'border-amber-500/20' },
    SOCIAL: { en: 'SOCIAL', zh: '社交生活', badge: 'text-blue-400 bg-blue-400/10 border-blue-400/30', border: 'border-blue-500/20' },
    MONEY: { en: 'FINANCE', zh: '金錢投資', badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30', border: 'border-emerald-500/20' },
    LOVE: { en: 'ROMANCE', zh: '戀愛情感', badge: 'text-pink-400 bg-pink-400/10 border-pink-400/30', border: 'border-pink-500/20' },
    HEALTH: { en: 'HEALTH', zh: '身心健康', badge: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30', border: 'border-cyan-500/20' },
    WEIRD: { en: 'GLITCH', zh: '荒誕異事', badge: 'text-purple-400 bg-purple-400/10 border-purple-400/30', border: 'border-purple-500/20' },
    CHAIN: { en: 'CHAIN', zh: '命運連鎖', badge: 'text-rose-400 bg-rose-400/10 border-rose-400/30', border: 'border-rose-500/30' },
  };

  const currentTheme = categoryLabels[event.category] || categoryLabels.WEIRD;

  const rarityInfo = event.category === 'CHAIN'
    ? {
        label: language === 'zh' ? '⚡ 命運連鎖 [CHAIN]' : '⚡ CHAIN EVENT',
        badge: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
      }
    : event.category === 'WEIRD'
      ? {
          label: language === 'zh' ? '👾 系統漏洞 [GLITCH]' : '👾 GLITCH EVENT',
          badge: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
        }
      : {
          label: language === 'zh' ? '✨ 常規日常 [COMMON]' : '✨ COMMON EVENT',
          badge: 'text-slate-300 bg-slate-800/80 border-slate-700'
        };

  const isButtonsDisabled = disabled || localDebounced;

  const handleChoiceClick = (choice: EventChoice) => {
    if (isButtonsDisabled) return;
    setLocalDebounced(true);
    setTimeout(() => {
      setLocalDebounced(false);
    }, 400);

    sounds.playClick();
    onSelectChoice(choice);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-3 sm:p-4 max-w-lg mx-auto w-full select-none">
      {/* Turn Feedback Toast from Previous Turn with Regret (Undo) Button */}
      {feedback && (
        <div className="mb-3 animate-fade-in bg-[#161a24] border border-[#2d3748] rounded-xl p-3 shadow-md">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="text-xs text-slate-300 font-medium">
              <span className="text-slate-400">{language === 'zh' ? '上一輪選擇：' : 'Previous choice:'} </span>
              <span className="text-white italic">{feedback.choiceText[language]}</span>
            </div>
          </div>

          {feedback.deltas.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {feedback.deltas.map((ch, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-mono-numbers font-semibold px-2 py-0.5 rounded ${
                    ch.positive 
                      ? 'bg-emerald-950/60 text-[#00e676] border border-emerald-800/40' 
                      : 'bg-rose-950/60 text-[#ff1744] border border-rose-800/40'
                  }`}
                >
                  {ch.value} {ch.label[language]}
                </span>
              ))}
            </div>
          )}

          {/* Regret / Undo Choice Rewarded Ad Button (No usage limit: always visible if previous choice made) */}
          {canRegret && (
            <div className="pt-2 border-t border-[#2d3748]/70 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onRegretClick();
                }}
                className="w-full py-2 px-3 bg-gradient-to-r from-[#1c2333] via-[#242e44] to-[#1c2333] hover:from-[#25304a] hover:to-[#25304a] text-amber-300 hover:text-amber-200 border border-amber-400/50 hover:border-amber-300 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_12px_rgba(251,191,36,0.12)] hover:shadow-[0_0_18px_rgba(251,191,36,0.22)] cursor-pointer active:scale-98"
              >
                <RotateCcw size={13} className="text-amber-400" />
                <span className="tracking-wide">
                  {language === 'zh' 
                    ? '⏪ 後悔了？(看廣告重選)' 
                    : '⏪ Regret Choice? (Watch Ad)'}
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main Event Card */}
      <div className={`bg-[#1a1f2c] border ${currentTheme.border} rounded-xl p-4 sm:p-5 shadow-xl relative overflow-hidden mb-3 flex-1 flex flex-col justify-between`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e676]/5 rounded-full blur-2xl pointer-events-none" />

        <div>
          {/* Category Tag Header with Clean Polished Badge (NO raw code IDs) */}
          <div className="flex items-center justify-between mb-3">
            <span className={`text-[10px] sm:text-xs font-mono-numbers font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${currentTheme.badge}`}>
              {currentTheme[language]}
            </span>
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] sm:text-[11px] font-mono-numbers font-semibold px-2 py-0.5 rounded border ${rarityInfo.badge}`}>
                {rarityInfo.label}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono-numbers text-slate-400 bg-[#12151c] px-2 py-0.5 rounded border border-[#2d3748]">
                {language === 'zh' ? `${currentAge} 歲` : `AGE ${currentAge}`}
              </span>
            </div>
          </div>

          {/* Event Narrative Box */}
          <div className="bg-[#12151c]/70 border border-[#2d3748] rounded-lg p-3.5 sm:p-4 text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
            {event.text[language]}
          </div>
        </div>

        {/* Thematic flair */}
        <div className="mt-4 pt-3 border-t border-[#2d3748]/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-[#00e676]" />
            {language === 'zh' ? '慎重抉擇，或承受系統漏洞' : 'Choose wisely or embrace the glitch'}
          </span>
          <span className="text-slate-500 font-mono-numbers">{language === 'zh' ? '2 個選項' : '2 Choices'}</span>
        </div>
      </div>

      {/* Choice Buttons (Bottom Area) with 400ms Debounce Anti-Spam protection */}
      <div className="space-y-2.5 sm:space-y-3">
        {event.choices.map((choice, idx) => (
          <button
            key={idx}
            disabled={isButtonsDisabled}
            onClick={() => handleChoiceClick(choice)}
            className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer group relative overflow-hidden flex items-center justify-between gap-3 ${
              isButtonsDisabled 
                ? 'opacity-60 cursor-not-allowed pointer-events-none' 
                : idx === 0
                  ? 'bg-[#1e2536] hover:bg-[#252f45] border-[#3b475f] hover:border-[#00e676] active:scale-[0.99]'
                  : 'bg-[#191d28] hover:bg-[#222736] border-[#2d3748] hover:border-[#00f0ff] active:scale-[0.99]'
            }`}
          >
            <div className="flex-1 pr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-mono-numbers font-bold px-1.5 py-0.5 rounded ${
                  idx === 0 ? 'bg-[#00e676]/20 text-[#00e676]' : 'bg-[#00f0ff]/20 text-[#00f0ff]'
                }`}>
                  {language === 'zh' ? `選項 ${idx === 0 ? 'A' : 'B'}` : `CHOICE ${idx === 0 ? 'A' : 'B'}`}
                </span>
              </div>
              <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[#00e676] transition-colors leading-snug">
                {choice.text[language]}
              </div>
            </div>

            <div className="w-8 h-8 rounded-full bg-[#12151c] border border-[#2d3748] flex items-center justify-center shrink-0 group-hover:border-[#00e676] group-hover:text-[#00e676] transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
