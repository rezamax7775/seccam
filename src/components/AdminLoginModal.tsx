import React, { useState } from 'react';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  ArrowRight,
  AlertCircle,
  KeyRound,
  CheckCircle
} from 'lucide-react';
import { verifyAdminCredentials, setAdminAuthenticated } from '../data/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessLogin: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccessLogin
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password) {
      setErrorMsg('لطفاً نام کاربری و رمز عبور را وارد نمایید.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const isValid = verifyAdminCredentials(username, password);
      if (isValid) {
        setAdminAuthenticated(true);
        setIsLoading(false);
        setPassword('');
        setErrorMsg('');
        onSuccessLogin();
      } else {
        setIsLoading(false);
        setErrorMsg('نام کاربری یا رمز عبور اشتباه است.');
      }
    }, 350);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in font-['Vazirmatn',sans-serif]">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Glow effect behind badge */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-48 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header with Shield Icon */}
        <div className="text-center space-y-3 mb-6 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-xl shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Lock className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ورود به پنل مدیریت
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              سامانه مدیریت اختصاصی شرکت بومیا حفاظت گستر
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              نام کاربری مدیر
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="مثال: admin"
                autoComplete="username"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-slate-600 outline-none transition font-mono"
                dir="ltr"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              رمز عبور
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="کلمه عبور خود را وارد کنید"
                autoComplete="current-password"
                className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl px-4 py-3 pl-10 text-xs text-white placeholder-slate-600 outline-none transition font-mono"
                dir="ltr"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-500 hover:text-slate-300 absolute left-3.5 top-1/2 -translate-y-1/2 transition"
                title={showPassword ? 'مخفی‌سازی رمز' : 'نمایش رمز'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Default Credentials Helper */}
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300">
              <KeyRound className="w-3.5 h-3.5" />
              اطلاعات پیش‌فرض ورود به سیستم:
            </div>
            <div className="text-slate-300 font-mono text-[11px] flex items-center justify-between pt-1">
              <span>نام کاربری: <strong className="text-cyan-400">admin</strong></span>
              <span>رمز عبور: <strong className="text-cyan-400">admin</strong></span>
            </div>
            <div className="text-[10px] text-slate-500 pt-0.5">
              (پس از ورود می‌توانید در تب «امنیت و تغییر رمز» آن را تغییر دهید)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <Shield className="w-4 h-4 text-slate-950 font-bold" />
              {isLoading ? 'در حال بررسی اعتبار...' : 'ورود امن به پنل مدیریت'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              انصراف و بازگشت به سایت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
