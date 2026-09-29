import React from 'react';
import { GameEvent, EventChoice, TurnFeedback, Language } from '../types/game';
import { ArrowRight, Sparkles, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/audio';
import { isChinese, loc } from '../utils/i18n';

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
        label: isChinese(language) ? '⚡ 命運連鎖 [CHAIN]' : '⚡ CHAIN EVENT',
        badge: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
      }
    : event.category === 'WEIRD'
      ? {
          label: isChinese(language) ? '👾 系統漏洞 [GLITCH]' : '👾 GLITCH EVENT',
          badge: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
        }
      : {
          label: isChinese(language) ? '✨ 常規日常 [COMMON]' : '✨ COMMON EVENT',
          badge: 'text-slate-400 bg-slate-500/10 border-slate-500/30'
        };

  const handleChoice = (choice: EventChoice) => {
    if (disabled || localDebounced) return;
    setLocalDebounced(true);
    sounds.playClick();
    onSelectChoice(choice);
    setTimeout(() => setLocalDebounced(false), 450);
  };

  return (
    <div className="flex-1 flex flex-col px-3 sm:px-4 pb-4 gap-3 overflow-y-auto">
      {feedback && (
        <div className="rounded-xl border border-[#2d3748] bg-[#161a24] p-3 animate-fade-in">
          <div className="text-xs text-slate-300 mb-2">
            <span className="text-slate-400">{isChinese(language) ? '上一輪選擇：' : 'Previous choice:'} </span>
            <span className="text-white italic">{loc(feedback.choiceText, language)}</span>
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
                  {ch.value} {loc(ch.label, language)}
                </span>
              ))}
            </div>
          )}
          {canRegret && (
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onRegretClick();
              }}
              className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs font-mono-numbers text-amber-300 border border-amber-700/50 bg-amber-950/30 hover:bg-amber-900/40 rounded-lg py-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>
                {isChinese(language)
                  ? '後悔了？(看廣告重選)'
                  : 'Regret? (Watch ad to redo)'}
              </span>
            </button>
          )}
        </div>
      )}

      <div className={`rounded-2xl border ${currentTheme.border} bg-[#161a24] p-4 shadow-xl`}>
        <div className="flex items-center justify-between mb-3 gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`text-[10px] font-mono-numbers font-bold px-2 py-0.5 rounded border ${currentTheme.badge}`}>
              {loc(currentTheme, language)}
            </span>
            <span className={`text-[10px] font-mono-numbers px-2 py-0.5 rounded border ${rarityInfo.badge}`}>
              {rarityInfo.label}
            </span>
          </div>
          <span className="text-[10px] font-mono-numbers text-slate-500 shrink-0">
            {isChinese(language) ? `${currentAge} 歲` : `AGE ${currentAge}`}
          </span>
        </div>

        <p className="text-sm sm:text-base text-slate-100 leading-relaxed mb-4">
          {loc(event.text, language)}
        </p>

        <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 font-mono-numbers">
          <span className="flex items-center gap-1">
            <Sparkles size={11} className="text-[#00e676]" />
            {isChinese(language) ? '慎重抉擇，或承受系統漏洞' : 'Choose wisely or embrace the glitch'}
          </span>
          <span>{isChinese(language) ? '2 個選項' : '2 Choices'}</span>
        </div>

        <div className="space-y-2">
          {event.choices.map((choice, idx) => (
            <button
              key={idx}
              type="button"
              disabled={disabled || localDebounced}
              onClick={() => handleChoice(choice)}
              className="w-full text-left rounded-xl border border-[#2d3748] hover:border-[#00e676]/50 bg-[#1a1f2c] hover:bg-[#232c3f] px-3 py-3 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono-numbers text-slate-500 mb-0.5">
                    {isChinese(language) ? `選項 ${idx === 0 ? 'A' : 'B'}` : `CHOICE ${idx === 0 ? 'A' : 'B'}`}
                  </div>
                  <div className="text-sm text-slate-100 group-hover:text-white">
                    {loc(choice.text, language)}
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-600 group-hover:text-[#00e676] shrink-0 mt-1 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
