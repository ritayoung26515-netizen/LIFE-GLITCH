import React from 'react';
import { GameEvent, EventChoice, TurnFeedback, Language } from '../types/game';
import { Sparkles, RotateCcw } from 'lucide-react';
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
    sounds.playClick();
    onSelectChoice(choice);
    setTimeout(() => setLocalDebounced(false), 400);
  };

  return (
    <div className="flex-1 flex flex-col px-3 sm:px-4 pb-4 gap-3 overflow-y-auto">
      {feedback && (
        <div className="rounded-xl border border-[#2d3748] bg-[#161a24] p-3 animate-fade-in">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="text-xs text-slate-300 min-w-0">
              <span className="text-slate-400">{language === 'zh' ? '上一輪選擇：' : 'Previous choice:'} </span>
              <span className="text-white italic">{feedback.choiceText[language]}</span>
            </div>
            {canRegret && (
              <button
                type="button"
                onClick={() => {
                  sounds.playClick();
                  onRegretClick();
                }}
                className="shrink-0 flex items-center gap-1 text-[10px] font-mono-numbers text-amber-300 border border-amber-700/50 bg-amber-950/30 hover:bg-amber-900/40 rounded-lg px-2 py-1 transition-colors cursor-pointer"
              >
                <RotateCcw size={11} />
                <span>{language === 'zh' ? '後悔了？' : 'Regret?'}</span>
              </button>
            )}
          </div>
          {feedback.deltas.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {feedback.deltas.map((ch, i) => (
                <span
                  key={i}
                  className={`text-[10px] font-mono-numbers px-2 py-0.5 rounded border ${
                    ch.positive
                      ? 'text-emerald-400 border-emerald-800/60 bg-emerald-950/40'
                      : 'text-rose-400 border-rose-800/60 bg-rose-950/40'
                  }`}
                >
                  {ch.value} {ch.label[language]}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={`rounded-2xl border ${currentTheme.border} bg-[#161a24] p-4 shadow-xl`}>
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-mono-numbers font-bold px-2 py-0.5 rounded border ${currentTheme.badge}`}>
              {currentTheme[language]}
            </span>
            <span className={`text-[10px] font-mono-numbers px-2 py-0.5 rounded border ${rarityInfo.badge}`}>
              {rarityInfo.label}
            </span>
          </div>
          <span className="text-[10px] font-mono-numbers text-slate-500 shrink-0">
            {language === 'zh' ? `${currentAge} 歲` : `AGE ${currentAge}`}
          </span>
        </div>

        <p className="text-[17px] sm:text-lg text-[#e2e8f0] leading-relaxed mb-1 font-medium sm:font-semibold">
          {event.text[language]}
        </p>

        <div className="mt-4 pt-3 border-t border-[#2d3748]/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Sparkles size={12} className="text-[#00e676]" />
            {language === 'zh' ? '慎重抉擇，或承受系統漏洞' : 'Choose wisely or embrace the glitch'}
          </span>
          <span className="text-slate-500 font-mono-numbers">{language === 'zh' ? '2 個選項' : '2 Choices'}</span>
        </div>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        {event.choices.map((choice, idx) => (
          <button
            key={idx}
            disabled={isButtonsDisabled}
            onClick={() => handleChoiceClick(choice)}
            className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer group relative overflow-hidden flex items-center gap-3 ${
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
          </button>
        ))}
      </div>
    </div>
  );
};
