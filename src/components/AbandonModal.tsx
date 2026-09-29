import React from 'react';
import { Home, AlertTriangle, X } from 'lucide-react';
import { Language, Theme } from '../types/game';
import { isChinese } from '../utils/i18n';
import { sounds } from '../utils/audio';

interface AbandonModalProps {
  isOpen: boolean;
  language: Language;
  theme?: Theme;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AbandonModal: React.FC<AbandonModalProps> = ({
  isOpen,
  language,
  theme = 'light',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const isLight = theme === 'light';

  const t = {
    title: isChinese(language) ? '返回主頁' : 'Return to Home',
    prompt: isChinese(language)
      ? '確定要放棄當前人生並返回主頁嗎？'
      : 'Abandon this life and return to the start screen?',
    desc: isChinese(language)
      ? '目前進度不會存入名人堂。此操作無法復原。'
      : 'Current progress will not be saved to the Hall of Fame. This cannot be undone.',
    cancelBtn: isChinese(language) ? '繼續遊玩' : 'Continue Life',
    confirmBtn: isChinese(language) ? '確認放棄並返回' : 'Confirm & Abandon'
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm ${
      isLight ? 'bg-slate-900/40' : 'bg-black/80'
    }`}>
      <div className={`w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border ${
        isLight
          ? 'bg-white border-slate-300 text-[#0f172a]'
          : 'bg-[#161a24] border-[#2d3748] text-white'
      }`}>
        <div className={`flex items-center justify-between px-4 py-3 border-b ${
          isLight ? 'border-slate-200 bg-slate-50' : 'border-[#2d3748] bg-[#1a1f2c]'
        }`}>
          <div className="flex items-center gap-2 text-amber-500">
            <AlertTriangle size={16} />
            <span className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{t.title}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onCancel();
            }}
            className={`p-1 rounded-md cursor-pointer transition-colors ${
              isLight ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-200' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className={`text-sm font-semibold ${isLight ? 'text-[#0f172a]' : 'text-slate-200'}`}>{t.prompt}</p>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{t.desc}</p>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onCancel();
              }}
              className={`w-full py-2.5 rounded-xl border text-sm font-semibold cursor-pointer transition-colors ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-2xs'
                  : 'bg-[#1a1f2c] hover:bg-[#252b3d] border-[#2d3748] text-slate-200'
              }`}
            >
              {t.cancelBtn}
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playDanger();
                onConfirm();
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold cursor-pointer flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all"
            >
              <Home size={14} />
              {t.confirmBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
