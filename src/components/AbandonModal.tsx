import React from 'react';
import { Home, AlertTriangle, X } from 'lucide-react';
import { Language } from '../types/game';
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
    title: language === 'zh' ? '返回主頁' : 'Return to Home',
    prompt: language === 'zh' 
      ? '放棄當前人生並返回主頁？' 
      : 'Abandon this life and return to Home?',
    desc: language === 'zh'
      ? '未完成的當前人生矩陣將直接重置，不記入名人堂檔案。'
      : 'Your current in-progress life simulation will be discarded without saving.',
    cancelBtn: language === 'zh' ? '繼續遊玩' : 'Continue Life',
    confirmBtn: language === 'zh' ? '確認放棄並返回' : 'Confirm & Abandon'
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none"
      onClick={onCancel}
    >
      <div 
        className="w-full max-w-sm bg-[#161a24] border-2 border-red-500/50 rounded-2xl p-5 shadow-[0_0_30px_rgba(255,23,68,0.25)] flex flex-col text-center relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => {
            sounds.playClick();
            onCancel();
          }}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-white bg-[#1a1f2c] border border-[#2d3748] rounded-md transition-colors cursor-pointer"
        >
          <X size={15} />
        </button>

        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-3 text-[#ff1744]">
          <AlertTriangle size={24} />
        </div>

        <h3 className="font-display font-black text-white text-lg sm:text-xl mb-1 flex items-center justify-center gap-2">
          <Home size={18} className="text-amber-400" />
          <span>{t.title}</span>
        </h3>

        <p className="text-sm font-semibold text-red-400 mt-2 mb-1">
          {t.prompt}
        </p>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          {t.desc}
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onCancel();
            }}
            className="py-2.5 px-3 bg-[#1a1f2c] hover:bg-[#252b3d] text-slate-300 hover:text-white text-xs font-bold rounded-xl border border-[#2d3748] transition-colors cursor-pointer"
          >
            {t.cancelBtn}
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playDeath();
              onConfirm();
            }}
            className="py-2.5 px-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,23,68,0.4)] transition-all cursor-pointer active:scale-98"
          >
            {t.confirmBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
