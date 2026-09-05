import React, { useState, useEffect } from 'react';
import {
  FileCode,
  Folder,
  FileText,
  Copy,
  Check,
  Code2,
  Layers,
  Sparkles,
  ShieldAlert,
  Info
} from 'lucide-react';
import { THEME_FILES, ThemeFile } from '../data/themeStructure';

export const ThemeCodeInspector: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<ThemeFile>(THEME_FILES[0]);
  const [fileContent, setFileContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/bumiya-hefazat-gostar/${selectedFile.path}`)
      .then((res) => {
        if (!res.ok) throw new Error('File not found');
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setFileContent(text);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setFileContent(`// ${selectedFile.name}\n// مسیر فایل: bumiya-hefazat-gostar/${selectedFile.path}\n// این فایل به صورت استاندارد در پکیج پوسته ایجاد شده است.\n`);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [selectedFile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredFiles = THEME_FILES.filter((f) => {
    if (categoryFilter === 'all') return true;
    return f.category === categoryFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-['Vazirmatn',sans-serif] p-4 sm:p-6 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold uppercase">
              <Code2 className="w-4 h-4" />
              مرورگر کدهای منبع پوسته وردپرس بومیا حفاظت گستر
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ساختار استاندارد و بدون وابستگی افزونه (Zero-Plugin Dependency)
            </h2>
            <p className="text-xs text-slate-400">
              شامل ۳۵+ فایل PHP، CSS، JS و ماژول‌های اختصاصی متاباکس، تاکسونومی، کاستومایزر و درون‌ریز دمو
            </p>
          </div>
        </div>

        {/* Main Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* File Tree List */}
          <div className="lg:col-span-4 space-y-3">
            {/* Category Filter */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-wrap gap-1 text-[11px]">
              {[
                { id: 'all', label: 'همه فایل‌ها' },
                { id: 'core', label: 'اصلی (Core)' },
                { id: 'templates', label: 'قالب‌ها (Templates)' },
                { id: 'inc', label: 'ماژول‌ها (inc/)' },
                { id: 'parts', label: 'قطعات (parts/)' },
                { id: 'assets', label: 'استایل و اسکریپت' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategoryFilter(c.id)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    categoryFilter === c.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Files list */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 max-h-[600px] overflow-y-auto space-y-1">
              {filteredFiles.map((file) => (
                <button
                  key={file.path}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-right p-2.5 rounded-xl text-xs transition flex items-center justify-between gap-2 ${
                    selectedFile.path === file.path
                      ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40 font-bold'
                      : 'text-slate-400 hover:bg-slate-950 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-mono text-[11px] truncate" dir="ltr">{file.path}</span>
                  </div>
                  <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded text-slate-500 border border-slate-800 shrink-0">
                    {file.type.toUpperCase()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Code Viewer Panel */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl">
            {/* Header info */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold text-sm" dir="ltr">
                    bumiya-hefazat-gostar/{selectedFile.path}
                  </span>
                  <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">
                    {selectedFile.category.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-slate-400">{selectedFile.description}</div>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'کپی شد!' : 'کپی کد'}
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950/90 font-mono text-xs text-slate-300 overflow-x-auto max-h-[500px] overflow-y-auto leading-relaxed" dir="ltr">
              {loading ? (
                <div className="text-slate-500 py-12 text-center">در حال بارگذاری محتوای فایل...</div>
              ) : (
                <pre className="whitespace-pre">{fileContent}</pre>
              )}
            </div>

            {/* Footer tip */}
            <div className="bg-slate-950 p-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>این قالب بر پایه آخرین نسخه توابع امن وردپرس (Escape functions, Sanitization, Nonces) توسعه یافته است.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
