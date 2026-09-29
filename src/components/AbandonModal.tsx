import React from 'react';
import { Home, AlertTriangle, X } from 'lucide-react';
import { Language } from '../types/game';
import { isChinese, loc, languageButtonLabel } from '../utils/i18n';
import { sounds } from '../utils/audio';

interface AbandonModalProps {
  isOpen: boolean;
  language: Language;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AbandonModal: React.FC<AbandonModalProps> = ({
  isOpen,
  language,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-[#161a24] border border-[#2d3748] rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#2d3748]">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={16} />
            <span className="text-sm font-bold text-white">{t.title}</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onCancel();
            }}
            className="p-1 text-slate-400 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-sm text-slate-200">{t.prompt}</p>
          <p className="text-xs text-slate-500">{t.desc}</p>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                sounds.playClick();
                onCancel();
              }}
              className="w-full py-2.5 rounded-xl bg-[#1a1f2c] border border-[#2d3748] text-slate-200 text-sm font-semibold cursor-pointer hover:border-slate-500"
            >
              {t.cancelBtn}
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.playDanger();
                onConfirm();
              }}
              className="w-full py-2.5 rounded-xl bg-rose-600/90 hover:bg-rose-500 text-white text-sm font-bold cursor-pointer flex items-center justify-center gap-1.5"
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
